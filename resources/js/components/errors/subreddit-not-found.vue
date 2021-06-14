<template>
    <errors-helper>
        <div slot="error-content">
            <div>
                <img class="no-community">
            </div>
            <div class="error-message" v-if="errorMessage">
                <h5>{{ errorMessage }}</h5>
            </div>
        </div>
        <div slot="error-buttons" slot-scope="{authenticated}">
            <router-link v-if="authenticated" to="/subreddits/create" class="btn btn-outline-primary">
                create community
            </router-link>
        </div>
    </errors-helper>        
</template>

<script>
import ErrorsHelper from '../helpers/errors-helper'

export default {
    props: {
        errorMessage: {
            type: String,
            required: true,
            default: ''
        }
    },
    components: {
        ErrorsHelper,
    },
}
</script>

<style>
    img.no-community {
        background-color: #a8a8a8;
        border-radius: 100%;
        height: 100px;
        margin-left: auto;
        margin-right: auto;
        width: 100px;
    }
</style>