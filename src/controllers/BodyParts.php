<?php
namespace controllers;

use models\integrations\lighthouse\Lighthouse;
use obray\data\Querier;
use obray\sessions\Session;
use obray\users\Permission;

class BodyParts
{
    const PERMISSIONS = [
        'object' => Permission::ANY,
        'get' => Permission::ANY,
        'post' => Permission::ANY,
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
        $this->data = Lighthouse::send([], 'GET', '/v1/customers/cases/BodyParts/')->data;
    }

    public function post(array $body_part_id = [])
    {
        return $this->data = Lighthouse::send(['body_part_ids' => array_values(array_filter($body_part_id))], 'GET', '/v1/customers/cases/BodyParts/post/');
    }
}