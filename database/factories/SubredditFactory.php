<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Subreddit;
use App\User;
use Faker\Generator as Faker;

$factory->define(Subreddit::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence(4),
        'name' => $faker->unique()->word,
        'description' => $faker->sentence(40),
        'privacy' => $faker->randomElement([Subreddit::PUBLIC_SUBREDDIT,Subreddit::RESTRICTED_SUBREDDIT,Subreddit::PRIVATE_SUBREDDIT]),
        'user_id' => User::all()->random()->id
    ];
});
