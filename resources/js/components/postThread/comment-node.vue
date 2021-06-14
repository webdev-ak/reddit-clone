<template>
    <div class="comment-node mt-4" :class="{'highlighted': highlightComment}">
        <div class="d-flex">
            <div class="comment-vote mr-2">
                <div v-show="expanded">
                    <vote 
                        :default-votes="comment.votes" 
                        :entity-info="commentInfo" 
                        @newRank="setNewCommentRank"    
                    >
                    </vote>
                </div>
                <div class="comment-toggler" @click="expanded = !expanded">
                    <div :class="[expanded ? 'stick' : 'fa fa-plus-circle text-center mt-2' ]"></div>
                </div>
            </div>
            <div class="parent-comment d-flex flex-column w-100">
                <div class="comment-content ml-1 pt-1 h-100">
                    <div class="comment-header">
                        <router-link 
                            :to="`/user/${comment.AuthorUsername}`" 
                            class="username dark-link"
                            :class="{'font-weight-bold': commenterIsPostAuthor }"
                        >
                            {{ comment.AuthorUsername }}
                        </router-link>
                        <i v-if="commenterIsPostAuthor" class="fas fa-microphone"></i>
                        <span class="comment-details">
                            {{ commentRank }} {{ 'point' | pluralize(commentRank) }} • {{ comment.created_at | moment("from","now") }}
                        </span>
                    </div>
                    <div class="comment-body" v-show="expanded">
                        <div class="commentContent ql-snow">
                            <div v-html="comment.content" class="ql-editor"></div>
                        </div>
                        <div class="list-inline mt-1">
                            <a class="list-inline-item" @click.stop="commentActionsManager('reply')">
                                <i class="fas fa-comment-alt"></i> Reply
                            </a>
                            <a v-if="commentOwner" class="list-inline-item" @click.stop="commentActionsManager('delete')">
                                Delete
                            </a>
                            <a v-if="commentOwner" class="list-inline-item" @click.stop="commentActionsManager('edit')">
                                Edit
                            </a>
                        </div>
                        <comment-manager
                            v-if="currentCommentAction"
                            :comment-action="currentCommentAction"
                            @nodeAdded="(node) => $emit('nodeAdded',node)"
                            @nodeDeleted="(node) => $emit('nodeDeleted',node)"
                            @nodeEdited="(node) => $emit('nodeEdited',node)"
                            @resetCommentManager="resetCommentManager"
                        >
                        </comment-manager>
                    </div>
                    <div class="continue-thread" v-show="threadToBeContinued">
                        <a href="#" @click.prevent="continueThread">continue this thread</a>
                        <i class="fa fa-arrow-right" aria-hidden="true"></i>
                    </div>
                </div>
                <div v-show="canShowChildren">
                    <comment-node
                        v-for="reply in replies"
                        :key="reply.id"
                        :comment="reply"
                        :depth="depth + 1"
                        @nodeAdded="(node) => $emit('nodeAdded',node)"
                        @nodeDeleted="(node) => $emit('nodeDeleted',node)"
                        @nodeEdited="(node) => $emit('nodeEdited',node)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CommentManager from './comment-manager'
    import Vote from '../vote'

    export default {
        name: "comment-node",
        components: {
            CommentManager,
            Vote
        },
        props: {
            comment: Object,
            depth: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                commentInfo: {},
                commentRank: this.comment.rank,
                user: __auth(),
                expanded: true,
                currentCommentAction:null,
            }
        },
        created() {
            this.setUpCommentInfo()
        },
        computed: {
            threadToBeContinued() {
                return this.depth === this.$getConst('COMMENTS_DEPTH') && this.commentHasChildren
            },
            commentHasChildren() {
                return this.replies.length > 0
            },
            canShowChildren() {

                return this.depth >= this.$getConst('COMMENTS_DEPTH') ? false : this.expanded
            },
            commenterIsPostAuthor() {
                return this.comment.AuthorUsername === this.comment.postAuthorUsername
            },
            highlightComment() {
                return this.comment.id === this.$route.params.commentToHighlightId
            },
            commentOwner() {
                return this.user && this.comment.user_id === this.user.id
            },
            replies() {
                return this.comment.replies
            }
        },
        methods: {
            setUpCommentInfo() {
                this.commentInfo = {
                    id: this.comment.id,
                    type: "Comment",
                    path: this.$route.fullPath
                }
            },
            resetCommentManager() {
                this.currentCommentAction = null
            },
            commentActionsManager(actionType) {

                if( ! this.user) {
                    __openAuth('login')
                    return
                }

                if(this.currentCommentAction && this.currentCommentAction.type === actionType) {
                    this.resetCommentManager()
                    return
                }

                this.currentCommentAction = {
                    type: actionType,
                    node: this.comment,
                    postId: this.comment.post_id
                }    
            },
            setNewCommentRank(newRank) {
                this.commentRank = newRank
            },
            continueThread(e) {
                this.$router.push({
                    name: this.$route.meta.singleThreadRouteName,
                    params: {
                        threadId: Hashids.encode(this.comment.id)
                    },
                })
            }
        }
    }
</script>

<style scoped>

    .highlighted {
        background-color: #F2F5F8;
        border-radius: 2px;
    }

    .comment-vote {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 21px;
    }

    .comment-header i {
        color: #24a0ed;
        margin-right: 2px;
        margin-left: 1px;

    }

    .comment-toggler {
        width: inherit;
        height: 100%;
        display: flex;
        justify-content: center;
        cursor: pointer;
        color: #3f9ae5;
    }
    
    a.username {
        font-weight: 450;
    }

    .stick {
        border: 1px solid #EDEFF1;
        width: 2px;
        height: 100%;
    
    }

    .comment-toggler:hover > .stick  {
        border: 1px solid #3f9ae5;
    }

    .list-inline > a {
        text-decoration: none;
        font-size: 12px;
        font-weight: 600;
        color:#878A8C ;
    }

    .list-inline > i {
        font-size: 12px;
    }

    .list-inline > a:hover {
        cursor: pointer;
        background-color: #EFEFED;
    }

    span.comment-details {
        font-size: 12px;
        color: #6c757d !important;
        font-weight: 300 !important
    }

    .continue-thread {
        margin-top:10px;
    }

    .continue-thread a {
        font-weight: 680;
    }

    .continue-thread i {
        color:#3490dc;
    }
</style>
