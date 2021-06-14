<template>
    <form-helper class="form-register" :loading="registerForm.loading">
        <div slot="form-header">
            <div class="app-logo"></div>
            <h1>Register</h1>
        </div>
        <div slot="form-inputs">
            <div class="form-group">
                <input type="text" v-model="registerForm.fields.username" placeholder="username">
                <field-feedback v-if="registerForm.feedback.username" :feedback="registerForm.feedback.username" />                    
            </div>
            <div class="form-group">
                <input type="email" v-model="registerForm.fields.email" placeholder="email">
                <field-feedback v-if="registerForm.feedback.email" :feedback="registerForm.feedback.email" />                    
            </div>
            <div class="form-group">
                <input type="text" v-model="registerForm.fields.birthdate" placeholder="birthdate" onfocus="this.type='date'">
                <field-feedback v-if="registerForm.feedback.birthdate" :feedback="registerForm.feedback.birthdate" />                    
            </div>
            <div class="form-group">
                <input type="password" v-model="registerForm.fields.password" placeholder="password">
            </div>
            <div class="form-group">
                <input type="password" v-model="registerForm.fields.password_confirmation" placeholder="confirm password">
                <field-feedback v-if="registerForm.feedback.password" :feedback="registerForm.feedback.password" />                    
            </div>
        </div>
        <div slot="form-submit-button">
            <button 
                type="button" 
                class="btn btn-primary" 
                :disabled="registerForm.formSubmit.done || !isRegisterFormValid"
                @click="register()" 
            >
                <i v-if="registerForm.formSubmit.done" class="fas fa-check"></i>
                <span v-else>sign up</span>
            </button>
        </div>
        <div slot="form-footer" class="form-footer">
            <div v-if="registerForm.formSubmit.done" class="form-submit done">
                {{ registerForm.formSubmit.message }}
            </div>
            <span>Already a redditor ?</span>
            <a href="/login" id="login" class="link" @click.prevent="$emit('switchAuthForm',$event)">log in</a>
        </div>
    </form-helper>
</template>

<script>
    import AuthForm from './auth-forms-helper'

    export default {
        data() {
            return {
                registerForm: {}
            }
        },
        created() {
            this.registerForm = new AuthForm({
                username: '',
                email: '',
                password: '',
                password_confirmation: '',
                birthdate: ''
            })
        }, 
        computed: {
            isRegisterFormValid() {
                return this.registerForm.areAllFieldsFilled()
            },
        },
        methods: {
            register() {
                this.registerForm.activateLoading()

                axios.post('/register', this.registerForm.fields)
                    .then( ({ data }) => {

                        this.registerForm.disableLoading()

                        this.registerForm.setFormAsSubmitted(data.message);
                        
                        window.location = '/'
                        
                    })
                    .catch( ({ response }) => {
                        this.registerForm.disableLoading()

                        if(response.status === 422) {
                            this.registerForm.feedback = response.data.errors
                            return;
                        }
                        __showSomethingWentWrongMessage();    
                    })

                this.registerForm.clearAllFeedbacks();    
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
    .authForms .reset-password {
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
    }

    .form-footer .links {
        font-size: 13px;
        font-weight: 500;
        line-height: 18px;
        margin-top: 25px;
    }

    .form-footer a {
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