<?php

namespace App\Http\Controllers;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = auth()->user()->allNotifications()
                            ->with('sender')
                            ->orderBy('created_at','desc')
                            ->get();

        return response()->json([
            'notifications' => $notifications,
            'unreadNotificationsCount' => auth()->user()->unreadNotifications->count()
        ]);
    }

    public function markAsRead() {

        auth()->user()->notifications->markAsread();

        return response()->json([]);
    }
}
