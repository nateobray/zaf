<?php
namespace controllers;

use obray\users\Permission;

class Index
{
    const PERMISSIONS = [
        'object' => Permission::ANY,
        'get' => Permission::ANY,
    ];

    public string $html;

    public function __construct()
    {
        
    }

    public function get()
    {
        $this->html = '<html>
            <head>
                <title>ZAF - Personal Injury, Zero Attorney Fees</title>
                <link rel="stylesheet" href="/assets/css/style.css">
                <link rel="stylesheet" href="/assets/css/all.min.css">
                <script type="module" src="/assets/js/App.js"></script>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
            
            </body>
        </html>';
    }
}