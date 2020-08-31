<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Bookable;
use Illuminate\Http\Request;
use App\Http\Resources\BookableIndexResource;
use App\Http\Resources\BookableShowResource;

class BookableController extends Controller
{
    public function index(){
        return BookableIndexResource::collection(
               Bookable::latest()->paginate(12)
        );
    }
    public function show($id){
        return new BookableShowResource(Bookable::findOrFail($id));
    }
}
