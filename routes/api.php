<?php

use App\Http\Controllers\CommentsController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ThreadController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/posts', [PostController::class, 'index']);
Route::get('/post/{id}', [PostController::class, 'getPost']);
Route::post('/post/like/{id}', [PostController::class, 'likePost']);
Route::put('/post/{post}', [PostController::class, 'update']);
Route::post('/user/create', [UserController::class, 'create']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/password', [ForgotPasswordController::class, 'forgotPassword']);
Route::post('/password/reset', [ForgotPasswordController::class, 'resetPassword']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/user/current', [UserController::class, 'getUser']);
    Route::post('/user/change', [UserController::class, 'change']);
    Route::post('/outer', [UserController::class, 'logOut']);
    Route::post('/post/create', [PostController::class, 'create']);
    Route::post('/create/thread', [ThreadController::class, 'create']);
    Route::get('/list/threads', [ThreadController::class, 'list']);
    Route::post('/create/message/{id}', [ThreadController::class, 'create_message']);
    Route::get('/post/delete/{id}', [PostController::class, 'delete']);
    Route::post('/post/comment', [CommentsController::class, 'create']);
});

Broadcast::routes(['middleware' => ['auth:sanctum']]);