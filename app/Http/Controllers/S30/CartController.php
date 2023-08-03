<?php

namespace App\Http\Controllers\S30;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        dd('test');
    }
    public function addToCart($id)
    {
        dd($id);
    }
}
