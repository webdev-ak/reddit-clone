<?php

namespace App\Http\Controllers;

use App\Subscription;
use App\Subreddit;
use App\User;
use App\Notifications\NewFollower;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class SubscriptionController extends Controller
{

    public function __construct() {

        $this->middleware('auth');
    }

    public function toggleSubscription($entityId) {

        $entity = $this->getEntity($entityId);

        $subscription = $this->getUserSubscriptionToEntity(auth()->user(),$entity);
        
        if($subscription) {
            
            $toBeDeletedSubscription = $subscription->toJson();

            $subscription->delete();

            return $toBeDeletedSubscription;
        }
        
        $subscription = $entity->subscriptions()->create([
            'user_id' => auth()->id()
        ]);
            
        if($entity instanceof User) $entity->notify(new NewFollower);

        return response()->json($subscription);
    }

    public function destroy(Subscription $subscription) {

        $subscription->delete();

        return response()->json([]);
    }

    public function getEntity($entityId) {
        
        $subreddit = Subreddit::where('name',$entityId)->first();

        if($subreddit) return $subreddit;

        $user = User::where('id',$entityId)->first();

        if($user) return $user;

        throw new ModelNotFoundException();
    }

    private function getUserSubscriptionToEntity($user,$entity) {

        $subscription = null; 
        
        $subscription = $entity->subscriptions->first(function($subscription) use ($user){
            return $subscription->user_id === $user->id;
        });

        if($subscription) return Subscription::find($subscription->id);

        return $subscription;
    }
}
