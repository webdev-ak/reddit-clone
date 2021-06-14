<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Route;

Auth::routes();

Route::middleware('auth')->group(function() {
    Route::post('/posts/upload-image','PostController@uploadImage');
    Route::post('/posts/delete-uploaded-image','PostController@deleteUploadedImage');
    Route::delete('/posts/{post}','PostController@destroy');
    Route::get('/submit','PostController@showSubmitPostForm');
    Route::post('/r/{subreddit}/submit','PostController@submit');
    Route::get('/r/{subreddit}/submit','PostController@showSubmitPostForm');
});

Route::get('/posts/{postIdHashed}','PostController@getPost');
Route::get('/popularPosts','PostController@getPopularPosts');
Route::get('/subscriptionsPosts','PostController@getSubscriptionsPosts');
Route::get('/allPosts','PostController@getAllPosts');

Route::get('/posts/{post}/comments','CommentController@getPostComments');
Route::get('/comments/{commentIdHashed}','CommentController@getComment');
Route::post('/comments/{post}','CommentController@store');
Route::delete('/comments/{comment}','CommentController@destroy');
Route::put('/comments/{comment}','CommentController@update');

Route::post('/search/posts','SearchController@searchPosts');
Route::post('/search/posts/best','SearchController@searchBestPosts');
Route::post('/search/subredditsAndUsers/{per_page?}','SearchController@searchSubredditsAndUsers');
Route::post('/search/subreddits','SearchController@searchSubreddits');

Route::prefix('r')->group(function() {
    Route::post('/','SubredditController@store');
    Route::get('/{subreddit}/get','SubredditController@getSubreddit');
    Route::post('/{subreddit}/update-image','SubredditController@updateImage');
    Route::delete('/{subreddit}/delete-image','SubredditController@deleteImage');
    Route::get('/trending-Communities','SubredditController@getTrendingCommunities');
    Route::get('/{subreddit}/posts','SubredditPostController@getSubredditPosts'); 
    Route::get('/{subreddit}/posts/{postIdHashed}','SubredditPostController@getSubredditPost'); 
});

Route::get('/subreddits/create','SubredditController@showCreateSubredditForm')->middleware('auth');

Route::prefix('user')->group(function() {
    Route::get('/{username}/getUser','ProfileController@getUser');
    Route::get('/{user}/get-overview','ProfileController@getAllUserActivities');
    Route::get('/{user}/get-comments','ProfileController@getAllCommentedPostsBy');
    Route::get('/{user}/get-upvoted','ProfileController@getUpvotedPostsBy');
    Route::get('/{user}/get-downvoted','ProfileController@getDownvotedPostsBy');
    Route::post('/{user}/update-profile-image','ProfileController@updateImage');
    Route::get('/{user}/get-posts','ProfileController@getAllSubmittedPostsBy');
    Route::delete('/{user}/delete-profile-image','ProfileController@deleteImage');
    Route::get('/settings/account','ProfileController@showProfileSettingsPage')->middleware('auth');

    Route::get('/auth/followed-subreddits','UserSubredditController@getAuthUserFollowedSubreddits');
    Route::post('/auth/unfollowed-subreddits','UserSubredditController@getAuthUserUnfollowedSubreddits');
});

Route::post('/update-email','ProfileController@updateEmail');
Route::post('/update-password','ProfileController@updatePassword');

Route::get('/email/confirm','ConfirmEmailController@index')->name('confirm-email');

Route::post('/notifications/markAsRead' ,'NotificationController@markAsRead');
Route::get('/notifications','NotificationController@index');

Route::post('/votes/{type}','VoteController@vote');

Route::post('/subscriptions/{entityId}','SubscriptionController@toggleSubscription');

Route::get('/cloud/{directoryName}/get/{imageName}','CloudStorageController@getImage');

