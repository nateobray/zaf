<?php
namespace models\integrations\aws;

class S3 extends AWS
{
    protected $service = 's3';

    public function createBucket(string $bucket)
    {
        $payload = '<CreateBucketConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><LocationConstraint>'.$this->region.'</LocationConstraint></CreateBucketConfiguration>';
        $this->send('PUT', 'https://' . $bucket . '.' . $this->service . '.' . $this->region . '.amazonaws.com?x-amz-acl=private', $payload);
    }

    public function put(string $bucket, string $path, string $payload)
    {
        $this->send('PUT', 'https://' . $bucket . '.' . $this->service . '.' . $this->region . '.amazonaws.com'.$path, $payload);
    }

    public function get(string $bucket, string $path)
    {
        return $this->send('GET', 'https://' . $bucket . '.' . $this->service . '.' . $this->region . '.amazonaws.com'.$path);
    }
}