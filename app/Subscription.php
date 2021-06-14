<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $guarded = [];

    protected $appends = ['subscribeableName'];

    public function subscribeable()
    {
        return $this->morphTo();
    }

    public function getSubscribeableNameAttribute()
    {
        $subscription = Subscription::find($this->id);

        return $subscription ? $subscription->subscribeable->getName() : '';

    }
}
