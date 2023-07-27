<?php

namespace App\Jobs;

use App\Mail\PostPublished;
use App\Models\Post;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class SendMail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    // protected $post;
    /**
     * Create a new job instance.
     */
    public function __construct(public User $user, public Post $post, public string $subject)
    {
        // $this->post = $post;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            Mail::send(new PostPublished($this->user, $this->post, $this->subject));
        } catch (\Throwable $th) {
            dd('error', $th);
        }
    }
}
