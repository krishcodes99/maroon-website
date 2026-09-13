<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/maroon-check', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'Welcome to the Maroon API!'
    ]);
});