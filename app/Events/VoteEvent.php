<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;

class VoteEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets;


    public $vote;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($vote)
    {
        $this->vote = $vote;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    
    public function broadcastOn()
    {
        return new Channel('vote-channel');
    }
}
