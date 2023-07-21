<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\s16crud\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (Auth::check()) {
        return Inertia::render('Dashboard');
    }
    return to_route('login');
});

Route::get('/test', function () {
    return Inertia::render('test');
})->middleware('web');

// S16 crud
Route::middleware('auth')->group(function () {
    Route::resources(['post' => PostController::class]);
});

Route::get('/dashboard', function (Request $request) {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

// Route fallback untuk menangani route yang tidak ada
Route::fallback(function () {
    // Gunakan Inertia::render() untuk menampilkan halaman 404 dalam mode Inertia.js
    return Inertia::render('Error404');
})->name('fallback');
