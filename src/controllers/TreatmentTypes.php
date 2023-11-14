<?php
namespace controllers;

use models\integrations\lighthouse\Lighthouse;
use obray\data\Querier;
use obray\sessions\Session;
use obray\users\Permission;

class TreatmentTypes
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
        $this->data = Lighthouse::send([], 'GET', '/v1/customers/cases/TreatmentTypes/')->data;
    }
}