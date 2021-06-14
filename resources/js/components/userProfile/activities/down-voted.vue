<template>
   <div class="posts downvoted">
        <post-classic
            v-for="post in downvotedPosts.data"
            :key="post.id"
            :post="post"
            :class="['mb-0','rounded-0']"
        >
        </post-classic>
   </div>
</template>

<script>
    import PostClassic from '../../post-classic.vue'
    import UserActivity from './UserActivity'

    export default {
        components: {
            PostClassic,
        },
        data() {
            return {
                downvotedPosts: {},
            }
        },
        created() {
            this.downvotedPosts = new UserActivity()
            
            this.downvotedPosts.setLoadingType('postsClassic')
            
            const url = `/user/${this.$route.params.username}/get-downvoted`
            this.downvotedPosts.setDataFetchUrl(url) 
        },
        activated() {
            this.$emit('activated',this.downvotedPosts)
        },
        mounted() {
            this.downvotedPosts.fetchData()
        },
    }
</script>
