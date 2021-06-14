<?php

namespace App\Http\Controllers;

use App\Exceptions\UserNotFoundException;
use App\Http\Requests\profiles\DeleteProfileImageRequest;
use App\Http\Requests\profiles\UpdateProfileImageRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Str;

class ProfileController extends Controller
{

    public function getUser($username) {

        $user = User::with('subscriptions')->where('username',$username)->first();

        if(!$user) throw new UserNotFoundException;
        
        return response()->json($user);
    }

    public function getAllUserActivities(User $user) {

        $submittedPosts = $this->getAllSubmittedPostsBy($user,false,false);

        $submittedPostsWithUserComments = $submittedPosts->map(function($post) use ($user) {

            $post['userComments'] = $post->allComments()->where('user_id',$user->id)->get();

            return $post;
        });

        $commentedOnPosts = $this->getAllCommentedPostsBy($user,false,false);

        $posts = $submittedPostsWithUserComments
                    ->merge($commentedOnPosts)
                    ->unique('id')
                    ->values()
                    ->sortByDesc(function ($activity) {
                        if($activity->userComments->count() > 0) return $activity->userComments->first()->created_at;
                        return $activity->created_at;
                    })->values()
                    ->paginatePosts();
        
        if($posts->count() === 0) {
            return response()->json([
                "message" => "hmm....u/".$user->username." has no activity yet"
            ],404);
        }            
        
        return response()->json($posts);
    }

    public function getAllSubmittedPostsBy(User $user, $withPagination = true, $withResponseMessage = true) {

        $submittedPosts = $user->posts
                ->filterPrivatePosts()
                ->orderByMostRecent();

        $submittedPosts = $withPagination ? $submittedPosts->paginatePosts() : $submittedPosts;

        if($submittedPosts->count() === 0 && $withResponseMessage) {
            return response()->json([
                "message" => "hmm....u/".$user->username." hasn't posted anything yet"
            ],404);
        }

        return $submittedPosts;
    }

    public function getAllCommentedPostsBy(User $user, $withPagination = true, $withResponseMessage = true) {
        
        $allCommentedOnPosts = $user->comments->map(function ($comment) use($user) {

            $post = $comment->post;

            $post['userComments'] = $post->allComments()->where('user_id',$user->id)->get();

            return $post;
        })
            ->unique()
            ->values()
            ->filterPrivatePosts()
            ->sortByDesc(function ($post) {
                return $post->userComments->first()->created_at;
            })->values();

            
        $allCommentedOnPosts = $withPagination ? $allCommentedOnPosts->paginatePosts() : $allCommentedOnPosts;

        if($allCommentedOnPosts->count() === 0 && $withResponseMessage) {
            return response()->json([
                "message" => "hmm....u/".$user->username." hasn't commented on anything yet"
            ],404);
        }

        return $allCommentedOnPosts;

    }

    public function getUpvotedPostsBy(User $user) {
        
        $upvoted = $this->getVotedPostsBy($user,'up');

        if($upvoted->count() === 0) {
            return response()->json([
                "message" => "hmm....u/".$user->username." hasn't upvoted any post yet"
            ],404);
        }

        return $upvoted;
    }

    public function getDownvotedPostsBy(User $user) {
        
        $downvoted = $this->getVotedPostsBy($user,'down');

        if($downvoted->count() === 0) {
            return response()->json([
                "message" => "hmm....u/".$user->username." hasn't downvoted any post yet"
            ],404);
        }

        return $downvoted;
    }

    public function getVotedPostsBy(User $user, $voteType) {
        
        $upvoted = $user->votes()->where([
            'type' => $voteType,
            'voteable_type' => 'App\Post'
        ])
        ->get()
        ->orderByMostRecent()
        ->map(function($vote) {
            return $vote->voteable;
        })
        ->filterPrivatePosts()
        ->paginatePosts();

        return $upvoted;
    }

    public function updateImage(UpdateProfileImageRequest $request, User $user) {

        $request->updateProfileImage($user);

        $path = $user->refresh()->imagePath;

        return response()->json(['imagePath' => $path]);

    }

    public function deleteImage(DeleteProfileImageRequest $request, User $user) {

        $request->deleteProfileImage($user);

        $path = $user->refresh()->imagePath;

        return response()->json(['imagePath' => $path]);

    }

    public function showProfileSettingsPage() {
        
        return view('vue.index');
    }    
    
    public function updateEmail(Request $request) {

        $request->validate([
            'password' => 'required|string|password',
            'email' => 'required|email|unique:users'
        ]);

        $user = auth()->user();

        $user->email = $request->input('email');
        $user->verification_token = Str::random(23);
        $user->email_verified_at = null;

        $user->save();
        
        return response()->json(['status' => 'ok']);
    }

    public function updatePassword(Request $request) {

        $request->validate([
            'oldPassword' => 'required|string|password',
            'newPassword' => [
                'required','string','same:newPasswordConfirmation',
                'different:oldPassword','min:'.Config::get('constants.validation_rules.users_password_min_length')
            ],
            'newPasswordConfirmation' => 'required'
        ]);

        $user = auth()->user();

        $user->password = bcrypt($request->get('newPassword'));
        $user->save();

        return response()->json(['status' => 'ok']);

    }
}
