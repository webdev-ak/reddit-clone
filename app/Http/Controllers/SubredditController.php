<?php

namespace App\Http\Controllers;

use App\Exceptions\SubredditNotFoundException;
use App\Http\Requests\subreddits\CreateSubredditRequest;
use App\Http\Requests\subreddits\DeleteSubredditImageRequest;
use App\Http\Requests\subreddits\UpdateSubredditImageRequest;
use App\Subreddit;

class SubredditController extends Controller
{
    public function showCreateSubredditForm() {

        return view('vue.index');
    }

    public function store(CreateSubredditRequest $request) {
        
        $subreddit = auth()->user()->subreddits()->create($request->all());
        
        $subreddit->subscriptions()->create([
            'user_id' => auth()->id()
        ]);
        
        return response()->json(['subredditPath' => "/r/$subreddit->name"]);
    }

    public function getTrendingCommunities() {
        
        $topCommunities = Subreddit::all()
                ->sortByDesc(function($subreddit) {
                    return $subreddit->membersCount / $subreddit->getElapsedTimeSinceCreation();
                })
                ->values()
                ->filter(function($subreddit) {
                    if($subreddit->isPrivate()) return $subreddit->isPrivateSubredditAccessibleForActiveUser();
                    else return true;
                })
                ->take(3);


        return response()->json($topCommunities);        
    }

    public function updateImage(UpdateSubredditImageRequest $request, Subreddit $subreddit) {
        
        $request->updateSubredditImage($subreddit);

        $path = $subreddit->refresh()->imagePath;

        return response()->json(['imagePath' => $path]);

    }

    public function deleteImage(DeleteSubredditImageRequest $request, Subreddit $subreddit) {

        $request->deleteSubredditImage($subreddit);

        $newImagePath = $subreddit->refresh()->imagePath;

        return response()->json(['imagePath' => $newImagePath]);

    }

    public function getSubreddit($subredditName) {

        $subreddit = Subreddit::with('moderator')->where('name', $subredditName)->first();

        if(!$subreddit) throw new SubredditNotFoundException;

        $this->authorize('view',$subreddit);
    
        return response()->json($subreddit);

    }
}
