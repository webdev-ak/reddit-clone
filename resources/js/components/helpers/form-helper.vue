<template>
    <div class="form-helper">
        <div class="art"></div>
        <div class="form-container">
            <form>
                <div class="form-header">
                    <slot name="form-header"></slot>
                </div>
                <slot name="form-inputs"></slot>
                <div class="form-submit-container">
                    <jumper-loading v-show="formLoading" class="w-100"></jumper-loading>
                    <slot v-if="!formLoading" name="form-submit-button"></slot>
                </div>
                <slot name="form-footer"></slot>
            </form>
        </div>
    </div>
</template>

<script>
    import {Jumper} from 'vue-loading-spinner'

    export default {
        props: {
            loading: {
                type: Boolean,
                required: false,
            }
        },
        components: {   
            'jumper-loading': Jumper
        },
        mounted() {
            this.changeJumperLoadingColor()    
        },
        methods: {
            changeJumperLoadingColor() {
                $('.spinner').children().css('background-color','#fff')
            },
        },
        computed: {
            formLoading() {
                return this.loading ? this.loading : this.$parent.loading
            }
        }
    }
</script>

<style scoped>

    .form-helper {
        display: flex;
        width: 100%;
        background-color: #fff;
    }

    .form-helper .form-group input,textarea {
        display: block;
        width: 100%;
        padding: 0.375rem 0.75rem;
        font-size: 0.9rem;
        font-weight: 400;
        line-height: 1.6;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    .form-helper .form-group input:not([type=radio]) { 
        height: 45px;
    }    

    .form-helper .form-group input:not([type=radio]):focus, textarea:focus { 
        border-color: #0079D3;
        outline: 0 none;
    }

    .form-container {
        padding: 24px;
        min-width: 350px;
        max-width: 440px;
        align-self: center;
    }
    
    form .form-header {
        margin-bottom: 24px;
    }

    .form-header h1 {
        margin-top: 5px;
    }
    

    .form-submit-container button, .spinner {
        margin-top: 8px;
        margin-bottom: 16px ;
        color: #fff;
        display:flex;
        justify-content: center;
        align-items: center;
        font-family: IBMPlexSans,sans-serif;
        font-size: 14px;
        font-weight: 600;
        border: none;
        border-radius: 4px;
        background: #0079d3;
        cursor: pointer;
        text-transform: uppercase;
        height: 40px;
        width: 100%;
    }

    form .description {
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
    }

    form h1 {
        font-size: 18px;
        font-weight: bold;
        line-height: 22px;
    }

    
    .btn {
        font-weight: 680 !important;  
        padding: 6px 48px;
    }

    input::placeholder, textarea::placeholder {
        font-family: Noto Sans,sans-serif;
        color:grey;
        font-size: 12px;
        font-weight: bold;
        letter-spacing: .5px;
        line-height: 12px;
        text-transform: uppercase;
    }

</style>