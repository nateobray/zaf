<?php
namespace models\system;

class GUID
{
    static function v4($data = null)
    {
        $data = $data ?? random_bytes(16);
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }
}