<?php

namespace App;

use App\Helpers\StorageHelper;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use App\Subreddit;

class User extends Authenticatable
{
    use Notifiable;

    const ADMIN_USER = true;
    const REGULAR_USER = false;

    protected $guarded = [];

    protected $appends = ['hasDefaultImage','imagePath','tagName','allFollowingCount'];

    protected $hidden = [
        'password', 'remember_token', 'profileImage'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    public function getBirthdayAttribute($date) {
        
        return Carbon::parse($date)->format('F d,Y');
    }
    
    public function getTagNameAttribute() {
        
        return "u/".$this->username;
    }
    
    public function getImagePathAttribute() {

        return $this->profileImage 
            ?  StorageHelper::getImagePath('profiles',$this->profileImage->url) 
            :  config()->get('constants.images.profile_default_image_path');
    }

    public function getHasDefaultImageAttribute() {
        
        return !!!$this->profileImage;
    }
    
    public function confirmEmail() {
        
        $this->verification_token = null;
        $this->email_verified_at = Carbon::now();
        $this->save();
    }
    
    public function isEmailConfirmed() {
        
        return $this->verification_token == null;
    }

    public function getRouteKeyName() {

        return 'username';
    }

    public function toggleVote($entity,$newVoteType) {

        $vote = $entity->votes()->where('user_id',$this->id)->first();

        if($vote) {
            
            if($newVoteType == 'up' && $vote->type == 'up' || $newVoteType == 'down' && $vote->type == 'down') {
                
                $voteToBeDeleted = $vote;
                
                $vote->delete();
                
                $voteToBeDeleted->isDeleted = true;
             
                return $voteToBeDeleted;
            }
            
            $vote->update([
                'type' => $newVoteType
            ]);

            return $vote->refresh();
        }
        
        $vote = $entity->votes()->create([
            'user_id' => $this->id,
            'type' => $newVoteType
        ]);

        return $vote;
    }

    public function allNotifications() {

        return $this->morphMany('App\Notification','notifiable');
    }    

    public function getName() {

        return $this->username;
    }

    public function profileImage() {

        return $this->morphOne('App\Image','imageable');
    }

    public function subreddits() {

        return $this->hasMany('App\Subreddit');
    }

    public function posts() {

        return $this->hasMany('App\Post');
    }

    public function comments() {

        return $this->hasMany('App\Comment');
    }

    public function subscriptions() {

        return $this->morphMany('App\Subscription','subscribeable');
    }

    public function votes() {

        return $this->hasMany('App\Vote','user_id');
    }

    public function subscriptionsPosts() {

        return $this->followedProfilesPosts()
                    ->merge($this->followedSubredditsPosts())
                    ->unique()
                    ->values();
    }

    public function followedSubredditsPosts() {

        return $this->followedSubreddits()
                ->map(function($subreddit){
                    return $subreddit->posts;
                })->collapse();
    }

    public function followedProfilesPosts() {

        return $this->followedProfiles()
                ->map(function($user){
                    return $user->posts->filterPrivatePosts();
                })->collapse();
        
    }

    public function getAllFollowingCountAttribute() {

        return $this->followedProfiles()->count() + $this->followedSubreddits()->count();
    }

    public function followedProfiles() {

        return DB::table('subscriptions')
            ->where([
                'subscribeable_type' => 'App\User',
                'user_id' => $this->id
            ])
            ->pluck('subscribeable_id')
            ->map(function ($id){
                return User::find($id);
            });
    }

    public function followedSubreddits() {

        return DB::table('subscriptions')
            ->where([
                'subscribeable_type'=> 'App\Subreddit',
                'user_id' => $this->id
            ])
            ->pluck('subscribeable_id')
            ->map(function ($id){
                return Subreddit::find($id);
            });
    }

    public function unfollowedSubreddits() {

        $followedSubreddits = $this->followedSubreddits();

        $allSubreddits = Subreddit::get();
            
        $unfollowedSubreddits = ($allSubreddits)->diff($followedSubreddits);
               
        return $unfollowedSubreddits;
    }

}
