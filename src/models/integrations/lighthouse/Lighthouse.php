<?php
namespace models\integrations\lighthouse;

class Lighthouse
{
    const ENDPOINT = 'bm.obray.net';

    static public function send(array|NULL $message, $method = 'POST', $path = '/v1/integrations/openai/chat/converseSignup')
    {
        
        $data = [
            'session_id' => session_id(),
        ];
        if(!empty($message)) $data = array_merge($data, $message);
        if(strtolower($method) === 'get' && strpos($path, '?') === false) $path .= '?' . http_build_query($data);
        if(strtolower($method) === 'get' && strpos($path, '?') !== false) $path .= '&' . http_build_query($data);

        $ch = curl_init();   
        $url = 'https://' . __LIGHTHOUSE__ . $path;
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        if(strtolower($method) === 'post') curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        
        $response = curl_exec($ch);
        
        $info = curl_getinfo($ch);
        return json_decode($response);
    }

    static public function getChat(string $first_name, string $last_name, string $session_id = null)
    {
        if(empty($session_id)) $session_id = session_id();
        return self::send([
            'session_id' => $session_id,
            'first_name' => $first_name,
            'last_name' => $last_name,
        ], 'GET', '/v1/integrations/openai/chat/createCase/');
    }

    public function sendReceiveChunks(string $path, $callback)
    {
        $ch = curl_init();   
        $url = 'https://' . __LIGHTHOUSE__ . $path . '&session_id=' . session_id();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET'); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 300);
        
        if(!empty($callback)){
            
            curl_setopt($ch, CURLOPT_WRITEFUNCTION, $callback);
            
            // Initialize multiple curl handle
            $mh = curl_multi_init();
            curl_multi_add_handle($mh, $ch);

            $active = null;
            // Execute the handles
            do {
                $status = curl_multi_exec($mh, $active);
                if ($status > 0) {
                    // Error handling here
                    break;
                }
            } while ($status === CURLM_CALL_MULTI_PERFORM || $active);

            // Close the handles
            curl_multi_remove_handle($mh, $ch);
            curl_multi_close($mh);
        } 

    }
}