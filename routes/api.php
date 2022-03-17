<?php

use App\Models\Equipment;
use App\Models\EquipmentType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/**
 **Basic Routes for a RESTful service:
 **Route::get($uri, $callback);
 **Route::post($uri, $callback);
 **Route::put($uri, $callback);
 **Route::delete($uri, $callback);
 **
 */
Route::get('equipment-types', function () {
    return response(EquipmentType::all(), 200);
});

Route::get('equipments', 'App\Http\Controllers\EquipmentController@index');

Route::get('equipments/{id}', 'App\Http\Controllers\EquipmentController@show');

Route::post('equipments', 'App\Http\Controllers\EquipmentController@store');

Route::put('equipments/{id}', 'App\Http\Controllers\EquipmentController@update');

Route::delete('equipments/{id}', 'App\Http\Controllers\EquipmentController@delete');
