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
Route::get('equipment-type', function () {
    return response(EquipmentType::all(), 200);
});

Route::get('equipment', function () {
    return response(Equipment::all(), 200);
});

Route::get('equipment/{id}', function ($id) {
    return response(Equipment::find($id), 200);
});

Route::post('equipment', function (Request $request) {
    return response(Equipment::create($request->all()), 200);
});

Route::put('equipment/{id}', function (Request $request, $id) {
    $equipment = Equipment::findOrFail($id);
    $equipment->update($request->all());
    return response($equipment, 200);
});

Route::delete('equipment/{id}', function ($id) {
    Equipment::find($id)->delete();
    return 204;
});
