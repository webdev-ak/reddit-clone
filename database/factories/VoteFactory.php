<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use App\Vote;
use Faker\Generator as Faker;

$factory->define(Vote::class, function (Faker $faker) {
    return [
        'user_id' => User::all()->random()->id,
        'voteable_id' => null,
        'voteable_type' => null,
        'type' => $faker->randomElement(['up','down'])
    ];
});
