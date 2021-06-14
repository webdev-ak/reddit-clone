<template>
    <div class="auth-buttons d-flex">
        <div>
            <a class="btn btn-outline-primary" @click.prevent="openForm('login')">Log In</a>
        </div>
        <div class="ml-3"> 
            <a class="btn btn-primary" @click.prevent="openForm('register')">Sign Up</a>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            openForm(formToOpen) {
                __openAuth(formToOpen)
            }
        }
    }
</script>

<style>
    .auth-buttons a {
        font-family: Noto Sans,Arial,sans-serif;
        font-size: 13px;
        font-weight: 700;  
        padding: 6px 36px; 
    }

    @media(max-width: 1130px) {
        .auth-buttons a {
            font-size: 12px;
            font-weight: 600;  
            padding: 6px 22px; 
        }   
    }
    @media(max-width: 577px) {
        .auth-buttons a {
            padding: 6px 12px; 
        }
    }

    @media(max-width: 537px) {
        .auth-buttons a {
            display: none
        }
    }
</style>
