<?php
namespace models\integrations\aws\signing;

class CanonicalHeaders
{
    private $headers;

    public function __construct(array $headers)
    {
        $this->headers = $headers;
    }

    public function __toString(): string
    {
        $canonicalHeader = ''; $lowerCaseHeaders = [];
        // 1. The header names were converted to lowercase characters.
        forEach($this->headers as $key => $value){
            $lowerCaseHeaders[strtolower($key)] = $value;
        }
        // 2. The headers were sorted by character code.
        ksort($lowerCaseHeaders);
        // 3. Leading and trailing spaces were removed from the my-header1 and my-header2 values.
        // 4. Sequential spaces in a b c were converted to a single space for the my-header1 and my-header2 values.
        forEach($lowerCaseHeaders as $key => $value){
            $canonicalHeader .= strtolower($key) . ':' . preg_replace('/\s+/', ' ', trim($value)) . "\n";
        }
        return $canonicalHeader;
    }
}