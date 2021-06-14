@extends('layouts.app-without-nav')

@section('content')
    <reset-password initial-email="{{ $email }}" token="{{ $token }}"></reset-password>
@endsection
