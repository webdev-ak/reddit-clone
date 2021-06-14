<template>
    <div id="comments-list">
        <div 
            v-for="(comment,index) in userComments"
            :key="comment.id"
            :comment="comment"
            :class="{ 'mb-2': index === userComments.length - 1}"
            @click.stop="$emit('show-comment',comment)"
        >
            <div class="comment d-flex">
                <div class="p-1">
                    <div :class="[ comment.comment_id ? 'reply-line' : 'comment-line']"></div>
                </div>
                <div class="comment-body">
                    <div class="comment-header">
                        <router-link :to="`/user/${comment.AuthorUsername}`" class="dark-link" @click.native.stop="">
                            {{ comment.AuthorUsername }}
                        </router-link>
                        <span class="text-muted font-weight-light" >
                            {{ comment.rank }} {{ 'points' | pluralize(comment.rank) }} - {{ comment.created_at | moment("from","now") }}
                        </span>
                    </div>
                    <div class="commentContent ql-snow">
                        <div class="ql-editor" v-html="comment.content"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            comments: {
                type: Array,
                required: true
            },
            postId: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                userComments: this.comments,
                currentUsername:this.$route.params.username
            }
        },
        watch: {
            userComments(newList,oldList) {
                if(newList.length === 0) this.$emit('no-user-comments',this.postId)
            }
        },
        created() {
            window.events.$on('user-comment-updated',this.updateUserCommentsList)
        },
        destroyed() {
            window.events.$off('user-comment-updated',this.updateUserCommentsList)
        },
        methods: {
            updateUserCommentsList({updatedComment,action,postId}) {

                if(updatedComment.AuthorUsername !== this.currentUsername || postId !== this.postId) return
                
                switch(action) {
                    case 'added': 
                        this.userComments.unshift(updatedComment)
                        break

                    case 'deleted': 
                        const deleteReplies = (reply) => {
                            
                            this.userComments = this.userComments.filter(comment => comment.id !== reply.id)
                            
                            reply.replies && reply.replies.forEach(deleteReplies)
                        }

                        updatedComment.replies.forEach(deleteReplies)

                        this.userComments = this.userComments.filter(comment => comment.id !== updatedComment.id)
                        break

                    case 'edited': 
                        this.userComments = this.userComments.map(comment => {
                            if(comment.id === updatedComment.id) return updatedComment
                            return comment
                        })
                        break

                    default: return
                }
            }
        }
    }
</script>

<style scoped>

    #comments-list {
        background-color: #fff;
    }

    .commentContent {
        width: fit-content;
    }

    .comment {
        color: black;
        padding: 4px 10px;
        width: 100%;
        border: 1px solid #CDCDCD;
    }

    .comment:hover {
        border: 1px solid #878A8C ;
    }

    .comment-body {
        margin-left: 16px;
        width: 100%;
        padding: 4px 0px;
        word-break: break-word;
    }

    .reply-line {
        width: 22px;
        height: 100%;
        border: 2px dashed gray;
        opacity: 0.2;
        border-top: none;
        border-bottom: none;
        pointer-events: none;
    }
    
    .comment-line {
        height: 100%;
        border-left: 2px dashed gray;
        opacity: 0.2;
        pointer-events: none;
    }
</style>