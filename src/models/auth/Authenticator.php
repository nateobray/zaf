<?php
namespace models\auth;

use models\system\encryption\Crypt;
use models\users\User;
use models\users\UserChat;
use obray\core\Helpers;
use obray\data\Querier;
use obray\sessions\Session;
use obray\users\Permission;
use obray\users\UserPermission;

/**
 * Authenticate users and store user information into our session.  
 * 
 * Once a user is "logged" in then we store their information including, a list of all their 
 * permissions, in the session.  We then use the session data to validate subsequent requests 
 * against the PERMISSION constant on controller classes.
 */
class Authenticator
{
    private Querier $querier;
    private Session $session;
    /**
     * We use our constructor to setup our dependencies
     * 
     * @param Querier $querier provides database access
     * @param Session $session provides session access
     */
    public function __construct(Querier $querier, Session $session)
    {
        $this->querier = $querier;
        $this->session = $session;
    }

    /**
     * Log a user into our system
     * 
     * Once we've validated the users email and password we then store their data and permissions
     * in the session.  We return the authenticated users information.
     * 
     * @param string $user_email the users email
     * @param string $user_password the user password
     * 
     * @return User
     */
    public function login(string $user_email, string $user_password): User
    {
        // find a user with the specified email address
        $User = $this->querier->select(User::class)->where([
            'user_email' => $user_email
        ])->limit(1)->run();
        if(empty($User)) throw new \Exception("User not found.");

        // validate and compare passwords
        if(empty($User->user_password) || !password_verify((string)$user_password, Crypt::decrypt($User->user_password))){
            $User->user_failed_attempts += 1;
            $this->querier->update($User)->run();
            throw new \Exception("Invalid credentials.");
        }

        return $this->buildSession($User);
    }

    public function buildSession(User $User)
    {
        // query the users permissions
        $UserPermissions = $this->querier->select(UserPermission::class)
            ->join('permission', Permission::class)
            ->where([
                'user_id' => $User->user_id
            ])->run();
        
        // save the permission as a string in a permissions array
        $permissions = [];
        forEach($UserPermissions as $UserPermission){
            $permission = reset($UserPermission->permission);
            $permissions[] = $permission->permission_id;
        }
        
        $User->user_last_login = date('Y-m-d H:i:s');
        $this->querier->update($User)->run();

        $UserChat = $this->querier->select(UserChat::class)->where([
            'user_id' => $User->user_id
        ])->orderBy(['chat_id DESC'])->limit(1)->run();
        
        // assign user information to our session data
        $User->cust_permissions = $permissions;
        $User->cust_chat = $UserChat;
        $this->session->user = $User;
        return $this->session->user;
    }
}