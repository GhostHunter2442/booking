<?php

namespace App\Http\Controllers\Api;

use App\Bookable;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BookableAvailablilityController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke($id,Request $request)
    {
        $data = $request->validate([
            'from' => 'required|date_format:Y-m-d|after_or_equal:now',
            'to' => 'required|date_format:Y-m-d|after_or_equal:from'
        ],[
            'from.required' => 'กรุณาเลือกวันเริ่ม',
            'from.date_format' => 'รูปเเบบวันที่ไม่ถูกต้อง',
            'from.after_or_equal' => 'เลือกวันนี้หรือหลังจากวันนี้',
            'to.required' => 'กรุณาเลือกวันสิ้นสุด',
            'to.date_format' => 'รูปเเบบวันที่ไม่ถูกต้อง',
            'to.after_or_equal' => 'เลือกวันที่หลังจากวันเริ่มต้น'
        ]);

        $bookable=Bookable::findOrFail($id);
        return $bookable->availableFor($data['from'],$data['to'])
               ? response()->json([])
               : response()->json([],404);
    }
}
