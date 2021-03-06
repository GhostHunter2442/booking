<?php

namespace App\Http\Controllers\Api;

use App\Bookable;
use App\Booking;
use App\Address;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{

    public function __invoke(Request $request)
    {
       $data = $request->validate([
            'bookings'=> 'required|array|min:1',
            'bookings.*.bookable_id' =>'required|exists:bookables,id',
            'bookings.*.from' =>'required|date|after_or_equal:today',
            'bookings.*.to' =>'required|date|after_or_equal:bookings.*.from',
           'customer.first_name'=> 'required|min:2',
           'customer.last_name'=> 'required|min:2',
           'customer.street'=> 'required|min:3',
           'customer.email'=> 'required|email',
           'customer.country'=> 'required|min:2',
           'customer.city'=> 'required|min:2',
           'customer.state'=> 'required|min:2',
           'customer.zip'=> 'required|min:2'
       ]);


       $data = array_merge($data,$request->validate([
               'bookings.*' => ['required',function ($attribute,$value,$fail){
                //  dd($attribute,$value);
                $bookable = Bookable::findOrFail($value['bookable_id']);

                if(!$bookable->availableFor($value['from'],$value['to'])){
                    $fail("ห้องไม่พร้อมใช้งาน");
                }
             }],
       ]));

       $bookingData = $data['bookings'];
       $addressData = $data['customer'];

       $bookings = collect($bookingData)->map(function($bookingData) use($addressData){
           $bookable = Bookable::findOrFail($bookingData['bookable_id']);

            $booking = new Booking();
            $booking->from= $bookingData['from'];
            $booking->to= $bookingData['to'];
            $booking->price= $bookable->pricefor($booking->from, $booking->to)['total'];
            // $booking->bookable_id= $bookingData['bookable_id']; OR
            $booking->bookable()->associate($bookable);


            $booking->address()->associate(Address::create($addressData));

            $booking->save();

            return $booking;
       });

       return $bookings;
    }
}
