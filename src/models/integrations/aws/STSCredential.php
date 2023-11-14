<?php
namespace models\integrations\aws;

use obray\data\DBO;
use obray\data\types\DateTime;
use obray\data\types\Int11Unsigned;
use obray\data\types\Int11UnsignedNullable;
use obray\data\types\PrimaryKey;
use obray\data\types\Text;
use obray\data\types\Varchar64;

class STSCredential extends DBO
{
    const TABLE = 'STSCredentials';

    public PrimaryKey $col_sts_credential_id;
    public Int11UnsignedNullable $col_amazon_integration_id;
    public Varchar64 $col_sts_credential_access_key;
    public Varchar64 $col_sts_credential_secret;
    public Text $col_sts_session_token;
    public DateTime $col_sts_expiration_date;

    const INDEXES = [
        ['sts_expiration_date']
    ];
}