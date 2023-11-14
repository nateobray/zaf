<?php

use obray\containers\DIContainer;
use obray\core\encoders\ConsoleEncoder;
use obray\core\encoders\CSVEncoder;
use obray\core\encoders\ErrorEncoder;
use obray\core\encoders\HTMLEncoder;
use obray\core\encoders\JSONEncoder;
use obray\core\Factory;
use obray\core\Invoker;
use obray\core\Router;
use obray\sessions\Session;
use obray\users\PermissionHandler;

// starttime and error handling
$starttime = microtime(TRUE);
error_reporting(E_ALL);
ini_set('display_errors', false);

$loader = require_once "vendor/autoload.php";

require_once __DIR__ . '/settings.php';

// setup required container, factory, and invoker
$container = new DIContainer(dirname(__FILE__).'/dependencies/config.php');
$factory = new Factory($container);
$invoker = new Invoker();
$container->useFactory($factory);

// setup router
$router = new Router($factory, $invoker, $container, TRUE, $starttime);
$router->setCheckPermissionsHandler(new PermissionHandler(new Session()));
$router->setErrorEncoder(new ErrorEncoder(),"error","application/json");
$router->setConsoleEncoder(new ConsoleEncoder(),"console","console");
$router->addEncoder(new JSONEncoder(false),"data","application/json");
$router->addEncoder(new HTMLEncoder(),"html","text/html");
$router->addEncoder(new CSVEncoder(),"csv","text/csv");

// run the router
$router->route();
