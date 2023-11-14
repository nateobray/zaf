<?php
namespace models\integrations\aws\signing;

class CanonicalQueryString
{
    private $query;
    
    public function __construct(string $queryString)
    {
        parse_str($queryString, $this->query);
    }

    public function __toString(){
        
        ksort($this->query); $queryStr = [];
        forEach($this->query as $k => $q){ 
            $queryStr[] = rawurlencode($k) . '=' . rawurlencode($q);
        }
        return implode('&', $queryStr);
    }
}