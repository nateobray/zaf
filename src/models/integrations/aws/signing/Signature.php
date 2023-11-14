<?php
namespace models\integrations\aws\signing;

class Signature
{
    private string $secret;
    private string $region;
    private string $service;
    private string $stringToSign;

    public function __construct(string $secret, string $region, string $service, string $stringToSign)
    {
        $this->secret = $secret;
        $this->region = $region;
        $this->service = $service;
        $this->stringToSign = $stringToSign;
    }

    public function __toString(): string
    {
        $date = new \DateTime('UTC');
        $kDate = hash_hmac('sha256', $date->format('Ymd'), 'AWS4' . $this->secret, true);
        $kRegion = hash_hmac('sha256', $this->region, $kDate, true);
        $kService = hash_hmac('sha256', $this->service, $kRegion, true);
        $kSigning = hash_hmac('sha256', "aws4_request", $kService, true);
        $signature = hash_hmac('sha256', $this->stringToSign, $kSigning);
        return $signature;
    }
}