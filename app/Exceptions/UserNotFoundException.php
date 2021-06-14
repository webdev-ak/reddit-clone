<?php

namespace App\Exceptions;

use Exception;

class UserNotFoundException extends Exception
{
    public function report() 
    {

    }

    public function render($request)
    {
        $exceptionMessage = "Sorry, nobody on Reddit goes by that name";

        return response()->json(['message' => $exceptionMessage],404);
    }
}
