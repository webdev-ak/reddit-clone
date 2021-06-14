<template>
    <div>
        <span v-for="(error,index) in fieldFeedback" :key="index" class="feedback" role="alert">
            {{ error }}
        </span>
    </div>
</template>

<script>
    export default {    
        props: {
            feedback: {
                type: Array,
                required: true,
                default: {}
            },
        },
        computed: {
            fieldFeedback() {
                return this.feedback
            }
        }
    }
</script>

<style>
    .feedback {
        width: 100%;
        margin-top: 0.25rem;
        font-size: 90%;
        color: #e3342f;
        display: block !important;
        font-weight: 615 !important;  
    }
</style>