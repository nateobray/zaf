<?php
namespace models\cases;

use obray\data\DBO;
use obray\data\sql\SQLForeignKey;
use obray\data\types\ForeignKey;
use obray\data\types\ForeignKeyNullable;
use obray\data\types\PrimaryKey;
use obray\data\types\Varchar128;

class CaseStep extends DBO
{
    const TABLE = 'CaseSteps';

    public PrimaryKey $col_case_step_id;
    public ForeignKeyNullable $col_case_step_parent_id;
    public Varchar128 $col_case_step_name;

    const FOREIGN_KEYS = [
        ['case_step_parent_id', 'CaseSteps', 'case_step_id', SQLForeignKey::RESTRICT, SQLForeignKey::RESTRICT]
    ];
}