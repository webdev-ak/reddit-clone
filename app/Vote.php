<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $guarded = [];

    public function getCreatedAtAttribute($date)
    {
        return Carbon::parse($date)->diffForHumans();
    }

    public function voteable()
    {
        return $this->morphTo();
    }

    public function owner()
    {
        return $this->belongsTo('App\User','user_id');
    }

}
