<?php

namespace App\Exceptions;

use Exception;

class SubredditNotFoundException extends Exception
{
    public function report()
    {
    }

  
    public function render($request)
    {
        $exceptionMessage = "Sorry, there aren't any communities on Reddit with that name";
            
        return response()->json
        (
            [
                'entity' => 'subreddit',
                'message' => $exceptionMessage
            ]
            ,404
        );
    }
}
