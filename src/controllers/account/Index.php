<?php
namespace controllers\account;

use Exception;
use models\integrations\aws\SES;
use models\integrations\lighthouse\Lighthouse;
use models\system\encryption\Crypt;
use models\system\GUID;
use models\users\User;
use models\users\UserActivation;
use models\users\UserChat;
use obray\data\Querier;
use obray\data\types\Password;
use obray\sessions\Session;
use obray\users\Permission;

class Index
{
    const PERMISSIONS = [
        'object' => Permission::ANY,
        'post' => Permission::ANY,
        'activate' => Permission::ANY,
        'auth' => Permission::ANY,
        'testEmail' => Permission::ANY,
        'logout' => Permission::ANY
    ];

    private Querier $querier;
    private Session $session;
    public mixed $data;

    public function __construct(Querier $querier, Session $session)
    {
        $this->querier = $querier;
        $this->session = $session;
    }

    /**
     * post
     * 
     * Create a new user account
     * 
     * This function will create a new user account and send an activation email to the user.  The
     * user will need to click the link in the email to activate their account.
     * 
     * @param string $first_name 
     * @param string $last_name 
     * @param string $email 
     * @param string $password 
     * @param string $password_confirm 
     * @return void 
     * @throws Exception 
     */

    public function post(string $first_name, string $last_name, string $email, string $phone, string $password, string $password_confirm, $is_demo = false)
    {

        if(empty($first_name)) throw new \Exception("First name is required.");
        if(empty($last_name)) throw new \Exception("Last name is required.");
        if(empty($email)) throw new \Exception("Email is required.");
        if(empty($phone)) throw new \Exception("Phone is required.");
        if(empty($password)) throw new \Exception("Password is required.");
        if(empty($password_confirm)) throw new \Exception("Password Confirm is required.");

        if($password !== $password_confirm) throw new \Exception("Passwords do not match");

        // hash and encrypt password
        $password = Password::hash($password);
        $password = Crypt::encrypt($password);

        // create user
        $User = new User(...[
            'user_first_name' => $first_name,
            'user_last_name' => $last_name,
            'user_email' => $email,
            'user_password' => $password,
            'user_is_active' => false,
            'user_phone' => $phone,
            'user_is_demo' => !empty($is_demo)?true:false
        ]);
        $User->user_id = $this->querier->insert($User)->run();

        // create user activation
        $UserActivation = new UserActivation(...[
            'user_id' => $User->user_id,
            'user_activation_code' => GUID::v4(),
            'user_activation_is_sent' => true,
            'user_activation_is_activated' => false,
            'user_session_id' => session_id()
        ]);
        $UserActivation->user_activation_id = $this->querier->insert($UserActivation)->run();

        $chat = Lighthouse::getChat($first_name, $last_name, session_id());
        
        $UserChat = $this->querier->select(UserChat::class)->where([
            'customer_case_id' => $chat->data->customer_case_id
        ])->limit(1)->run();
        if(empty($UserChat)){
            $UserChat = new UserChat(...[
                'user_id' => $User->user_id,
                'customer_case_id' => $chat->data->customer_case_id,
                'chat_id' => $chat->data->chat_id
            ]);
            $UserChat->user_chat_id = $this->querier->insert($UserChat)->run();
        }

        $url = "https://".__DOMAIN__."/?code=".$UserActivation->user_activation_code;
        $domain = __DOMAIN__;
        ob_start();
            include __BASE_DIR__ . 'src/views/email/verify-email.phtml';
        $html = ob_get_clean    ();
        
        // send activation email
        $SES = new SES(__AWS_ACCESS_KEY_ID__, __AWS_SECRET_ACCESS_KEY__, __AWS_REGION__);
        $SES->sendEmail(
            [$email],
            'noreply@zaflegal.com',
            $html,
            "Welcome to ZAF!"
        );

        try {
            $lh = new Lighthouse();
            $response = $lh->send([
                'session_id' => session_id(),
                'first_name' => $first_name,
                'last_name' => $last_name,
                'email' => $email,
                'phone' => $phone,
                'is_demo' => !empty($is_demo)?true:false
            ], 'GET', '/v1/chatbot/chat/updateCustomer');
            $this->data = $response->data;
        } catch (\Throwable $e){
            $this->data = $e->getMessage();
        }

        $this->data = "success";
    }

    /**
     * activate
     * 
     * Activates a user account
     * 
     * @param string $code
     * @return void
     * @throws \Exception
     */

    public function activate(string $code, string $session_id = null)
    {
        // get user activation
        $UserActivation = $this->querier->select(UserActivation::class)->where([
            'user_activation_code' => $code,
            'user_activation_is_activated' => false
        ])
            ->join('user', User::class, [UserActivation::class, 'UserActivations'], 'user_id', 'user_id')
            ->limit(1)
            ->run();

        // check if user activation exists
        if(empty($UserActivation)){
            $this->data = "failed";
            return;
        } 

        // activate user
        $UserActivation->user[0]->user_is_active = true;
        $this->querier->update($UserActivation->user[0])->run();

        // activate user activation
        $UserActivation->user_activation_is_activated = true;
        $this->querier->update($UserActivation)->run();

        try {
            $lh = new Lighthouse();
            $response = $lh->send([
                'session_id' => session_id()
            ], 'GET', '/v1/chatbot/chat/activateCustomer');
        } catch (\Throwable $e){
            $e->getMessage();
        }

        $chat = Lighthouse::getChat($UserActivation->user[0]->user_first_name, $UserActivation->user[0]->user_last_name, $session_id);
        
        $UserChat = $this->querier->select(UserChat::class)->where([
            'chat_id' => $chat->data->chat_id
        ])->limit(1)->run();
        if(empty($UserChat)){
            $UserChat = new UserChat(...[
                'user_id' => $UserActivation->user[0]->user_id,
                'customer_case_id' => $chat->data->customer_case_id,
                'chat_id' => $chat->data->chat_id
            ]);
            $UserChat->user_chat_id = $this->querier->insert($UserChat)->run();
        }
        

        // indicate succces
        return $this->data = "success";
    }

    /**
     * auth
     * 
     * Authenticates a user
     * 
     * @param string $email 
     * @param string $password 
     * @return void 
     */

    public function auth(string $email, string $password)
    {
        $Authenticator = new \models\auth\Authenticator($this->querier, $this->session);
        $this->data = new \stdClass();

        $this->data->user = $Authenticator->login($email, $password);
        $this->data->start = '/case/';
    }

    public function logout()
    {
        session_start();
        session_destroy();
        header('Location: /');
        exit();
    }

}