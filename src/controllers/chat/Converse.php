<?php
namespace controllers\chat;

use models\integrations\lighthouse\Lighthouse;
use obray\sessions\Session;
use obray\users\Permission;

class Converse
{
    const PERMISSIONS = [
        'object' => Permission::ANY,
        'get' => Permission::ANY,
        'post' => Permission::ANY,
        'message' => Permission::ANY,
    ];

    private Session $session;
    public mixed $data = null;

    public function __construct(Session $session)
    {
        $this->session = $session;
    }


    public function get(int $AIType=1)
    {

        try {
            $lh = new Lighthouse();
            $response = $lh->send([
                'customer_case_id' => $this->session->user->cust_chat->customer_case_id??0,
                'chat_type_id' => $AIType,
                'session_id' => session_id()
            ], 'GET', '/v1/chatbot/chat/createChat');
            
            $this->data = $response->data;
        } catch (\Throwable $e){
            $this->data = $e->getMessage();
        }
    }

    public function message(string $message = "", string $type = "", int $AIType=1)
    {
        header('Content-Type: text/event-stream');
        header('Cache-Control: no-cache');
        
        $role = 'assistant';
        if($type === 'client') $role = 'user';
        try {
            $lh = new Lighthouse();
            $response = $lh->sendReceiveChunks('/v1/chatbot/chat/message/?session_id=' . session_id() . '&message=' . urlencode($message) . '&chat_type_id=' . $AIType, function($ch, $str) {
            
                echo $str;
                if (ob_get_length() > 0) ob_flush();
                flush();
                   
                return strlen($str);
                
            });
            
        } catch (\Throwable $e){
            $this->data = $e->getMessage();
        }
        exit();
    }

    public function receiveMessage()
    {

    }

}