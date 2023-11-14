<?php
namespace controllers;

use obray\sessions\Session;
use obray\users\Permission;

class Users
{
    const PERMISSIONS = [
        'object' => Permission::ANY,
        'get' => Permission::ANY,
        'post' => Permission::ANY,
    ];

    private Session $session;
    public mixed $data = null;

    public function __construct(Session $session)
    {
        $this->session = $session;
    }

    public function get()
    {
        try {
            $this->data = $this->session->user;
            return $this->data;
        } catch (\Throwable $e){
            $this->data = $e->getMessage();
        }
    }
}