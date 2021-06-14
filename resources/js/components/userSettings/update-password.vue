<template>
    <div class="update-password">
        <form-modal-helper 
            slot="update-password" 
            modal-id="updatePasswordForm" 
            @modalHidden="resetUpdatePasswordForm"
        >
            <form-helper slot="form" :loading="updatePasswordForm.loading">
                <div slot="form-header">
                    <div class="app-logo"></div>
                    <h1>Update Your Password</h1>
                </div>
                <div slot="form-inputs">
                    <div class="form-group">
                        <input type="password" placeholder="old password" v-model="updatePasswordForm.fields.oldPassword">
                        <field-feedback v-if="updatePasswordForm.feedback.oldPassword" :feedback="updatePasswordForm.feedback.oldPassword" />                    
                    </div>
                    <div class="form-group">
                        <input type="password" placeholder="password" v-model="updatePasswordForm.fields.newPassword">
                        <field-feedback v-if="updatePasswordForm.feedback.newPassword" :feedback="updatePasswordForm.feedback.newPassword" />                    
                    </div>
                    <div class="form-group">
                        <input type="password" placeholder="confirm new password" v-model="updatePasswordForm.fields.newPasswordConfirmation"> 
                        <field-feedback v-if="updatePasswordForm.feedback.newPasswordConfirmation" :feedback="feedback.newPasswordConfirmation"/>                    
                    </div>
                </div>
                <div slot="form-submit-button">
                    <button 
                        type="button" 
                        :disabled="!isUpdatePasswordFormValid" 
                        @click.prevent="updatePassword" 
                        class="btn btn-primary"
                    >
                        Save password
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
                updatePasswordForm: {}
            }
        },
        created() {
            this.updatePasswordForm = new AuthForm({
                oldPassword: '',
                newPassword: '',
                newPasswordConfirmation: ''
            })
        },
        computed: {
            isUpdatePasswordFormValid() {
                return this.updatePasswordForm.areAllFieldsFilled()
            },
        },
        methods: {
            updatePassword() {
                this.updatePasswordForm.activateLoading()

                Axios.post('/update-password', this.updatePasswordForm.fields)
                    .then(() => {

                        this.updatePasswordForm.disableLoading()

                        __hideModalById('updatePasswordForm')

                        __showSuccessMessage('Password has been changed successfully',4000)
                    })
                    .catch( ({ response }) => {

                        this.updatePasswordForm.disableLoading()

                        if(response.status === 422) {
                            this.updatePasswordForm.feedback = response.data.errors
                            return
                        }

                        __showSomethingWentWrongMessage()
                    })

                this.updatePasswordForm.clearFeedback()
            },
            resetUpdatePasswordForm() {
                this.updatePasswordForm.clearFields()
                this.updatePasswordForm.clearFeedback()
            },
        }
    }
</script>
