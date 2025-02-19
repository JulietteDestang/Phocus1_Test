<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InterestController;
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
Route::get('/', function () {
    return view('InterestCalculator');
});

Route::post('/simulate-interest', [InterestController::class, 'simulateInterest']);
Route::post('/calculate-investment', [InterestController::class, 'calculateInvestment']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
