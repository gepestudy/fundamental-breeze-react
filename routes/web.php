<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\s16crud\PostController;
use App\Jobs\SendMail;
use App\Mail\PostPublished;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
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

// 24 Queue
Route::get('/send-mail', function () {
    // step
    // 1. bikin mail
    // 2. bikin Queue
    // 3. paggil job nya / queue nya, disini dengan SendMail::dispatch() karna jobnya send mail
    // 4. jangan lupa jalankan job nya dengan php artisan queue:work, kalau tidak itu hanya akan di simpan di DB dan tidak di eksekusi
    SendMail::dispatch();
    dd('Mail has been sent');
});

Route::get('/test', function () {
    return Inertia::render('test');
})->middleware('web');

// S16 crud
Route::middleware('auth')->group(function () {
    Route::get('/post/trashed/{id}/restore', [PostController::class, 'restorePost'])->name('post.trashed');
    Route::delete('/post/trashed/{id}/forceDelete', [PostController::class, 'forceDelete'])->name('post.forceDelete');
    Route::get('/post/trashed/{id}', [PostController::class, 'showTrashed'])->name('show.trashed');
    Route::get('/post/trashed', [PostController::class, 'trashedPost'])->name('post.trashed');
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

Route::get('/clear-flash-session', function () {
    session()->forget('message');
    session()->forget('error');
    session()->forget('success');
    session()->forget('flash');
    return Response(['message' => "memek"], 200);
})->name('clear-flash-session');

require __DIR__ . '/auth.php';

// Route fallback untuk menangani route yang tidak ada
Route::fallback(function () {
    // Gunakan Inertia::render() untuk menampilkan halaman 404 dalam mode Inertia.js
    return Inertia::render('Error404');
})->name('fallback');
