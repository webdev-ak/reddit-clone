<template>
    <div class="commented-posts">
        <div 
            v-for="post in commentedPosts.data" 
            :key="post.id"
            class="comment mb-2"
        >
            <div class="post-header" @click.stop="$emit('show-thread',post)">
                <i class="fas fa-comment-alt"></i>
                <div class="px-2">
                    <a href="#" @click.prevent.stop="showUserPage(getCommentAuthor(post))">
                        {{ getCommentAuthor(post) }}
                    </a>
                    <span class="text-muted">
                        commented on
                    </span>
                    <div class="post-title">{{ post.title }}</div>
                    <a @click.prevent.stop="goTo(`/r/${post.subreddit.name}`)" class="dark-link">r/{{ post.subreddit.name}}</a>
                    <span class="small-point">•</span>
                    <div class="posted-by">
                        <span>Posted by </span>
                        <a href="#" @click.prevent.stop="showUserPage(post.AuthorUsername)">u/{{ post.AuthorUsername }}</a>
                        <span>{{ post.created_at | moment("from","now") }}</span>
                    </div>
                </div>
            </div>
            <user-comments
                :comments="post.userComments"
                :postId="post.id"
                @show-comment="(comment) => $emit('show-thread',post,comment)"  
                @no-user-comments="removeCommentedPost"
            >
            </user-comments>
        </div>
    </div>
</template>

<script>
    import UserComments from './user-comments'
    import UserActivity from './UserActivity'

    export default {
        components: {
            UserComments,
        },
        data() {
            return {
                commentedPosts: {},
            }
        },
        created() {
            this.commentedPosts = new UserActivity()
            
            this.commentedPosts.setLoadingType('userActivitiesComments')
            
            const url = `/user/${this.$route.params.username}/get-comments`
            this.commentedPosts.setDataFetchUrl(url) 
        },
        activated() {
            this.$emit('activated',this.commentedPosts)
        },
        mounted() {
            this.commentedPosts.fetchData()
        },
        methods: {
            getCommentAuthor(post) {
                return post.userComments.length > 0 ? post.userComments[0].AuthorUsername : ''
            },
            showUserPage(username) {
                this.goTo(`/user/${username}`)
            },
            goTo(path) {
                this.$router.push(path).catch(() => {})
            },
            removeCommentedPost(postId) {
                this.commentedPosts.data = this.commentedPosts.data.filter(post => post.id !== postId) 
            }
        }
    }
</script>

<style lang="css">
    
    .commented-posts .post-header:hover{
        border: 1px solid #878A8C ;
    }
   
    .commented-posts .comment {
        background-color: #fff;
    }

    .commented-posts .post-header {
        border: 1px solid #CDCDCD ;
        padding: 8px;
        display:flex;
        align-items: center;
    }
 
    .commented-posts .post-header i {
        padding: 3px;
        font-size: 16px;
        color:#606060;
    }

</style>