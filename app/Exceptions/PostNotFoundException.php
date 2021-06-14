<?php

namespace App\Exceptions;

use Exception;

class PostNotFoundException extends Exception
{
    public function report() 
    {

    }

   
    public function render($request)
    {
        $exceptionMessage = "Sorry, we couldn't find any post";

        return response()->json(
            [
                'entity' => 'post',
                'message' => $exceptionMessage
            ],
            404
        );

    }
}
