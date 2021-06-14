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
        ErrorsHelper
    }
}
</script>
