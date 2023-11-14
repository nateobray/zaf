<?php
namespace models\integrations\aws\signing;

use models\integrations\aws\signing\CanonicalHeaders;
use models\integrations\aws\signing\CanonicalQueryString;
use models\integrations\aws\signing\HashedPayload;
use models\integrations\aws\signing\SignedHeaders;

class CanonicalRequest
{
    private string $HTTPRequestMethod;
    private string $CanonicalURI;
    private string $CanonicalQueryString;
    private string $CanonicalHeaders;
    private string $SignedHeaders;
    private string $HashedPayload;

    const VALID_METHODS = ['GET','POST', 'PUT', 'PATCH', 'DELETE'];

    public function __construct(string $method, string $uri='/', string $query='', $headers=[], $payload='')
    {
        if(!in_array($method, self::VALID_METHODS)) throw new \Exception('Invalid http method: '. $method);
        if(empty($uri)) $uri = '/';

        $this->HTTPRequestMethod = $method;
        $this->CanonicalURI = $uri;
        $this->CanonicalQueryString = new CanonicalQueryString($query);
        $this->CanonicalHeaders = new CanonicalHeaders($headers);
        $this->SignedHeaders = new SignedHeaders($headers);
        $this->HashedPayload = new HashedPayload($payload);

    }

    public function getSignedHeaders(): string
    {
        return $this->SignedHeaders;
    }

    public function getRawCanonicalString()
    {
        $CanonicalRequest = $this->HTTPRequestMethod . "\n";
        $CanonicalRequest .= $this->CanonicalURI . "\n";
        $CanonicalRequest .= $this->CanonicalQueryString . "\n";
        $CanonicalRequest .= $this->CanonicalHeaders . "\n";
        $CanonicalRequest .= $this->SignedHeaders . "\n";
        $CanonicalRequest .= $this->HashedPayload;
        return $CanonicalRequest;
    }

    public function __toString(): string
    {
        $CanonicalRequest = $this->getRawCanonicalString();
        return hash('sha256', $CanonicalRequest);
    }
    
}