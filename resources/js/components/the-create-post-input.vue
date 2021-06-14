<template>
    <div class="d-flex mb-4">
        <div class="card w-100" >
            <div class="card-body p-1">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Create Post"
                    @focus="goToSubmitPostPage"
                >
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            submitPostUrl: {
                type: String,
                required: false,
                default: '/submit'
            }
        },
        methods: {
            goToSubmitPostPage() {
                this.$router.push(this.submitPostUrl)
            }
        }
    }
</script>