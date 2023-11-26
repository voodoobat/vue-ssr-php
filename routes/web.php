<?php

/** @var \Laravel\Lumen\Routing\Router $router */

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
    $assets = json_decode(Storage::disk('local')->get('.vite/manifest.json'), true);

    return view('index', [
        'content' => 'Hi there',
        'assets' => $assets,
    ]);
});
