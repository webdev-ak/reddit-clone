<template>
    <errors-helper class="page-not-found">
        <div slot="error-content">
            <div>
                <img :src="$getConst('images').PAGE_404" class="page-not-found" alt="">
            </div>
            <div class="error-message my-4">
                <h5>Page not found</h5>
                <h5>The page you requested doesn't exist</h5>
            </div>
        </div>
    </errors-helper>
</template>

<script>

import ErrorsHelper from '../helpers/errors-helper'

export default {
    components: {
        ErrorsHelper
    }
}
</script>

<style>
    img.page-not-found {
        height: 350px;
        width: auto;
        margin: 0 auto;
    }
</style>