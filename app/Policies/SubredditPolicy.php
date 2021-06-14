<?php

namespace App\Policies;

use App\Subreddit;
use App\User;
use App\Exceptions\SubredditIsPrivateException;
use Illuminate\Auth\Access\HandlesAuthorization;

class SubredditPolicy
{
    use HandlesAuthorization;

    public function before($user,$ability,$subreddit) {

        if(! ($subreddit instanceof Subreddit) ) $subreddit = Subreddit::where('name',$subreddit)->first();

        return $this->isModerator($user,$subreddit) ? true : null;
    }

    public function submitPosts(User $user,Subreddit $subreddit) {

        if($subreddit->privacy === Subreddit::PUBLIC_SUBREDDIT) return true;

        return $subreddit->isFollowedByTheActiveUser();
    }

    public function updateImage(User $user,Subreddit $subreddit) {

        return $this->isModerator($user,$subreddit);
    }

    public function isModerator(User $user,Subreddit $subreddit) {

        return $subreddit->moderator->username === $user->username;
    }

    public function view(User $user = null, Subreddit $subreddit) {

        if($subreddit->isPrivate() && !$subreddit->isFollowedByTheActiveUser()) throw new SubredditIsPrivateException;

        return true;
    }

}
