<?php
namespace models\cases;

use obray\data\DBO;
use obray\data\sql\SQLForeignKey;
use obray\data\types\ForeignKey;
use obray\data\types\PrimaryKey;

class Cases extends DBO
{
    const TABLE = 'Cases';

    public PrimaryKey $col_case_id;
    public ForeignKey $user_id;

    const FOREIGN_KEYS = [
        ['user_id', 'Users', 'user_id', SQLForeignKey::RESTRICT, SQLForeignKey::RESTRICT]
    ];
}