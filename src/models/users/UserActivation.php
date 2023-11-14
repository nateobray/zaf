<?php
namespace models\users;

use obray\data\DBO;
use obray\data\types\Boolean;
use obray\data\types\DateTimeCreated;
use obray\data\types\DateTimeModified;
use obray\data\types\ForeignKey;
use obray\data\types\PrimaryKey;
use obray\data\types\Varchar255;

class UserActivation extends DBO
{
    const TABLE = 'UserActivations';

    public PrimaryKey $col_user_activation_id;
    public ForeignKey $col_user_id;
    public Varchar255 $col_user_activation_code;
    public Boolean $col_user_activation_is_sent;
    public Boolean $col_user_activation_is_activated;
    public Varchar255 $col_user_session_id;
    public DateTimeCreated $col_user_activation_created;
    public DateTimeModified $col_user_activation_modified;

    const FOREIGN_KEYS = [
        ['user_id', 'Users', 'user_id']
    ];
}