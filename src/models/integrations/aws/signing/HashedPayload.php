<?php
namespace models\integrations\aws\signing;

class HashedPayload
{
    private $payload;

    public function __construct(string $payload)
    {
        $this->payload = $payload;
    }

    public function __toString(): string
    {
        return hash('sha256', $this->payload);
    }
}