<template>
   <div class="posts upvoted">
        <post-classic
            v-for="post in upvotedPosts.data"
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
                upvotedPosts: {},
            }
        },
        created() {
            this.upvotedPosts = new UserActivity()
            
            this.upvotedPosts.setLoadingType('postsClassic')
            
            const url = `/user/${this.$route.params.username}/get-upvoted`
            this.upvotedPosts.setDataFetchUrl(url) 
        },
        activated() {
            this.$emit('activated',this.upvotedPosts)
        },
        mounted() {
            this.upvotedPosts.fetchData()
        },
    }
</script>