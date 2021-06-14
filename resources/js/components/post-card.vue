<template>
    <div class="post post-card">
        <vote 
            :default-votes="post.votes" 
            :entity-info="postHelper.postInfo" 
            entity-type="post" 
            @newVotes="setPostNewVotes" 
            @newRank="setPostNewRank"
        >
        </vote>
        <div class="post-content">
            <div class="post-header d-flex justify-content-between mb-1">
                <div class="d-flex align-items-center">
                    <div v-if="!subredditRoute" class="d-flex">
                        <img width="22px" height="22px" class="rounded-circle" :src="subreddit.imagePath">
                        <div class="pl-1">
                            <a @click.prevent.stop="postHelper.goToPostSubreddit()" class="dark-link">r/{{subreddit.name}}</a>
                            <span class="small-dot">•</span>
                        </div>
                    </div>
                    <div class="posted-by">
                        <span>
                            Posted by <a href="#" @click.prevent.stop="postHelper.goToPostAuthorProfile()" >u/{{ post.AuthorUsername }}</a> 
                        </span>
                        <span>{{ post.created_at | moment("from","now") }}</span>
                    </div>
                </div>
                <div v-show="!userIsFollowingCurrentSubreddit() && !subredditRoute && !threadRoute">
                    <follow-button
                        class="btn-sm"
                        entity-type="subreddit"
                        :entity-id="subreddit.name"
                        :initial-subscriptions="subredditSubscriptions"
                        @update-subscriptions="updateSubredditSubscriptions"
                    >
                    </follow-button>
                </div>
            </div>
            <div class="post-content-body py-2">
                <h3 v-html="post.title"></h3>
                <div class="postDescription ql-snow">
                    <div class="ql-editor" v-html="post.description"></div>
                </div>
                <div v-if="post.imagePath" class="img-container">
                    <loading-simulation
                        v-if="postImageLoading"
                        type="postImage"
                    >
                    </loading-simulation>
                    <img 
                        v-show="!postImageLoading"
                        :src="post.imagePath" 
                        @load="deactivateImageLoading()" 
                        @error="setPostImageAsFailedToLoad()"
                    >
                    <div v-if="postImageLoadingFailed" class="post-image-loading-failed">
                        <span>Sorry but we couldn't load the post's image, try reloading the page</span>
                    </div>
                </div>
            </div>
            <div class="post-content-footer list-inline">
                <a class="list-inline-item">
                    <i class="fas fa-comment-alt"></i> {{ post.commentsCount }} {{ 'comment' | pluralize(post.commentsCount )}}
                </a>
                <a v-if="user && post.user_id === user.id" class="list-inline-item " @click.stop="postHelper.deletePost()">
                    <i class="fas fa-trash"></i> Delete
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import Vote from './vote'
    import PostHelper from './PostHelper'

    export default {
        props: {
            post: {
                type: Object,
                required: true
            },
        },
        components: {
            Vote,
        },
        data() {
            return {
                postHelper: {},
                user: __auth(),
                postImageLoading: true,
                postImageLoadingFailed: false,
                subredditRoute: this.$route.name === 'subreddit',
                threadRoute: this.$route.meta.threadRouteName,
                subredditSubscriptions: this.post.subreddit.subscriptions
            }
        },
        created() {
            this.postHelper = new PostHelper(this.post)
        },
        computed: {
            subreddit() {
                return this.post.subreddit
            } 
        },
        methods: {
            updateSubredditSubscriptions(newSubscriptions) {
                this.subreddit.subscriptions = newSubscriptions
            },
            userIsFollowingCurrentSubreddit() {

                if(! this.user) return false

                return !!this.subredditSubscriptions.find(s => s.user_id === this.user.id)
            },
            setPostImageAsFailedToLoad() {
                this.deactivateImageLoading()
                this.postImageLoadingFailed = true     
            },
            deactivateImageLoading() {
                this.postImageLoading = false
            },
            setPostNewRank(newRank) {
                this.post.rank = newRank
            },
            setPostNewVotes(newVotes) {
                this.post.votes = newVotes
            },
        }
    }
</script>

<style>
    .post h3 {
        font-family: Arial, sans-serif;
        font-size: 19px;
        font-weight: 500;
        line-height: 22px;
    }

    .small-dot {
        font-size: 8px;
        line-height: 20px;
        color: #6c757d;
        padding: 0 4px;
    }

    .post-card .posted-by {
        padding-top: 2px;
    }

    .posted-by a:hover {
        text-decoration: underline;
    }
    
    .post-content {
        padding: 8px 16px 6px;
        width: 100%;
        overflow-wrap: anywhere;
    }

    .posts .postDescription {
        max-height: 250px;
        overflow: hidden;
        -webkit-mask-image: linear-gradient(180deg,#000 60%,transparent);

    }

    .postDescription {
        font-size: 14px;
        font-weight: 400;
    }

    .post-content-body .img-container {
        text-align: center;
    }

    .post-content-body .img-container img{
        max-width: 100%;
    }    

    .post {
        display: flex;
        background-color: #fff;
        background-clip: border-box;
        margin-bottom: 11px;
    }

    .posts .post {
        border-radius: 0.30rem;
        border: 1px solid #CDCDCD;
        cursor: pointer;
    }

    .posts .post:hover{
        border: 1px solid #878A8C ;
    }

    .post .vote {
        background-color: #F8F9FA;
        padding-top: 8px;
    }

    .post-image-loading-failed {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 300px;
    }

    .list-inline > a {
        text-decoration: none;
        font-size: 13px;
        font-weight: bold;
        color:#606060 ;
    }

    .list-inline > a:hover {
        cursor: pointer;
        background-color: #EFEFED;
    }
</style>