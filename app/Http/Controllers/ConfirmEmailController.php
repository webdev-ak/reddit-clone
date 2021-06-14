<?php

namespace App\Http\Controllers;

use App\User;

class ConfirmEmailController extends Controller
{
    
    public function index() {
        
        $user = User::where('verification_token',request()->token)->first();

        if($user) {
            
            $user->confirmEmail();

            return redirect('/?verified=true');
        }

        return redirect('/?verified=false');
    }
}
