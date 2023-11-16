<?php
namespace controllers\chat;

use models\integrations\lighthouse\Lighthouse;
use obray\sessions\Session;
use obray\users\Permission;

class Upload
{
    const PERMISSIONS = [
        'object' => Permission::ANY,
        'post' => Permission::ANY,
    ];

    private Session $session;
    public mixed $data = null;

    public function __construct(Session $session)
    {
        $this->session = $session;
    }

    public function post(string $document_type)
    {
        if(empty($_FILES)) throw new \Exception("No files selected.");
        $files = $_FILES['file'];

        $fileName = $files['name'];
        $extension = explode('.', $files['name']);
        $extension = $extension[count($extension)-1];
        $fileSize = $files['size'];
        $fileType = $files['type'];
        $tmpFile = $files['tmp_name'];

        $lh = new Lighthouse();
        $response = $lh->send(["session_id"=> session_id(), "tmpFile" =>$tmpFile, "extension" => $extension, "fileType" => $fileType, "fileName" => $fileName, "fileSize" => $fileSize, "document_type" => $document_type], 'POST', '/v1/customers/cases/CaseDocuments/fromTemp');

        $this->data = $response->data;
    }
}