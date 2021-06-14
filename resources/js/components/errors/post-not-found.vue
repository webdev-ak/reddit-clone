<template>
    <errors-helper>
        <div slot="error-content">
            <div>
                <img :src="$getConst('images').SNOO_THOUGHTFUL" class="no-results" alt="">
            </div>
            <div class="error-message" v-if="errorMessage">
                <h5>{{ errorMessage }}</h5>
            </div>
        </div>  
        <div slot="error-buttons" slot-scope="{authenticated}">
            <router-link v-if="authenticated" to="/submit" class="btn btn-outline-primary" >
                create post
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
