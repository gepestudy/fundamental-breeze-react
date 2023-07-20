<?php

namespace App\Http\Controllers\s16crud;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('category')->get();
        return Inertia::render('16crud/Posts', [
            'posts' => $posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all()->pluck('name');
        return Inertia::render('16crud/CreatePost', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $request->validate([
        //     'title' => ['required', 'max:200', 'min:1'],
        //     'description' => ['required', 'min:10'],
        //     'image' => ['required', 'image', 'mimes:png,jpg,jpeg', 'max:5120'],
        //     'category' => ['required', 'string']
        // ]);

        // bikin category jika baru, jika lama temukan
        $category =  Category::firstOrCreate(['name' => $request->category]);
        $post = Post::create([
            'title' => $request->get('title'),
            'description' => $request->get('description'),
            'category_id' => $category->id,
            // kita isi memek dulu, baru kita replace dengan gamabr yg sebenarnya
            'image' => 'memek',
        ]);
        // image handler
        $uploadedFile = $request->file('image');
        $filename = str_replace(' ', '_', $uploadedFile->getClientOriginalName());
        $uploadedFile->storeAs('images/postImage/', $post->id . '_' .  $filename);

        $imageUrl = Storage::url('/images/postImage/' . $post->id . '_' . $filename);
        $post->image = $imageUrl;
        $post->save();

        $postWithCategory = Post::with('category')->find($post->id);
        return Redirect::route('post.show', $postWithCategory->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        dd($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
