<?php

namespace App\Observers;

use App\Jobs\SendMail;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostObserver
{
    /**
     * Handle the Post "created" event.
     */
    public function created(Post $post): void
    {
        try {
            SendMail::dispatch(Auth::user(), $post, 'post.created');
        } catch (\Throwable $e) {
            // Catat pesan kesalahan ke log atau print pesan kesalahan.
            dd($e);
        }
    }

    /**
     * Handle the Post "updated" event.
     */
    public function updated(Post $post): void
    {
        //
    }

    /**
     * Handle the Post "deleted" event.
     */
    public function deleted(Post $post): void
    {
        //
    }

    /**
     * Handle the Post "restored" event.
     */
    public function restored(Post $post): void
    {
        //
    }

    /**
     * Handle the Post "force deleted" event.
     */
    public function forceDeleted(Post $post): void
    {
        //
    }
}
