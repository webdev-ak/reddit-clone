<?php

use App\Post;
use App\Subreddit;
use App\User;
use App\Comment;
use App\Image;
use App\Notification;
use App\Subscription;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    
    /**
     * Seed the application's database.
     *
     * @return void
     */ 
    public function run()
    {
        $USERS_COUNT = 40;
        $SUBREDDITS_COUNT = 10;

        Comment::truncate();
        Post::truncate();
        Subscription::truncate();
        Subreddit::truncate();
        User::truncate();
        Image::truncate();
        Notification::truncate();

        factory(User::class)->create(['username' => 'ibrahim']);
        
        factory(User::class,$USERS_COUNT)->create();
        foreach(User::all() as $user){
            $this->createSubscriptionsForEntity($user);
        }

        factory(Subreddit::class,$SUBREDDITS_COUNT)->create()->each(function($subreddit) {
            $this->createSubscriptionsForEntity($subreddit);
            $this->submitPostsToSubreddit($subreddit);
        });
        
        foreach(Post::all() as $post) {
            $this->createVotesFor($post);
            $this->createCommentsTreeFor($post);
        }
        
    }

    private function submitPostsToSubreddit($subreddit) {

        $numberOfPosts = rand(0,12);

        if($numberOfPosts === 0) return;

        do {
            $randomUser = User::all()->random();
        } while(! $randomUser->can('submitPosts',$subreddit));
    
        for($i = 0; $i < $numberOfPosts; $i++) {
            factory(Post::class)->create([
                'user_id' => $randomUser->id,
                'subreddit_id' => $subreddit->id
            ]);
        }
    }

    private function createCommentsTreeFor($post) {
        
        $numberOfComments = rand(0,5);

        for($i = 0; $i < $numberOfComments; $i++) {
            
            $comment = factory(Comment::class)->create(['post_id' => $post->id]);
            
            $numberOfReplies = rand(0,4);

            for($j = 0; $j < $numberOfReplies; $j++) {
                factory(Comment::class)->create(['post_id' => $post->id, 'comment_id' => $comment->id]);
            }

        }
    }
    
    private function createVotesFor($post) {
        
        $voteTypes = ['up','down'];
        
        foreach (User::all() as $user) {
    
            $makeThePostPopular = (bool) rand(1,0);
            
            $post->votes()->create([
                'user_id' => $user->id,
                'type' => $makeThePostPopular ? 'up' : $voteTypes[array_rand($voteTypes)]
            ]);
        }
    }

    private function createSubscriptionsForEntity($entity) {
        
        $followersCount = 0;

        $followersCount = rand(1,User::all()->count());

        if($entity instanceof User)  $followersCount-=1;

        for($i = 0; $i < $followersCount ; $i++) {
            
            $user = $this->getUniqueUserToSubscribeTo($entity);
            
            $entity->subscriptions()->create([
                'user_id' => $user->id
            ]);
        }
    }

    private function getUniqueUserToSubscribeTo($entity) {
        
        $entity->load('subscriptions');
        
        do {
            if($entity instanceof User) $randomUser = User::all()->except($entity->id)->random();
            else $randomUser = User::all()->random();
            
        } while($this->isUserAlreadySubscribedToEntity($randomUser,$entity));

        return $randomUser;
    }

    private function isUserAlreadySubscribedToEntity($user,$entity) {

        return $entity->subscriptions->first(function($subscription) use ($user){
            return $subscription->user_id === $user->id;
        });
    }

}
