<?php

namespace App;

use Illuminate\Notifications\DatabaseNotification;

class Notification extends DatabaseNotification
{
    
    public function sender() {
        
        return $this->belongsTo('App\User','notifier_id');
    }
}
