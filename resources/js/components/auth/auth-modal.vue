<template>
   <form-modal-helper modal-id="authModal" @modalHidden="clearForm">
       <auth-forms 
            slot="form"
            v-if="currentForm" 
            :form-to-show="currentForm"
            :formWithModal=true
            style="border-radius:0.3rem"
        >
        </auth-forms>
   </form-modal-helper> 
</template>

<script>
    import AuthForms from './auth-forms'

    export default {
        components: {
            AuthForms
        },
        data() {
            return {
                currentForm: '',
            }
        },
        created() {
            window.events.$on('openAuth', (formToOpen) => {
                this.currentForm = formToOpen;
                $('#authModal').modal('show');
            });
        },
        methods: {
            clearForm() {
                this.currentForm = '';
            }
        }
           
    }
</script>

<style type="css">
   
    .modal-lg {
        border: 0px solid rgba(0, 0, 0, 0.125);
        border-radius: 0.3rem;
        height: 100%;
    }

    .notification-success {
        border-left-color: #42a85f;
        font-size: 15px;
        margin-bottom: 100px;
        width:400px;
    }
</style>