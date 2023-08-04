<?php

namespace App\Http\Controllers\S30;

use App\Http\Controllers\Controller;
use App\Models\S30\Cart;
use App\Models\S30\Product;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $user = User::findOrFail(Auth::user()->id);
        $carts = $user->Carts()->get();
        return Inertia::render('S30/Cart', [
            'carts' => $carts
        ]);
    }
    public function addToCart($id)
    {
        $user = User::findOrFail(Auth::user()->id);
        try {
            $product = Product::findOrFail($id);
            $cart = Cart::create([
                'name' => $product->name,
                'quantity' => 1,
                'price' => $product->price,
                'image' => $product->image
            ]);
            $user->Carts()->attach($cart->id);
            return back()->with('success', 'Product added to cart');
        } catch (\Throwable $th) {
            return back()->with('error', $th->getMessage());
        }
    }


    public function increment(Request $request, $id)
    {

        try {
            $cart = Cart::findorFail($id);
            $user = User::findOrFail(Auth::user()->id);
            if (!$user->Carts->contains($cart)) {
                throw new Exception("Cart ini bukan punya lu anjing!");
            }
            if ($cart->quantity < 10) {
                $cart->quantity = $request->value ? $request->value : $cart->quantity + 1;
                $cart->save();
            }

            return back();
        } catch (\Throwable $th) {
            return back()->with('error', $th->getMessage());
        }
    }
    public function decrement(Request $request, $id)
    {

        try {
            $cart = Cart::findorFail($id);
            $user = User::findOrFail(Auth::user()->id);
            if (!$user->Carts->contains($cart)) {
                throw new Exception("Cart ini bukan punya lu anjing!");
            }
            if ($cart->quantity > 1) {
                $cart->quantity = $request->value ? $request->value : $cart->quantity - 1;
                $cart->save();
            }

            return back();
        } catch (\Throwable $th) {
            return back()->with('error', $th->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $cart = Cart::findorFail($id);
            $user = User::findOrFail(Auth::user()->id);
            if (!$user->Carts->contains($cart)) {
                throw new Exception("Cart ini bukan punya lu anjing!");
            }
            $user->Carts()->detach($cart->id);
            return back()->with('success', 'Product removed from cart');
        } catch (\Throwable $th) {
            // dd($th);
            return back()->with('error', $th->getMessage());
        }
    }
}
