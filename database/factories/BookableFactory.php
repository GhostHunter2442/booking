<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Bookable;
use Faker\Generator as Faker;
use Illuminate\Support\Arr;

$suffix = [
    'Villa',
    'House',
    'Cottage',
    'Luxury Villas',
    'Cheap House',
    'Rooms',
    'Cheap Rooms',
    'Luxury Rooms',
    'Fancy Rooms'
];
$suffix_picture = [
    'img_1.jpg',
    'img_2.jpg',
    'img_3.jpg',
    'img_4.jpg',
];

$factory->define(Bookable::class, function (Faker $faker) use ($suffix,$suffix_picture) {
    return [
        'title'=> $faker->city . ' ' . Arr::random($suffix),
        'description'=> $faker->text(),
        'price'=>random_int(350,5000),
        'main_picture'=> Arr::random($suffix_picture),
    ];
});
