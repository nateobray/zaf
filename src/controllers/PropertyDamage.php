<?php
namespace controllers;

use models\integrations\lighthouse\Lighthouse;
use obray\sessions\Session;
use obray\users\Permission;

class PropertyDamage
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

    public function get(int $accident_id)
    {
        $this->data = Lighthouse::send([
            'chat_id' => $this->session->user->chat->chat_id??null,
            'accident_id' => $accident_id
        ], 'GET', '/v1/customers/cases/propertyDamage/')->data;
    }
}