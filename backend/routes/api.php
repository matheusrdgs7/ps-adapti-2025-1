<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\VeiculoController;
use App\Models\Veiculo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json(Auth::user(), Response::HTTP_OK);
    });
});

    

Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    Route::apiResource('/users', UserController::class);

    Route::post('/categorias', [CategoriaController::class, 'store']);
    Route::put('/categorias/{id}', [CategoriaController::class, 'update']);
    Route::delete('/categorias/{id}', [CategoriaController::class, 'destroy']);

    Route::post('/veiculos', [VeiculoController::class, 'store']);
    Route::put('/veiculos/{id}', [VeiculoController::class, 'update']);
    Route::delete('/veiculos/{id}', [VeiculoController::class, 'destroy']);
});

Route::get('/categorias', [CategoriaController::class, 'index']);
Route::get('/categorias/{id}', [CategoriaController::class, 'show']);

Route::get('/veiculos', [VeiculoController::class, 'index']);
Route::get('/veiculos/{id}', [VeiculoController::class, 'show']);
Route::put('/veiculos/{id}/comprar-veiculo', [VeiculoController::class, 'comprarVeiculo']);

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
