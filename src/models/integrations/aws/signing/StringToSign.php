<?php
namespace models\integrations\aws\signing;

use DateTime;

class StringToSign
{
    private string $HashedCanonicalRequest;
    private string $region;
    private string $service;
    private DateTime $date;

    public function __construct(string $hashedCanonicalRequest, string $region, string $service, DateTime $date)
    {
        $this->HashedCanonicalRequest = $hashedCanonicalRequest;
        $this->region = $region;
        $this->service = $service;
        $this->date = $date;
    }

    public function __toString(): string
    {
        $stringToSign = "AWS4-HMAC-SHA256\n";
        $stringToSign .= $this->date->format('Ymd\THis\Z') . "\n";
        $stringToSign .= $this->date->format('Ymd') . '/' . $this->region . '/' . $this->service . "/aws4_request\n";
        $stringToSign .= $this->HashedCanonicalRequest;    
            
        return $stringToSign;
    }
}