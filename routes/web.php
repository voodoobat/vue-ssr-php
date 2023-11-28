<?php

/** @var \Laravel\Lumen\Routing\Router $router */

// use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
$data = ['message' => 'message from server', 'initialClickCount' => 0];

$router->get('/', function () use ($data) {
    $json = json_encode($data);
    $assets = json_decode(Storage::disk('local')->get('.vite/manifest.json'), true);
    $path2script = realpath('../frontend/hydrate-ssr.js');
    $component = shell_exec('node ' . $path2script . ' --component Greeting' . ' --data ' . '\'' . $json . '\'');

    return view('home', ['component' => $component, 'assets' => $assets]);
});

$router->get('/data', function() use ($data) {
    return $data;
});
