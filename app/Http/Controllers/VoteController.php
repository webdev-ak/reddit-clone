<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Post;
use App\Events\VoteEvent;
use App\Notifications\NewVote;
use Illuminate\Broadcasting\BroadcastException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class VoteController extends Controller
{
    public function vote($type) {

        $entity = $this->findEntity();

        $vote =  auth()->user()->toggleVote($entity,$type);

        try {
            broadcast(new VoteEvent($vote))->toOthers(); 
            
            /*
                check if user has really up/down voted a entity or they've just deleted their last vote
                AND ALSO check if user hasn't up/down voted his own entity (the voteable element)
            */
            if(!$vote->isDeleted && $vote->voteable->user_id !== auth()->id()) {
                $this->sendInstantVoteNotification($entity,$vote);
            }

        } catch(BroadcastException $exception) {
            return $vote;
        }   

        return $vote;
    }

    public function sendInstantVoteNotification($entity,$vote) {

        $postPath = request()->input('entityInfo')['path'];

        $entity->author->notify(new NewVote($vote,$entity,$postPath));
    }

    public function findEntity() {

        $entityInfo = request()->input('entityInfo');

        if($entityInfo['type'] === 'Post') return Post::find($entityInfo['id']);

        else if($entityInfo['type'] === 'Comment') return  Comment::find($entityInfo['id']);

        else throw new ModelNotFoundException();
    }
}
