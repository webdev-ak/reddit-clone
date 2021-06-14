<template>
   <div class="container-fluid pt-5 h-100">
        <div class="error-container">
            <slot name="error-content"></slot>
            <div class="error-buttons">
                <slot name="error-buttons" :authenticated="authenticated"></slot>
                <a @click.prevent="goHome" class="btn btn-primary mx-2">go home</a>    
            </div>
        </div>
   </div>  
</template>

<script>
export default {
    computed: {
        authenticated() {
            return !!__auth()
        }
    },
    methods: {
        goHome() {
            this.$router.push({'name': 'home'})
        }
    },
    created() {
        let exception = {
            name: 'Page Error',
            icon: '<i class="fas fa-exclamation-circle"></i>'
        }
        __sendEntityToPageObserver(exception)
    }
}
</script>

<style>
    img.no-results, img.private-community{
        height: 100px;
        margin: 0 auto;
        width: auto;
    }

    .error-container {
        display: flex;
        flex-direction: column;
        margin: 48px;
        padding:48px;
        text-align: center;      
    }

    .page-not-found .error-container {
        margin: 0;
        padding: 0;
    }
    .error-message {
        font-size: 17px;
        font-weight: 400;
        line-height: 22px;
        margin: 40px 0;
    }
    .error-buttons {
        display: flex;
        justify-content: center;
        text-transform: uppercase;
    }
    
</style>