<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Post;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Post::class, function (Faker $faker) {

    $title = $faker->realText(110);
    $titleCut = $title;
    
    if (strlen($title) > 44)  {
        $titleCut = wordwrap($title, 44);
        $titleCut = substr($titleCut, 0, strpos($titleCut, "\n"));
    }

    $titleSlug = Str::slug($titleCut);

    return [
        'title' => $title,
        'slug' => $titleSlug,
        'description' => $faker->realText(600),
        'user_id' => null,
        'subreddit_id' => null
    ];
});
