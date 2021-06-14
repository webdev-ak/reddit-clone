<template>
    <div class="post post-classic" @click.stop="postHelper.showPost">
        <vote 
            :default-votes="post.votes" 
            :entity-info="postHelper.postInfo" 
            entity-type="post" 
            @newRank="setPostNewRank"
            @newVotes="setPostNewVotes" 
            class="pt-0"
        >
        </vote>
        <div class="post-content d-flex">
            <div>
                <div class="post-image-container">
                    <img v-if="post.imagePath" :src="post.imagePath">
                    <div v-else class="default-image">
                        <i class="fa fa-folder"></i>
                    </div>
                </div>
            </div>
            <div class="post-body px-3">
                <div class="post-header">
                    <div class="post-title d-block" v-html="post.title"></div>
                    <a @click.prevent.stop="postHelper.goToPostSubreddit()" class="dark-link">r/{{ post.subreddit.name}}</a>
                    <span class="small-point">•</span>
                    <div class="posted-by">
                        <span>
                            Posted by <a @click.prevent.stop="postHelper.goToPostAuthorProfile()" >u/{{ post.AuthorUsername }}</a> 
                        </span>
                        <span>{{ post.created_at | moment("from","now") }}</span>
                    </div>
                </div>
                <div class="post-footer list-inline py-1">
                    <a class="list-inline-item ">
                        <i class="fas fa-comment-alt"></i> {{ post.commentsCount }} {{ 'comment' | pluralize(post.commentsCount )}}
                    </a>
                    <a 
                        v-if="user && post.user_id === user.id" 
                        class="list-inline-item" 
                        @click.stop="postHelper.deletePost()"
                    >
                        <i class="fas fa-trash"></i> Delete
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vote from './vote'
    import PostHelper from './PostHelper'

    export default {
        components: {
            vote,
        },
        props: {
            post: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                postHelper: {},
                user: __auth(),
            }
        },
        created() {
            this.postHelper = new PostHelper(this.post)
        },
        methods: {
            setPostNewVotes(newVotes) {
                this.post.votes = newVotes
            },
            setPostNewRank(newRank) {
                this.post.rank = newRank
            },
        }
    }
</script>

<style scoped>

    .post-image-container {
        height: 60px;
        width: 80px;
    }
 
    .post-image-container .default-image{
        background-color: #EFEFED;
        color: gray;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    } 
 
    .post-image-container .default-image,img {
        border-radius: 4px;
        width: 100%;
        height: 100%;
    }
</style>