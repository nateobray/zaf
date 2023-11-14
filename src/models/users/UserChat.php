<?php
namespace models\users;

use obray\data\DBO;
use obray\data\types\DateTimeCreated;
use obray\data\types\ForeignKey;
use obray\data\types\ForeignKeyNullable;
use obray\data\types\Int11Unsigned;
use obray\data\types\PrimaryKey;

class UserChat extends DBO
{
    const TABLE = 'UserChats';

    public PrimaryKey $col_user_chat_id;
    public Int11Unsigned $col_chat_id;
    public Int11Unsigned $col_customer_case_id;
    public ForeignKey $col_user_id;
    public DateTimeCreated $col_date_created;

    const INDEXES = [
        ['chat_id', 'UNIQUE']
    ];

    const FOREIGN_KEYS = [
        ['user_id', 'Users', 'user_id']
    ];
}