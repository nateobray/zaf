<?php
namespace models\integrations\aws;

use obray\core\Helpers;

class SES extends AWS
{
    protected $service = 'ses';

    public function sendEmail(array $to, string $from = '', string $content = '', string $subject = '', array $cc = [], array $bcc = []){

        $payload = [
            'Content' => [
                'Simple' => [
                    'Body' => [
                        'Html' => [
                            'Charset' => 'utf-8',
                            'Data' => $content
                        ],
                        'Text' => [
                            'Charset' => 'utf-8',
                            'Data' => $content
                        ]
                    ],
                    'Subject' => [
                        'Charset' => 'utf-8',
                        'Data' => $subject
                    ]
                ]
            ],
            'Destination' => [ 
                "ToAddresses" => $to
            ],
            'FromEmailAddress' => $from
        ];

        if(!empty($bcc)) $payload['Destination']['BccAddresses'] = $bcc;
        if(!empty($cc)) $payload['Destination']['CcAddresses'] = $cc;

        $payload = json_encode($payload, JSON_PRETTY_PRINT);

        $response = $this->send('POST', 'https://email.us-west-2.amazonaws.com/v2/email/outbound-emails', $payload, [
            'Content-Type' => 'application/json'
        ]);

        return $response;

    }
}