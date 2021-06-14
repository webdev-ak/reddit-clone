<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    @yield('css')
</head>
<body>
    <div id="app">
        <header>
            <app-navbar></app-navbar>
        </header>
        
        <auth-modal></auth-modal>
        
        <vue-editor class="d-none"></vue-editor>
        
        @yield('content')

        <notifications group="app" classes="appNotifications" width="450" position="bottom center" />
    </div>
    <script>
        
        window.AuthUser = '{!! auth()->user() !!}'

        window.__auth = () => {
            try {
                return JSON.parse(AuthUser)
            }
            catch (e) {
                return null
            }
        };

    </script>
    <script src="{{ asset('js/app.js') }}"></script>
    @yield('js')
</body>
</html>


<style>
    #app {
        height: 100%;
    }

    header {
        flex: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 80;
        margin-top: 0;
        background-color: #fff
        
    }

    header, nav, .left-nav-items, .home-link, .right-nav-items, .right-nav-items .items{
        display: inline-flex;
    }
    
    nav {
        box-sizing: border-box;
        flex-grow: 1;
        border-bottom: 1px solid #edeff1; 
        padding: 3px 20px;
        height: 48px;
    }

    body,html {
        height: 100%;
        margin: 0;
    }

    body{
        padding-top: 38px;
        background-color: #DAE0E6;
    }
    
    /* mozila */
    .comment-manager .quillWrapper {
        display: flex;
        flex-direction: column; 
    }
   
    .comments-section .comment-node .ql-editor {
        overflow-wrap: anywhere;
        font-size: 16px;
    }

    .posts .ql-editor * {
        cursor: pointer;
    }

    .ql-editor {
        font-family: 'IBM Plex Sans';
    }

    .commentContent .ql-editor, .postDescription .ql-editor {
        min-height: 0%;
        height: auto;
        padding: 0px;
        font-size: 16px;
        font-weight: 500;
    }

    
    .comments-section p {
        margin-bottom: 0;
    }

    p {
        margin-bottom: 9px;
    }


    a.dark-link {
        font-size: 14px;
        font-weight: 700;
        color: #1c1c1c;
        cursor: pointer;
    }
    
    a.dark-link:hover {
        color: #343a40 ;
    }

    .title {
        font-size: 18px;
        font-weight: bold;
        line-height: 22px;
    }
</style>