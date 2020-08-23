<?php

use Illuminate\Http\Request;


// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get('bookables','Api\BookableController@index');
Route::get('bookables/{id}','Api\BookableController@show');

Route::apiResource('bookables','Api\BookableController')->only(['index', 'show']);
Route::get('bookables/{bookable}/availability','Api\BookableAvailablilityController')
       ->name('bookables.avilability.show');
Route::get('bookables/{bookable}/reviews','Api\BookableReviewController')
       ->name('bookables.reviews.index');

Route::get('bookables/{bookable}/price','Api\BookablePriceController')
       ->name('bookables.price.show');

Route::get('/booking-by-review/{reviewKey}','Api\BookingByReviewController')
        ->name('booking.by-review.show');

 Route::apiResource('reviews','Api\ReviewController')->only(['show','store']);




