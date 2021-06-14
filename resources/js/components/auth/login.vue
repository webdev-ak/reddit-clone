<template>
    <form-helper class="form-login" :loading="loginForm.loading">    
        <div slot="form-header">
            <div class="app-logo"></div>
            <h1>Login</h1>
        </div>
        <div slot="form-inputs">
            <div class="form-group">
                <input type="text" placeholder="username" v-model="loginForm.fields.username">
                <field-feedback v-if="loginForm.feedback.username" :feedback="loginForm.feedback.username" />                    
            </div>
            <div class="form-group">
                <input type="password" placeholder="password" v-model="loginForm.fields.password">
                <field-feedback v-if="loginForm.feedback.password" :feedback="loginForm.feedback.password" />                    
            </div>
        </div>
        <div slot="form-submit-button">
            <button 
                type="button" 
                class="btn btn-primary" 
                :disabled="loginForm.formSubmit.done || !isLoginFormValid"
                @click="attemptLogin()" 
            >
                <i v-if="loginForm.formSubmit.done" class="fas fa-check"></i>
                <span v-else>Log in</span>
            </button>
        </div>
        <div slot="form-footer" class="form-footer">
            <div v-if="loginForm.formSubmit.done" class="form-submit done">
                {{ loginForm.formSubmit.message }}
            </div>
            <div class="mt-2">
                <span>Don't have an account yet ?</span>
                <a href="/register" id="register" class="link" @click.prevent="$emit('switchAuthForm',$event)">Register</a>
            </div>
        </div>
    </form-helper>
</template>

<script>
    import AuthForm from './auth-forms-helper'

    export default {
        data() {
            return {
                loginForm: {}
            }
        },
        computed: {
            isLoginFormValid() {
                return this.loginForm.areAllFieldsFilled()
            },
        },
        created() {
            this.loginForm = new AuthForm({
                username: '',
                password: ''
            })
        },
        methods: {
            attemptLogin() {
                this.loginForm.activateLoading()

                axios.post('/login',this.loginForm.fields)
                    .then( ({ data }) => {

                        this.loginForm.disableLoading()
                        
                        this.loginForm.setFormAsSubmitted(data.message);

                        location.reload();
                    })
                    .catch( ({ response }) => {

                        this.loginForm.disableLoading()

                        if(response.status === 422) {
                            this.loginForm.feedback = response.data.errors
                            return;
                        }
                        
                        __showSomethingWentWrongMessage();
                    });

                this.loginForm.clearAllFeedbacks();
            },
        }
    }
</script>

<style type="scss">
</style>