<?php

namespace App\Notifications;

use App\Vote;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Str;

class NewVote extends Notification
{
    use Queueable;

    public $vote;
    public $entity;
    public $postPath;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Vote $vote,$entity,$postPath)
    {
        $this->vote = $vote;
        $this->entity = $entity;
        $this->postPath = $postPath;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return [CustomDbChannel::class ,'broadcast'];
    }

    
    public function toDatabase($notifiable)
    {
        return $this->getData();

    }

    public function toArray($notifiable)
    {
        return [
            'data' => $this->getData(),
            'sender' => $this->vote->owner
        ];

    }
    
    
    public function getData()
    {
        $voteableName = Str::snake(Str::substr($this->vote->voteable_type,4));

        return [
            'action' => " has ".$this->vote->type." voted  your ".$voteableName,
            'path' => $this->postPath,
            'created_at' => Carbon::now()
        ];
    }

}
