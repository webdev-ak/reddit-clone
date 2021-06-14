<?php

namespace App;

use App\Helpers\StorageHelper;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $guarded = [];

    protected $with = ['subreddit','votes'];
    
    protected $hidden = ['author'];

    protected $appends = ['imagePath','commentsCount','rank','AuthorUsername'];

    protected $dates = ['created_at','updated_at'];
    
    public function getCreatedAtAttribute($createdAt) {
        
        return Carbon::parse($createdAt);
    }

    public function getImagePathAttribute() {

        return $this->image ? StorageHelper::getImagePath('posts',$this->image->url) : null ;
    }    
    
    public function getCommentsCountAttribute() {

        return $this->allComments()->count();
    }

    public function getAuthorUsernameAttribute() {
        
        return $this->author->username;
    }

    public function getRankAttribute() {

       $ups = $this->votes()->where('type','up')->count();
       
       $downs = $this->votes()->where('type','down')->count();

       return $ups - $downs;
    }

    public function image() {

        return $this->morphOne('App\Image','imageable');
    }

    public function subreddit() {

        return $this->belongsTo('App\Subreddit');
    }

    public function author() {

        return $this->belongsTo('App\User','user_id');
    }

    public function votes() {

        return $this->morphMany('App\Vote','voteable');
    }

    public function comments() {

        return $this->hasMany('App\Comment')->whereNull('comment_id')->orderBy('created_at','asc');
    }

    // comments and their replies
    public function allComments()
    {
        return $this->hasMany('App\Comment')->orderBy('created_at','desc');
    }


}
