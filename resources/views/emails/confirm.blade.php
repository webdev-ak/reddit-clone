@component('mail::message')
# Confirm Your Email

Hello {{ $user->username }}

{{ $message }}

@component('mail::button', ['url' => route('confirm-email').'?token='.$user->verification_token])
Confirm Email
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
