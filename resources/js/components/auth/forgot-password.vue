<template>
    <form-helper :loading="forgotPasswordForm.loading" class="forgot-password">
        <div slot="form-header">
            <div class="app-logo"></div>
            <h1>Reset Passoword</h1>
            <p class="description">
                Tell us the username and the email address associated with your Reddit account, and we’ll send you an email with a link to reset your password.
            </p>
        </div>
        <div slot="form-inputs"> 
            <div class="form-group">
                <input type="text" placeholder="username" v-model="forgotPasswordForm.fields.username">
                <field-feedback v-if="forgotPasswordForm.feedback.username" :feedback="forgotPasswordForm.feedback.username" />                    
            </div>
            <div class="form-group">
                <input type="text" placeholder="email" v-model="forgotPasswordForm.fields.email">
                <field-feedback v-if="forgotPasswordForm.feedback.email" :feedback="forgotPasswordForm.feedback.email" />                    
            </div>
        </div>
        <div slot="form-submit-button">
            <button 
                type="button" 
                :disabled="forgotPasswordForm.formSubmit.done || !forgotPasswordFormIsValid" 
                @click="requestPasswordReset()" 
                class="btn btn-primary"
            >
                <i v-if="forgotPasswordForm.formSubmit.done" class="fas fa-check"></i>
                <span v-else>reset password</span>
            </button>
        </div>
        <div slot="form-footer" class="form-footer">
            <div v-if="forgotPasswordForm.formSubmit.done" class="form-submit done">{{ forgotPasswordForm.formSubmit.message }}</div>
            <div class="links">
                <a href="/login" id="login" class="link" @click.prevent="$emit('switchAuthForm',$event)">log in</a>
                <span class="link-separator">•</span>
                <a href="/register" id="register" class="link" @click.prevent="$emit('switchAuthForm',$event)">sign up</a>
            </div>
        </div>    
    </form-helper>
</template>

<script>
    import AuthForm from './auth-forms-helper'

    export default {
        data() {
            return {
                forgotPasswordForm: {}
            }
        },
        created() {
            this.forgotPasswordForm = new AuthForm({
                username: '',
                email: ''
            })
        },
        computed: {
            forgotPasswordFormIsValid() {
                return this.forgotPasswordForm.areAllFieldsFilled()
            }
        },
        methods: {
            requestPasswordReset() {
                this.forgotPasswordForm.activateLoading();

                axios.post('/password/email',this.forgotPasswordForm.fields)
                   .then( ({ data }) => {
                        
                        this.forgotPasswordForm.disableLoading()

                        this.forgotPasswordForm.setFormAsSubmitted(data.message)
                    })
                    .catch( ({ response }) => {
                        
                        this.forgotPasswordForm.disableLoading()
                        
                        if(response.status === 422){
                            this.forgotPasswordForm.feedback = response.data.errors
                            return;
                        }
                        
                        __showSomethingWentWrongMessage();
                    });

                this.forgotPasswordForm.clearAllFeedbacks()
            },
        }
    }
</script>

<style>
    .reset-password {
        background-color: #fff;
        display: flex;
        width: 100%;
        height: 100%;
        margin-top:0
    }
</style>