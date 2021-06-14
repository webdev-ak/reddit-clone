<template>
    <div class="update-password">
        <form-modal-helper modal-id="updateEmailForm" @modalHidden="resetUpdateEmailForm">
            <form-helper slot="form" :loading="updateEmailForm.loading">
                <div slot="form-header">
                    <div class="app-logo"></div>
                    <h1>Update your email</h1>
                </div>
                <div slot="form-inputs">
                    <div class="form-group">
                        <input type="password" v-model="updateEmailForm.fields.password" placeholder="current password">
                        <field-feedback v-if="updateEmailForm.feedback.password" :feedback="updateEmailForm.feedback.password" />                    
                    </div>
                    <div class="form-group">
                        <input type="email" v-model="updateEmailForm.fields.email" placeholder="new email">
                        <field-feedback v-if="updateEmailForm.feedback.email" :feedback="updateEmailForm.feedback.email" />                    
                    </div>
                </div>
                <div slot="form-submit-button">
                    <button @click.prevent="updateEmail()" :disabled="!isUpdateEmailFormValid" class="btn btn-primary">
                        Save Email
                    </button>
                </div>
            </form-helper>
        </form-modal-helper>
    </div>
</template>

<script>
    import AuthForm from '../auth/auth-forms-helper'

    export default {
        data() {
            return {
                updateEmailForm: {},
            }
        },
        computed: {
            isUpdateEmailFormValid() {
                return this.updateEmailForm.areAllFieldsFilled()
            },
        },
        created() {
            this.updateEmailForm = new AuthForm({
                password: '',
                email: '',
            }) 
        },
        methods: {
            updateEmail() {
                this.updateEmailForm.activateLoading()    
                
                Axios.post('/update-email',this.updateEmailForm.fields)
                    .then(() => {

                        this.updateEmailForm.disableLoading()    

                        const newEmail = this.updateEmailForm.fields.email

                        this.$parent.user.email = newEmail    
                        
                        __hideModalById('updateEmailForm')

                        __showSuccessMessage('Email has been changed successfully',4000)
                    })
                    .catch( ({ response }) => {

                        this.updateEmailForm.disableLoading()    

                        if(response.status === 422) {
                            this.updateEmailForm.feedback = response.data.errors
                            return
                        }
                        __showSomethingWentWrongMessage()
                    })

                this.updateEmailForm.clearFeedback()
            },
            resetUpdateEmailForm() {
                this.updateEmailForm.clearFields()
                this.updateEmailForm.clearFeedback()
            },
        }
    }
</script>

<style scoped>
    .message-header {
        display: flex;
    }

    .message-header i {
        font-size: 22px;
        margin-right: 10px;
    }
</style>