<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AuthController;
use GuzzleHttp\Middleware;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
    Route::post('login',[AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);

  route:: middleware ('auth:api')->group(function () {
        Route::get('student',[StudentController::class, 'index']);
        Route::get('student/{id}/edit',[StudentController::class, 'edit']);
        Route::post('create',[StudentController::class, 'store']);
        Route::put('update/{id}',[StudentController::class, 'update']);
        Route::delete('delete/{id}',[StudentController::class, 'destroy']);
  });











