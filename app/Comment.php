<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $guarded = [];

    protected $with = ['replies','votes'];

    protected $hidden = ['post','author'];

    protected $appends = ['rank','timeElapsed','AuthorUsername','postAuthorUsername'];

    public function getCreatedAtAttribute($createdAt)
    {
        return Carbon::parse($createdAt);
    }

    public function getRankAttribute()
    {
        $ups = $this->votes()->where('type','up')->count();
        $downs = $this->votes()->where('type','down')->count();

        return $ups - $downs;
    }

    public function getAuthorUsernameAttribute()
    {
        return $this->author->username;
    }

    public function getPostAuthorUsernameAttribute()
    {        
        return $this->post->author->username;
    }

    
    public function getTimeElapsedAttribute() 
    {
        return Carbon::parse($this->created_at)->diffInHours();
    }

    public static function boot() 
    {

	    parent::boot();

	    static::deleted(function($comment) {

            if($comment->replies->count() > 0) $comment->deleteReplies();
        
        });
    }

    public function deleteReplies() 
    {
        
        $this->replies->each(function($reply) {

            $comment = Comment::find($reply->id);

            if($comment) $comment->delete();

        });
    }

    public function post()
    {
        return $this->belongsTo('App\Post');
    }

    public function author()
    {
        return $this->belongsTo('App\User','user_id');
    }

    public function replies()
    {
        return $this->hasMany('App\Comment','comment_id')->whereNotNull('comment_id');
    }

    public function votes()
    {
        return $this->morphMany('App\Vote','voteable');
    }

}
