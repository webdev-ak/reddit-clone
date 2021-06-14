<template>
    <div class="comments-section px-3 h-100">
        <div class="leave-comment" v-if="!isSingleThread">
            <div v-if="user">
                Comment as <router-link :to="`/user/${user.username}`">{{ user.username }}</router-link>
                <comment-manager
                    :comment-action="currentCommentAction"
                    @nodeAdded="addNode"
                >
                </comment-manager>
            </div>
            <div v-else class="d-flex border justify-content-between align-items-center p-3">
                <div>
                    <h6>Log in or sign up to leave a comment</h6>
                </div>
                <div>
                    <auth-buttons></auth-buttons>
                </div>
            </div>
        </div>
        <div v-if="!loading">
            <div v-if="isSingleThread" class="show-comments">
                <a href="#" @click.prevent="showAllComments">Show all comments</a>
                <a href="#" @click.prevent="showParentComments">Show parent comments</a>
            </div>
            <div v-if="commentsTree.length > 0" id="comments"> 
                <comment-node
                    class="my-4"
                    v-for="comment in commentsTree"
                    :key="comment.id"
                    :comment="comment"
                    @nodeAdded="addNode"
                    @nodeEdited="replaceNode"    
                    @nodeDeleted="deleteNode"
                >
                </comment-node>
            </div>
            <div v-else class="no-results">
                <div class="error" v-if="feedback.status === 'empty'">
                    <i class="fas fa-comment-alt mb-3"></i>
                    <div v-if="feedback.message" v-html="feedback.message"></div>
                </div>
                <div class="error" v-if="feedback.status === 'error'">
                    <img :src="$getConst('images').SNOO_THOUGHTFUL" alt="">
                    <div class="my-3" v-if="feedback.message">{{ feedback.message }}</div>
                    <button class="btn btn-primary" @click="getCommentsTree">
                        retry
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <loading-simulation
                type="commentsTree"
                :occurrences="10"
            >
            </loading-simulation>
        </div>
    </div>
</template>

