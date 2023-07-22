<?php

namespace App\Http\Controllers\s16crud;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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
        $request->validate([
            'title' => ['required', 'max:200', 'min:1'],
            'description' => ['required', 'min:10'],
            'image' => ['required', 'image', 'mimes:png,jpg,jpeg', 'max:5120'],
            'category' => ['required', 'string']
        ]);

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
        try {
            $post = Post::with('category')->findOrFail($id);
            return Inertia::render('16crud/ShowPost', [
                'post' => $post,
            ]);
        } catch (ModelNotFoundException $error) {
            return Inertia::render('16crud/ShowPost', [
                'post' => null,
                'error' => $error,
                'message' => 'Post tidak ditemukan',
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try {
            $post = Post::with('category')->findOrFail($id);
        } catch (ModelNotFoundException $th) {
            return Inertia::render('Error404');
        }
        $categories = Category::all()->pluck('name');
        return Inertia::render('16crud/EditPost', [
            'post' => $post,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => ['required', 'max:200', 'min:1'],
            'description' => ['required', 'min:10'],
            'image' => ['nullable', 'image', 'mimes:png,jpg,jpeg', 'max:5120'],
            'category' => ['required', 'string']
        ]);

        // bikin category jika baru, jika lama temukan
        $category =  Category::firstOrCreate(['name' => $request->category]);
        $post = Post::with('category')->findOrFail($id);
        $post->title = $request->get('title');
        $post->description = $request->get('description');
        $post->category_id = $category->id;

        // // image handler
        if ($request->hasFile('image')) {
            // hapus file nya dulu
            $fileUrl = $post->image;
            $filenameOld = basename($fileUrl);
            Storage::delete('/images/postImage/' . $filenameOld);

            // baru kita ganti
            $file = $request->file('image');
            $filename = str_replace(' ', '_', $file->getClientOriginalName());
            $file->storeAs('/images/postImage',  $post->id . '_' . $filename);
            $post->image = Storage::url('/images/postImage/' . $post->id . '_' . $filename);
        }
        $post->save();


        return Inertia::render('16crud/ShowPost', [
            'post' => $post,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
