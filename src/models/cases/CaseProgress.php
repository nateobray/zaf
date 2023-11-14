<?php
namespace models\cases;

use obray\data\DBO;
use obray\data\types\Boolean;
use obray\data\types\ForeignKey;
use obray\data\types\PrimaryKey;

class CaseProgress extends DBO
{
    const TABLE = 'CaseProgress';

    public PrimaryKey $case_progress_id;
    public ForeignKey $case_id;
    public ForeignKey $case_step_id;
    public Boolean $case_step_is_complete;

    const INDEXES = [
        ['case_step_is_complete']
    ];

    const FOREIGN_KEYS = [
        ['case_id', 'Cases', 'case_id'],
        ['case_step_id', 'CaseSteps', 'case_step_id']
    ];
}