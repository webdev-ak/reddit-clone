<?php

namespace App;

use App\Helpers\StorageHelper;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Subreddit extends Model
{
    protected $guarded = [];

    protected $with = ['subscriptions'];

    protected $appends = ['hasDefaultImage','imagePath','membersCount','tagName'];

    const PRIVATE_SUBREDDIT = 'private';
    const PUBLIC_SUBREDDIT = 'public';
    const RESTRICTED_SUBREDDIT = 'restricted';

    public function getCreatedAtAttribute($date) {

        return Carbon::parse($date)->format('F d,Y');
    }

    public function getImagePathAttribute() {

        return $this->image 
            ?  StorageHelper::getImagePath('subreddits',$this->image->url) 
            :  config()->get('constants.images.subreddit_default_image_path');
    }

    public function getHasDefaultImageAttribute() {
        
        return !!!$this->image;
    }
    
    public function getTagNameAttribute() {

        return "r/".$this->name;
    }

    public function getMembersCountAttribute() {

        return DB::table('subscriptions')
            ->where([
                'subscribeable_type' => 'App\Subreddit',
                'subscribeable_id' => $this->id
            ])
            ->get()
            ->count();
    }

    public function getRouteKeyName() {
        
        return 'name';
    }
    
    public function getName() {
        
        return $this->name;
    }

    public function isPrivate() {

        return $this->privacy === Subreddit::PRIVATE_SUBREDDIT;
    }

    public function __unset($key) {

        unset($this->attributes[$key], $this->relations[$key]);
    }

    public function isPrivateSubredditAccessibleForActiveUser() {

        if(!auth()->check()) return false;

        return $this->isCreatedByTheActiveUser() || $this->isFollowedByTheActiveUser();
    }
    
    public function isCreatedByTheActiveUser() {

        if(!auth()->check()) return false;

        return $this->moderator->username === auth()->user()->username;
    }


    public function isFollowedByTheActiveUser() {

        return auth()->user() && auth()->user()->followedSubreddits()->pluck('id')->contains($this->id);
    }

    
    public function getElapsedTimeSinceCreation() {
        
        return Carbon::parse($this->created_at)->diffInHours();
    }
    

    public function moderator() {

        return $this->belongsTo('App\User','user_id');
    }


    public function image() {

        return $this->morphOne('App\Image','imageable');
    }

    public function posts() {

        return $this->hasMany('App\Post');
    }

    public function subscriptions() {

        return $this->morphMany('App\Subscription','subscribeable');
    }

}