<script>
    import CommentNode from './comment-node'
    import CommentManager from './comment-manager'

    export default {
        props: {
            postId: {
                type: Number,
                required: true
            },
            initialCommentsCount: {
                type: Number,
                required: true
            },
        },
        components: {
            CommentNode,
            CommentManager
        },
        data() {
            return {
                loading: null,
                threadId: null,
                commentsTree: [],
                commentsCount: this.initialCommentsCount,
                user: __auth(),
                currentCommentAction: {
                    type:"comment",
                    node:null,
                    postId: this.postId
                },
                feedback: {
                    status: '',
                    message: ''
                }
            }
        },
        created() {
            this.getCommentsTree()
        },
        computed: {
            isSingleThread() {
                return !!(this.$route.meta.singleThread && this.$route.params.threadId)
            },
        },
        watch: {
            $route(to,from) {
                this.getCommentsTree()
            },
            commentsCount(newCount,oldCount) {
                this.$emit('update-comments-count',newCount)
            }
        }, 
        methods: {
            incrementCommentsCount() {
                this.commentsCount++   
            },
            decrementCommentsCount(deletedNode) {

                this.commentsCount--
            
                const traverseNodes = (node) => {
                    
                    this.commentsCount--

                    node.replies && node.replies.forEach(traverseNodes)
                }

                deletedNode.replies && deletedNode.replies.forEach(traverseNodes)
            },
            updateCommentOnOtherActiveTrees(updatedComment,action) {

                if(this.$route.name.match('userProfile')) {
                    window.events.$emit('user-comment-updated',{
                        updatedComment,
                        action,
                        postId:this.postId
                    })
                }
            },
            nodeHasParent(node) {
                return !!node.comment_id
            },
            addNode(node) {

                if( ! this.nodeHasParent(node)) this.addToCommentsTree(node)

                else this.findReplyParent(node,this.pushNodeToCommentReplies)

                this.showCommentActionSuccessMessage('added')

                this.updateCommentOnOtherActiveTrees(node,'added')

                this.incrementCommentsCount()
            },
            deleteNode(node) {
                
                const nodeIsFirstElementOfTheTree = this.commentsTree[0].id === node.id
                
                if( ! this.nodeHasParent(node)) this.deleteFromCommentsTree(node)

                else this.findReplyParent(node,this.removeNodeFromCommentReplies)

                this.showCommentActionSuccessMessage('deleted')
                
                this.updateCommentOnOtherActiveTrees(node,'deleted')

                this.decrementCommentsCount(node)
                
                // thread has been deleted so we have to go back to parent comments
                if(nodeIsFirstElementOfTheTree && this.isSingleThread) this.showParentComments(node)
            },
            replaceNode(node) {

                if( ! this.nodeHasParent(node)) this.replaceOnCommentsTree(node)

                else this.findReplyParent(node,this.replaceCommentReply)

                this.showCommentActionSuccessMessage('edited')

                this.updateCommentOnOtherActiveTrees(node,'edited')
            },
            addToCommentsTree(comment) {
                this.commentsTree = [
                    ...this.commentsTree,
                    comment
                ]
            },
            deleteFromCommentsTree(commentToDelete) {
                this.commentsTree = this.commentsTree.filter(comment => comment.id !== commentToDelete.id )
            },
            replaceOnCommentsTree(editedComment) {
                const editedCommentIndex = this.commentsTree.findIndex( comment => comment.id === editedComment.id)
                
                this.commentsTree.splice(editedCommentIndex,1,editedComment)
            },
            findReplyParent(reply,action) {

                const finder = (comment) => {

                    if(comment.id === reply.comment_id) {
                        action(comment,reply)
                        return
                    }

                    comment.replies && comment.replies.forEach(finder)
                }

                this.commentsTree.forEach(finder)
            },
            pushNodeToCommentReplies(comment,node) {
                comment.replies.push(node)
            },
            removeNodeFromCommentReplies(comment,node) {
                const nodeIndex = comment.replies.findIndex(reply => reply.id === node.id)
                comment.replies.splice(nodeIndex,1)
            },
            replaceCommentReply(comment,newReply) {
                const replyIndex = comment.replies.findIndex(reply => reply.id === newReply.id)
                comment.replies.splice(replyIndex,1,newReply)
            },
            showCommentActionSuccessMessage(action) {
                __showSuccessMessage(`comment successfully ${action}`)
            },
            setThreadId() {
                this.threadId = this.$route.params.threadId
            },
            getCommentsTree() {

                this.loading = true

                this.commentsTree = []

                if(this.isSingleThread) {
                    this.setThreadId()
                    this.fetchSingleThread().then(() => this.loading = false)
                    return
                }
                
                this.fetchComments().then(() => this.loading = false)
            },
            async fetchComments() {
                
                this.clearFeedback()

                await axios.get(`/posts/${this.postId}/comments`)
                    .then( ({ data }) => {
                        this.commentsTree = data
                    })
                    .catch( ({ response }) => {

                        if(response.status === 404) {
                            this.feedback.status = 'empty'
                            this.feedback.message = 'No Comments Yet <br> Be the first to share what you think'
                            return
                        }

                        this.setSomethingWentWrongFeedback()
                    })
            },
            async fetchSingleThread() {
                
                this.clearFeedback()

                await axios.get(`/comments/${this.threadId}`)
                    .then(({ data }) => {
                        this.commentsTree = [data]
                    })
                    .catch( ({ response }) => {

                        if(response.status === 404) {
                            this.feedback.status = 'empty'
                            this.feedback.message = 'Thread not found'
                            return
                        }

                        this.setSomethingWentWrongFeedback()
                    })
            },
            setSomethingWentWrongFeedback() {
                this.feedback.status = 'error'
                this.feedback.message = "For some reason reddit couldn't be reached"
            },
            clearFeedback() {
                this.feedback = {
                    status: '',
                    message: ''
                };
            },
            showAllComments() {
                this.$router.push({name: this.$route.meta.threadRouteName})
            },
            showParentComments(comment = null) {

                const node = comment ? comment : this.commentsTree[0]

                if( !node || ! node.comment_id) {
                    this.showAllComments()
                    return
                }

                let rouetParams = this.$route.params

                rouetParams.threadId = Hashids.encode(node.comment_id)

                this.$router.push({
                    name: this.$route.meta.singleThreadRouteName,
                    rouetParams,
                })
            }
        }
    }
</script>

<style scoped>
    
    .leave-comment {
        margin: 20px 0 70px 48px;
    }

    .leave-comment h6 {
        font-size: 16px;
        font-weight: 500;
        color:gray;
    }
       
    .leave-comment >>> .auth-buttons a {
        padding: 6px 12px;
    }
    
    .no-results {
        height:200px;
        font-size: 16px;
        color:#606060;
    }

    .no-results .error {
        padding: 48px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .no-results img {
        height: 55px;
        margin: 0 auto;
        width: auto;
    }

    i {
        color: #A5A4A4;
        font-size: 27px;
    }

    .show-comments {
        margin-top: 48px;
        margin-left: 24px;
        padding-left: 8px;
    }

    .show-comments > a {
        font-size: 13px;
        font-weight: 700;
        color: #5d561b;
        font-weight:bold;
        display: block;
    }
</style>