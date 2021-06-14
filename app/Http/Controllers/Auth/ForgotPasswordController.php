<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;


class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }
    
    public function sendResetLinkEmail(Request $request)
    {
        $this->validateEmail($request);

        $this->broker()->sendResetLink(
            $this->credentials($request)
        );

        return response()->json([
            'message' => "Thanks ! If your reddit username and email address match, you'll get an email with a link to reset your password shortly."
        ]);

    }

    protected function validateEmail(Request $request)
    {
        $request->validate(
            [
                'email' => 'required|email',
                'username' => 'required'
            ]
        ); 
    }

    protected function credentials(Request $request)
    {
        return $request->only(['username','email']);
    }

}
