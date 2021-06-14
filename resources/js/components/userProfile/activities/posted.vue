<template>
   <div class="posts posted">
        <post-classic
            v-for="post in posts.data"
            :post="post"
            :key="post.id"
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
                posts: {},
            }
        },
        created() {
            this.posts = new UserActivity()
            
            this.posts.setLoadingType('postsClassic')
            
            const url = `/user/${this.$route.params.username}/get-posts`
            this.posts.setDataFetchUrl(url) 
        },
        activated() {
            this.$emit('activated',this.posts)
        },
        mounted() {
            this.posts.fetchData()
        },
    }
</script>
