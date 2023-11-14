<?php
namespace models\system\encryption;

class Crypt
{
    
    const CYPHER = 'AES-128-CTR';

    static public function encrypt(string $string_to_encrypt)
    {
        $ivlen = openssl_cipher_iv_length(SELF::CYPHER);
        $iv = openssl_random_pseudo_bytes($ivlen);
        $hex = bin2hex($iv);
        $key = __ENCRYPTION_KEY__;
        $encrypted_string = openssl_encrypt($string_to_encrypt, SELF::CYPHER, $key, 0, $iv);
        $encrypted_string = base64_encode($hex . $encrypted_string);
        return $encrypted_string;
    }

    static public function decrypt($encrypted_string)
    {
        $encrypted_string = base64_decode($encrypted_string);
        $iv = hex2bin(substr($encrypted_string, 0, 32));
        $key = __ENCRYPTION_KEY__;
        $ciphertext_raw = substr($encrypted_string, 32);
        $original_plaintext = openssl_decrypt($ciphertext_raw, SELF::CYPHER, $key, 0, $iv);
        return $original_plaintext;
        
    }

    static public function generateKey()
    {
        return openssl_random_pseudo_bytes(512);
    }
}