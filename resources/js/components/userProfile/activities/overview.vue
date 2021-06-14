<template>
   <div class="posts overview">
        <div v-for="post in overview.data" :key="post.id">
            <post-card
                :post="post"
                :style="postStyles(post)"
                @click.native="$emit('show-thread',post)"
            >
            </post-card>
            <user-comments
                v-if="userHasCommentsOn(post)"
                :comments="post.userComments"
                :postId="post.id"
                @show-comment="(comment) => $emit('show-thread',post,comment)" 
                @no-user-comments="clearAllUserCommentsOnPost"
            >
            </user-comments>
        </div>
   </div>
</template>

<script>
    import PostClassic from '../../post-classic.vue'
    import PostCard from '../../post-card.vue'
    import UserComments from './user-comments'
    import UserActivity from './UserActivity'

    export default {
        components: {
            PostClassic,
            PostCard,
            UserComments
        },
        data() {
            return {
                overview: {},
            }
        },
        created() {
            this.overview = new UserActivity()
            this.overview.setLoadingType('postsCard')

            const url = `/user/${this.$route.params.username}/get-overview`
            this.overview.setDataFetchUrl(url) 

        },
        activated() {
            this.$emit('activated',this.overview)
        },
        mounted() {
            this.overview.fetchData()
        },  
        methods: {
            postStyles(post) {
                
                if( ! this.userHasCommentsOn(post)) return {}

                return {
                    'margin-bottom': 0,
                    'border-bottom-left-radius': 0,
                    'border-bottom-right-radius': 0
                }
            },
            userHasCommentsOn(post) {
                return !!(post.userComments && post.userComments.length > 0)
            },
            clearAllUserCommentsOnPost(postId) {
                this.overview.data = this.overview.data.map(post => {
                    
                    if(post.id === postId) post.userComments = []

                    return post
                }) 
            }
        }
    }
</script>
