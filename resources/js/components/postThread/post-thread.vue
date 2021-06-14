<template>
    <div v-if="post">
        <community-page-header v-if="!modal" :subreddit="subreddit"></community-page-header>
        <div class="container-fluid mt-4" :class="{'thread-max-width': !modal}">
            <div class="row p-4 mx-0 mh-100">
                <div class="col-md-8 pr-0">
                    <div class="thread">
                        <post-card 
                            :post="post" 
                            class="mt-1"
                        >
                        </post-card>
                        <comments-tree 
                            :post-id="post.id"
                            :initial-comments-count="post.commentsCount"
                            @update-comments-count="updatePostCommentsCount" 
                        >
                        </comments-tree>
                    </div>
                </div>    
                <div class="col-md-4">
                    <about-community :subreddit="subreddit"></about-community>
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
    import CommentsTree from './comments-tree'
    import AboutCommunity from '../about-community'
    import PostCard from '../post-card.vue'
    import CommunityPageHeader from '../communityPage/community-page-header'

    export default {
        components: {
            CommentsTree,
            AboutCommunity,
            PostCard,
            CommunityPageHeader,
        },
        props: {
            initialPost: {
                type: Object,
                required: false
            },
            modal: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                post: null,
            }
        },
        created() {
            this.getThePost()
        },
        computed: {
            subreddit() {
                return this.post ? this.post.subreddit : {}
            },
        },
        watch: {
            $route(to,from) {
                if(to.params.postId !== from.params.postId) this.getThePost()
            },
        },
        methods: {
            getThePost() {

                this.post = this.initialPost

                if(this.post) return 

                const postId = this.$route.params.postId,
                subredditName = this.$route.params.subreddit

                Axios.get(`/r/${subredditName}/posts/${postId}`)
                    .then( ({ data }) => {

                        this.post = data

                        this.sendCurrentCommunityToPageObserver()
                        
                        this.setCurrentCommentAction()
                    })
                    .catch( ({ response }) => {

                        let responseData = response.data  

                        if(response.status === 404) {
                            
                            if(responseData.entity === 'subreddit') {
                                this.$showPageError('subreddit-not-found',responseData.message)
                                return
                            }

                            this.$showPageError('post-not-found',responseData.message)
                        }

                        if(response.status === 403) {
                            this.$showPageError('private-subreddit-error',responseData.message)
                        }
                    })
            },
            setCurrentCommentAction() {
                this.currentCommentAction = {
                    type: 'comment',
                    params: {
                        postId: this.post.id
                    }
                }
            },
            sendCurrentCommunityToPageObserver() {
                __sendEntityToPageObserver(this.subreddit)
            },
            updatePostCommentsCount(count) {
                this.post.commentsCount = count
            }
        },
    }
</script>

<style scoped>
    
    .thread-max-width {
        max-width: calc(100% - 160px);
    }
    
    .community-page-header >>> .row {
        display: flex;
        flex-wrap: wrap;
        margin-right: 0;
        margin-left: 0;
    }
    
    .thread {
        padding-bottom: 32px;
        margin-bottom: 20px;
        background-color: #fff;
        border-radius: 0.30rem;
        border: 1px solid #fff;
    }

    .thread >>> .post .vote {
        background-color: #fff;
    }
</style>