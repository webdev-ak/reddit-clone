<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {

    return [
        'username' => $faker->unique()->firstName,
        'email' => $faker->unique()->safeEmail,
        'birthdate' => $faker->dateTimeBetween('-30 years','now'),
        'verification_token' => Str::random(25),
        'is_admin' => false,
        'email_verified_at' => null,
        'password' => bcrypt('secret'),
        'remember_token' => Str::random(10),
    ];
});







