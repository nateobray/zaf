<?php
namespace models\integrations\aws;

use models\integrations\aws\signing\CanonicalRequest;
use models\integrations\aws\signing\Signature;
use models\integrations\aws\signing\StringToSign;

class AWS
{
    protected $access_id;
    protected $secret;
    protected $region;
    protected $service = 's3';

    public function __construct(string $access_id, string $secret, $region='us-east-1')
    {
        $this->access_id = $access_id;
        $this->secret = $secret;
        $this->region = $region;
    }

    public function send(string $method, string $url, $payload='', array $headers = [])
    {
        $parts = parse_url($url);
        $date = new \DateTime('UTC');

        $headers = array_merge([
            'Host' => $parts['host'],
            'Content-Type' => 'text/plain; charset=utf-8',
            'X-Amz-Content-Sha256' => hash('sha256', $payload),
            'X-Amz-Date' => $date->format('Ymd\THis\Z')
        ], $headers);

        if(!empty($payload)){
            $headers['Content-Length'] = strlen($payload);
        }
        
        $CanonicalRequest = new CanonicalRequest($method, $parts['path']??'/', $parts['query']??'', $headers, $payload);
        $StringToSign = new StringToSign($CanonicalRequest, $this->region, $this->service, $date);
        $Signature = new Signature($this->secret, $this->region, $this->service, $StringToSign);
        $authorization = [
            'AWS4-HMAC-SHA256 Credential='.$this->access_id.'/'.$date->format('Ymd').'/'.$this->region.'/'.$this->service.'/aws4_request',
            'SignedHeaders=' . $CanonicalRequest->getSignedHeaders(),
            'Signature=' . $Signature
        ];
        $headers['Authorization'] = implode(', ', $authorization);

        $ch = curl_init($url);

        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $this->headersFromArray($headers));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        //curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        if(!empty($payload)){
            curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        }

        $response = curl_exec($ch);
        
        $headers = curl_getinfo($ch, CURLINFO_HEADER_OUT);
        $responseCode = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

        if($contentType == 'application/xml' && $responseCode !== 200){
            $xml = simplexml_load_string($response);
            throw new \Exception((string)$xml->Code . ': ' . (string)$xml->Message);
        }
        //print_r($headers . "" . $payload);
        //print_r("\n\n");
        //print_r("*** RESPONSE (".$responseCode.") ***\n\n");
        //print_r($response . "\n\n");
        return $response;

    }

    private function headersFromArray(array $headers)
    {
        $h = [];
        forEach($headers as $key => $value)
        {
            $h[] = $key . ': ' . $value;
        };
        $h[] = 'Accept:';
        return $h;
    }
}