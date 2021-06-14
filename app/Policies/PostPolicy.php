<?php

namespace App\Policies;

use App\Subreddit;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PostPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct() {}

    public function submitPosts(User $user,Subreddit $subreddit)
    {
        if($subreddit->privacy == Subreddit::PUBLIC_SUBREDDIT) return true;

        return $user->followingSubreddits()->pluck('id')->contains($subreddit->id);
    }
    
}
