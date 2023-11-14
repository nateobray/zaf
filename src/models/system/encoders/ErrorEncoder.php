<?php

namespace models\system\encoders;

use models\system\exceptions\SystemException;
use models\system\exceptions\SystemExceptionCode;
use models\system\files\File;
use models\system\files\FileExtension;
use models\system\files\FileType;
use obray\core\encoders\ErrorEncoder as EncodersErrorEncoder;
use obray\core\exceptions\UserLevelException;
use obray\data\DBConn;
use obray\data\Querier;

/**
 * This class is used to invoke or call a method on a specified object
 */

Class ErrorEncoder extends EncodersErrorEncoder
{
    /**
     * Takes some data and encodes it to json.
     *
     * @param mixed $data The data to be encoded
     *
     * @return mixed
     */
    public function encode($data, $start_time)
    {
        if ($data instanceof \Exception) {
            // create a new querier
            $querier = new Querier(new DBConn(
                __BASE_DB_HOST__,
                __BASE_DB_USERNAME__,
                __BASE_DB_PASSWORD__,
                __BASE_DB_NAME__
            ));

            $File = new File(...[
                'file_extension_id' => FileExtension::JSON,
                'file_type_id' => FileType::JSON,
                'file_path' => '/exceptions/' . File::generateFileName('json')
            ]);
            
            $File->file_id = $querier->insert($File)->run();
            $trace = new \stdClass();
            
            $trace->trace = $data->getTrace();
            if($data instanceof \obray\core\exceptions\UserLevelException){
                $trace->request = $data->getServerRequest();
            }
            
            $File->file_contents = json_encode($trace);
            $File->save($querier);
            
            // create a system exception and insert it
            $SystemException = new SystemException(...[
                'system_exception_code_id' => SystemExceptionCode::UNCAUGHT,
                'system_exception_message' => $data->getMessage(),
                'system_exception_line' => $data->getLine(),
                'system_exception_file' => $data->getFile(),
                'system_exception_trace_file_id' => $File->file_id
            ]);
            $SystemException->system_exception_id = $querier->insert($SystemException)->run();
            
            // append the system_exception_id to the error message to aid debugging
            if($data instanceof UserLevelException){
                $data->appendToMessage('(' . $SystemException->system_exception_id . ')');
            }
        }

        // call original encode method
        return parent::encode($data, $start_time);
    }
}

?>