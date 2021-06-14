<template>
    <div class="authForms">
        <register
            v-if="currentForm === 'register'"
            @switchAuthForm="(event) => switchAuthForm(event)"
        >
        </register>    

        <login 
            v-if="currentForm === 'login'"
            @switchAuthForm="(event) => switchAuthForm(event)"
        >
        </login>

        <forgot-password
            v-if="currentForm === 'forgot-password'"
            @switchAuthForm="(event) => switchAuthForm(event)"
        >
        </forgot-password>   
    </div>
</template>

<script>
    import Login from './login'
    import Register from './register'
    import ForgotPassword from './forgot-password'

    export default {
        components: {   
            Login,
            Register,
            ForgotPassword
        },
        props: {
            formToShow: {
                type: String,
                required: true
            },
            formWithModal: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            return {
                currentForm: this.formToShow,
            }
        },
        methods: {
            switchAuthForm(e) {
                if(!this.formWithModal) {
                    window.location = e.target.href
                    return;
                }

                this.currentForm = e.target.id;
            },
        }
    }
</script>

<style type="css">
    .authForms {
        display: flex;
        width: 100%;
        height: 100%;
        margin-top:0
    }

    .authForms .form-register,
    .authForms .form-login,
    .authForms .forgot-password {
        display: d-flex;
    }

    .form-submit {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 8px;
    }

    .form-submit.done{
        color: #24a0ed;
    }

    .form-footer {
        margin-top: 28px;
        font-family: IBMPlexSans,sans-serif;
    }

    .form-footer .links {
        font-weight: 500;
        line-height: 18px;
        margin-top: 25px;
    }

    .form-footer a {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: .5px;
        line-height: 24px;
        text-transform: uppercase;
    }

    .form-footer .link-separator {
        color: #0079d3;
        margin: 0 4px;
    }
    
</style>