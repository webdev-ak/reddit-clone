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

        <div class="modal fade" id="emailUpdatedMessage" tabindex="-1" role="dialog"  aria-hidden="true">
            <div class="modal-dialog modal-md modal-dialog-centered " role="document">
                <div class="d-flex">
                    <div class="modal-content">
                        <div class="modal-body p-0 m-0 d-flex">
                            <div class="successMessage d-flex flex-column p-4"> 
                                <div class="message-header">
                                    <i class="fas fa-envelope"></i>
                                    <div>
                                        <h4>Check Your Email</h4>
                                    </div>
                                </div>
                                <div class="message-body my-2">
                                    <h6>
                                        Reddit sent a confirmation email to <span class="font-weight-bold" id="newEmail"></span>    
                                        <br><br>Click the verify link in the email to secure your Reddit account
                                    </h6>
                                </div>
                                <div class="ml-auto">
                                    <button type="button" data-dismiss="modal" aria-label="Close" class="btn btn-primary btn-block">
                                        GOT IT
                                    </button>
                                </div>
                            </div>
                            <div class="p-2 ml-auto">
                                <button type="button" data-dismiss="modal" aria-label="Close" class="close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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

                        this.showEmailUpdatedMessage(newEmail)

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
            showEmailUpdatedMessage(newEmail) {
                $('#emailUpdatedMessage span#newEmail')[0].innerHTML = newEmail
                
                __showModalById('emailUpdatedMessage')
            }
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