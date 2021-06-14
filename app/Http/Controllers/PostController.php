<?php

namespace App\Http\Controllers;

use App\Http\Requests\posts\DeleteUploadedPostImageRequest;
use App\Http\Requests\posts\UploadPostImageRequest;
use App\Http\Requests\posts\DeletePostRequest;
use App\Http\Requests\posts\SubmitPostRequest;
use App\Post;
use App\Subreddit;
use Illuminate\Support\Str;

class PostController extends Controller
{

    public function showSubmitPostForm() {

        return view('vue.index');
    }

    public function submit(SubmitPostRequest $request, Subreddit $subreddit) {
    
        $title_max_length = 44;
        
        $title = $request->title;

        if (strlen($title) > $title_max_length)  {
            $title = wordwrap($title, $title_max_length);
            $title = substr($title, 0, strpos($title, "\n"));
        }

        $titleSlug = Str::slug($title);     
    
        $postData = array_merge
            (
                $request->only(['title','description']),
                [
                    'slug' => $titleSlug, 
                    'user_id' => auth()->id()
                ]
            );

        $post = $subreddit->posts()->create($postData);

        if($request->has('imageURL')){
            $post->image()->create(['url' => $request->imageURL]);
        }

        return response()->json([]);
    }

    public function destroy(DeletePostRequest $request, Post $post) {

        $post->allComments()->delete();

        $post->votes()->delete();

        if($post->image) $request->deletePostImage($post);

        $post->delete();
        
        return response()->json([]);
    }

    public function getPopularPosts() {
        
        $posts = Post::all()
                ->filterPrivatePosts()
                ->sortByDesc(function($post){
                    return (($post->rank * 3) + $post->allComments()->count());
                })
                ->values()
                ->take(25)
                ->orderByMostRecent()
                ->paginatePosts();  
                        
        if($posts->count() === 0) 
            return response()->json(
                [
                    'message' => "hmm...Sorry but we couldn't find any popular posts",
                    'status' => 'empty'
                ],
                404
            );


        return $posts;
    }

    public function getAllPosts() {

        $posts = Post::all()
                ->filterPrivatePosts()
                ->orderByMostRecent()
                ->paginatePosts();                

        if($posts->count() === 0) 
            return response()->json([
                'message' => "hmm...Sorry but we couldn't find any posts",
                'status' => 'empty'
            ],404);

        return $posts;
    }

    public function getSubscriptionsPosts() {


        if(auth()->user()->allFollowingCount === 0) 
            return response()->json(
                [
                    'message' => "Reddit gets better when you join communities, so find some that you’ll love!",
                    'status' => 'no subscriptions found'
                ],
                404
            );

        $posts = auth()->user()->subscriptionsPosts()->orderByMostRecent()->paginatePosts();
        
        if($posts->count() === 0) 
            return response()->json(
                [
                    'message' => "hmm...looks like none of your subscriptions have posted something yet",
                    'status' => 'empty'
                ],
                404
            );

        return $posts;
    }

    public function uploadImage(UploadPostImageRequest $request)   {
        
        $imageURL = $request->uploadPostImage();

        return response()->json(['imageURL' => $imageURL]);
    }
    
    public function deleteUploadedImage(DeleteUploadedPostImageRequest $request) {

        $request->deletePostUploadedImage();

        return response()->json([]);
    }

}
