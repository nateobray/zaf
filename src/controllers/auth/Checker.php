<?php
namespace Controllers\Auth;

use obray\data\Querier;
use obray\sessions\Session;
use obray\users\Permission;

class Checker
{
    const PERMISSIONS = [
        'object' => Permission::ANY,
        'get' => Permission::ANY,
    ];

    private Querier $querier;
    private Session $session;
    public mixed $data;

    public function __construct(Querier $querier, Session $session)
    {
        $this->querier = $querier;
        $this->session = $session;
    }

    public function get()
    {
        
        $User = $this->session->user;
        if(empty($User->user_email)) {
            throw new \Exception("Unauthorized");
        } 
        $this->data = $this->session->get('user');
    }
    
}
