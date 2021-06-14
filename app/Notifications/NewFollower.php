<?php

namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewFollower extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct() {}   

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return [CustomDbChannel::class,'broadcast'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'data' => $this->getData(),
            'sender' => auth()->user()
        ];
    }

    public function toDatabase($notifiable) 
    {
        return $this->getData();
    }

    public function getData()
    {
        
        return [
            "action" => 'has started following you',
            "path" => '/user/'.auth()->user()->username,
            "created_at" => Carbon::now()
        ];
    }
}
