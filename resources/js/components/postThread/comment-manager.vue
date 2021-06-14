<template>
    <form class="comment-manager mt-2" v-show="showEditor">
        <vueEditor 
            :id="editorId"
            :editorToolbar="$getConst('CUSTOM_EDITOR_TOOLBAR')"
            :class="{ 'editorFocused': focus }"
            v-model="content"
            placeholder="What are your thoughts ?"
            @focus="focus = true"
            @blur="focus = false"
            ref="editor"
        >
        </vueEditor>
        <div class="d-flex mt-2">
            <button 
                :disabled=" ! commentActionIsValid" 
                @click.prevent="commentManager"
                class="btn btn-sm btn-primary ml-auto" 
            >
                {{ commentAction.type | capitalizeFirstLetter }}
            </button>
        </div>
    </form>
</template>

<script>

    const ACTIONS = [
        {
            type: 'comment',
            method: 'addNewNode',
        },
        {
            type: 'reply',
            method: 'addNewNode',
        },
        {
            type: 'edit',
            method: 'editNode',
        },
    ]

    export default {
        props: {
            commentAction: {
                type: Object,
                required: true
            }
        },
        mounted() {
            this.manageAction()
        },
        watch: {
            'commentAction.type'(newType, oldType) {
                this.manageAction()
            },
        },
        data() {
            return {
                content:'',
                editorId: __uuid(),
                commenting: true,
                focus:false,
            }
        },
        computed: {
            commentActionIsValid() {

                if( this.$isEditorContentEmpty(this.content) ||  ! this.commenting) return false
                
                return this.commentAction.type === 'edit' ? this.content !== this.commentAction.node.content : true
            },
            showEditor() {
                return this.commentAction && this.commentAction.type !== 'delete'
            }
        },
        methods: {
            getEditor() {
                return $(`#${this.editorId} .ql-editor`)
            }, 
            setContent() {
                this.content = this.commentAction.type === 'edit' ? this.commentAction.node.content : ''   
            },
            commentManager(e) {

                this.deactivateCommenting()
                
                this.content = this.$removeUnusedTextFromEditorContent(this.getEditor())

                this.currentAction = ACTIONS.find(action => action.type === this.commentAction.type)

                this[this.currentAction.method]()
                    .then(() => {
                        this.reactivateCommenting()
                        this.blurEditor()
                        this.resetCommentManager()
                    })
                    .catch(() => {
                        this.reactivateCommenting()
                        __showSomethingWentWrongMessage()
                    })
            },
            manageAction() {
                
                if(this.commentAction.type === 'delete') {
                    this.deleteNode()
                    return
                }

                this.setContent()
            },
            async addNewNode() {

                await Axios.post(`/comments/${this.commentAction.postId}`, {
                    body: this.content,
                    comment_id: this.commentAction.type === 'reply' ? this.commentAction.node.id : null
                })
                    .then( ({ data }) => {

                        this.$emit('nodeAdded',data)

                        this.getEditor().empty()
                    })
            },
            async editNode() {
                await Axios.put(`/comments/${this.commentAction.node.id}`,{
                    body: this.content
                })
                    .then( ({ data }) => {
                        this.$emit('nodeEdited',data)
                    })
            },
            deleteNode() {
                if(confirm("Are you sure you wanna delete this comment")) {
                    axios.delete(`/comments/${this.commentAction.node.id}`)
                        .then(() => this.$emit('nodeDeleted',this.commentAction.node))
                        .catch(() => __showSomethingWentWrongMessage())
                }
                else this.resetCommentManager()
            },
            resetCommentManager() {
                this.$emit('resetCommentManager')
            },  
            blurEditor() {
                const editor = this.$refs.editor

                if(editor) editor.quill.blur()
            },
            deactivateCommenting() {
                this.commenting = false
            },
            reactivateCommenting() {
                this.commenting = true
            },
        }
    }
</script>

<style scoped>
    .quillWrapper {
        border: 1px solid transparent;
    }

    .editorFocused{
        border: 1px solid #000;
    }
</style>