<?php

namespace App\Exceptions;

use Exception;

class SubredditIsPrivateException extends Exception
{
    public function report()
    {

    }

    public function render($request)
    {
        $exceptionMessage = 'This community is private, you must be invited if you wanna visit it or view its posts';
        
        return response()->json(['message' => $exceptionMessage],403);
    }
}
