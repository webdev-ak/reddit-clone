<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Comment;
use App\Post;
use App\User;
use Faker\Generator as Faker;

$factory->define(Comment::class, function (Faker $faker) {

    $randomPost = Post::all()->random();

    return [
        'content' => $faker->realText,
        'user_id' => User::all()->random()->id,
        'post_id' => $randomPost->id,
        'comment_id' => null
    ];
});
