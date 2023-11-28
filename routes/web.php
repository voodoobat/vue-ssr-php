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

$router->get('/', function () use ($router) {
    $data = json_encode(['message' => 'message from server']);
    $assets = json_decode(Storage::disk('local')->get('.vite/manifest.json'), true);
    $path2script = realpath('../frontend/hydrate-ssr.js');
    $template = shell_exec('node ' . $path2script . ' --component Greeting' . ' --data ' . '\'' . $data . '\'');

    return $template;
});
