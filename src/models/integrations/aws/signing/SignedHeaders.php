<?php
namespace models\integrations\aws\signing;

use obray\core\Helpers;

class SignedHeaders
{
    private array $keys;

    public function __construct(array $headers)
    {
        $this->keys = array_keys($headers);
    }

    public function __toString(): string
    {
        
        $signedHeaders = [];
        forEach($this->keys as $index => $key){
            $this->keys[$index] = strtolower(($key));
        }
        sort($this->keys);
        forEach($this->keys as $key){
            $signedHeaders[] = strtolower($key);
        }
        return implode(';', $signedHeaders);
    }
}