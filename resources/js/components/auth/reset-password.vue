<template>
    <div class="reset-password">
        <form-helper :loading="resetPasswordForm.loading">
            <div slot="form-header">
                <div class="app-logo"></div>
                <h1>Reset Passoword</h1>
            </div>
            <div slot="form-inputs"> 
                <div v-if="resetPasswordForm.feedback.success" class="alert alert-success">
                    {{ resetPasswordForm.feedback.success }}
                </div>
                <div v-if="resetPasswordForm.feedback.failed" class="alert alert-danger">
                    {{ resetPasswordForm.feedback.failed }}
                </div>
                <div class="form-group">
                    <input type="text" placeholder="email" v-model="resetPasswordForm.fields.email">
                    <field-feedback v-if="resetPasswordForm.feedback.email" :feedback="resetPasswordForm.feedback.email" />                    
                </div>
                <div class="form-group">
                    <input type="password" placeholder="password" v-model="resetPasswordForm.fields.password">
                </div>
                <div class="form-group">
                    <input type="password" placeholder="password confirmation" v-model="resetPasswordForm.fields.password_confirmation">
                    <field-feedback v-if="resetPasswordForm.feedback.password" :feedback="resetPasswordForm.feedback.password" />                    
                </div>
            </div>
            <div slot="form-submit-button">
                <button 
                    type="button" 
                    :disabled="resetPasswordForm.formSubmit.done || !resetPasswordFormIsValid" 
                    @click="resetPassword()" 
                    class="btn btn-primary"
                >
                    <i v-if="resetPasswordForm.formSubmit.done" class="fas fa-check"></i>
                    <span v-else>RESET PASSWORD</span>
                </button>
            </div>
            <div slot="form-footer" class="form-footer">
                <a href="/login" class="link">log in</a>
                <span class="link-separator">•</span>
                <a href="/register" class="link">sign up</a>
            </div>
        </form-helper>
    </div>
</template>

<script>
    import AuthForm from './auth-forms-helper'

    export default {
        props: {
            initialEmail: {
                type: String,
                required: true,
                default: ""
            },
            token: {
                type: String,
                required: true,
            }
        },
        data() {
            return {
                resetPasswordForm: {},
            }
        },
        created() {
            this.resetPasswordForm = new AuthForm({
                email: this.initialEmail,
                password: '',
                password_confirmation: '',
                token: this.token
            })
        },
        computed: {
            resetPasswordFormIsValid() {
                return this.resetPasswordForm.areAllFieldsFilled()
            }
        },
        methods: {
            resetPassword() {
                this.resetPasswordForm.activateLoading()

                axios.post('/password/reset',this.resetPasswordForm.fields)
                    .then( ({ data }) => {
                        
                        this.resetPasswordForm.disableLoading()
                        
                        if(data.task === 'done') {
                            this.resetPasswordForm.feedback.success = data.message
                            this.resetPasswordForm.setFormAsSubmitted();
                            return;
                        }

                        if(data.task === 'failed') {
                            this.resetPasswordForm.feedback.failed = data.message
                        }

                    })
                    .catch( ({ response }) => {
                        
                        this.resetPasswordForm.disableLoading()
                        
                        if(response.status === 422){
                            this.resetPasswordForm.feedback = response.data.errors
                            return;
                        }
                        
                        __showSomethingWentWrongMessage();
                    });


                this.resetPasswordForm.clearAllFeedbacks() 
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