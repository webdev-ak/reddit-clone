<?php

namespace App\Http\Controllers;

use App\Exceptions\PostNotFoundException;
use App\Exceptions\SubredditNotFoundException;
use App\Subreddit;
use Hashids\Hashids;

class SubredditPostController extends Controller
{
    
    public function getSubredditPosts(Subreddit $subreddit) {
        
        $posts = $subreddit->posts->orderByMostRecent()->paginatePosts();
                        
        if($posts->count() === 0) 
            return response()->json(
                [
                    'message' => "hmm...No posts yet, be the first one to publish something",
                    'status' => 'empty'
                ],
                404
            );

        return $posts;
    }


    public function getSubredditPost($subredditName,$postIdHashed) {

        $subreddit = Subreddit::where('name', $subredditName)->first();

        if(!$subreddit) throw new SubredditNotFoundException;

        
        $postId = $this->decodePostId($postIdHashed);

        if(!$postId) throw new PostNotFoundException;

        $post = $subreddit->posts()->where('id',$postId)->first();

        if(!$post) throw new PostNotFoundException;

        
        $this->authorize('view',$post->subreddit);

        return response()->json($post);
    }

    public function decodePostId($id) {
        
        $hashids = new Hashids();

        return $hashids->decode($id) ? $hashids->decode($id)[0] : null;
    }
}
