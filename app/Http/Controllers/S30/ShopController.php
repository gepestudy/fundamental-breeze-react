<?php

namespace App\Http\Controllers\S30;

use App\Http\Controllers\Controller;
use App\Models\S30\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return Inertia::render('S30/Shop', [
            'products' => $products
        ]);
    }
}
