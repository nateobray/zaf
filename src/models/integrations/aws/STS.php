<?php
namespace models\integrations\aws;

class STS extends AWS
{
    protected $service = 'sts';

    public function assumeRole()
    {
        $response = $this->send('GET', 'https://sts.amazonaws.com/?Version=2011-06-15&&Action=AssumeRole&RoleSessionName=test&RoleArn=' . __AMZ_ROLE_ARN__);
        return $response;
    }
}