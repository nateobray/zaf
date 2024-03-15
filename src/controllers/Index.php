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
            
                <!-- Google tag (gtag.js) -->
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-4JL8CCKYB2"></script>
                <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag(\'js\', new Date());

                    gtag(\'config\', \'G-4JL8CCKYB2\');
                    gtag(\'config\', \'AW-11482071246\');
                </script>
            </body>
        </html>';
    }
}