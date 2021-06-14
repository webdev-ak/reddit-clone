<?php

namespace App\Http\Controllers;

use App\Subreddit;
use Illuminate\Http\Request;

class UserSubredditController extends Controller
{

    public function __construct() {
        $this->middleware('auth');
    }
    
    public function getAuthUserFollowedSubreddits() {

        return auth()->user()->followedSubreddits();
    } 

    public function getAuthUserUnfollowedSubreddits(Request $request) {

        $query = $request->input('query');
        
        if(!$query) return collect([]);

        return Subreddit::where('name','LIKE',"$query%")
            ->get();
    }

}
