<template>
    <div class="submit-post container my-5" v-if="!pageLoading">
        <div class="row">
            <div class="col-md-8">
                <div class="mt-3">
                    <h4>Create a post</h4>
                    <hr>
                </div>
                <search-community 
                    :base-community="baseCommunity" 
                    @communitySelected="selectCommunity"
                    @communityUnselected="unselectCommunity"
                >
                </search-community>
                <div class="submit-post-container">
                    <div class="form-tabs border-bottom">
                        <div class="tab-link" @click="postWithMedia = false" :class="{ 'active': !postWithMedia}">
                            <i class="fas fa-clipboard"></i>
                            <span>Post</span>
                        </div>
                        <div class="tab-link" @click="postWithMedia = true" :class="{ 'active': postWithMedia}">
                            <i class="fas fa-image"></i>
                            <span>Image</span>
                        </div>
                    </div>
                    <div class="form-body p-3">
                        <div class="form-group" style="position:relative">
                            <textarea 
                                v-model="title" 
                                maxlength="300" 
                                name="title" 
                                class="form-control" 
                                rows="1"
                                placeholder="Title"  
                                @input="autoInputGrow"
                                @paste="autoInputGrow"
                                @keydown.enter.prevent
                            >
                            </textarea>
                            <div class="title-length">
                                <span>{{ title ? title.length : 0 }}/300</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <VueEditor
                                v-if="!postWithMedia"
                                id="descriptionEditor" 
                                v-model="description" 
                                placeholder="Text(optional)" 
                                :editorToolbar="$getConst('CUSTOM_EDITOR_TOOLBAR')"
                            />
                            <div v-else>
                                <div class="upload-image-zone">
                                    <div v-if="!uploadingStarted" class="file btn btn-sm btn-primary" id="upload">
                                        Upload Image
                                        <input type="file" name="image" ref="image" @change="uploadImage" />
                                    </div>
                                    <div v-else>
                                        <div class="uploaded-image-container">
                                            <img v-if="uploadedImage.frontEndURL" :src="uploadedImage.frontEndURL" alt="">
                                            <loading-simulation 
                                                v-else                         
                                                type="submitPostImageUploading"
                                            >
                                            </loading-simulation>
                                        </div>
                                        <div v-show="uploadedImage.databaseURL" style="text-align: center" class="mt-2">
                                            <i class="fa fa-trash" @click="removeUploadedImage" ></i>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="uploadingStarted" class="upload-image-progress mt-2">
                                    <div class="progress bg-dark">
                                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                            aria-valuemax="100" :style="{'width': `${this.uploadingPercentage}%` }" >
                                        </div>
                                    </div>
                                    <div>
                                        <span class="font-weight-bold">
                                            {{ uploadingCompleted ? 'Uploading Completed' : 'Uploading' }} 
                                        </span>
                                    </div>
                                </div>
                            
                            </div>   
                        </div>
                        <div class="submit-button d-flex justify-content-end">
                            <button 
                                class="mr-0 btn btn-primary px-3"  
                                style="font-size: 12px;"
                                :disabled="!isSubmitPostFormValid" 
                                @click.prevent="submitPost" 
                            >
                                POST
                            </button>
                        </div>
                        <div v-if="feedback" class="d-flex justify-content-end invalid-feedback d-block font-weight-bold my-2">
                            {{ feedback }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="side-cards col-md-4 mt-5">
                <about-community
                    v-if="selectedCommunity"
                    :subreddit="selectedCommunity"
                >
                </about-community>
                <div class="reddit-posting-rules card my-4">
                    <div class="card-header text-dark" style="background-color:#F7F7F7">
                        <img 
                            :src="$getConst('images').SNOO_HAPPY"
                            width="35px" 
                            class="rounded-circle h-auto"
                        >
                        <span class="ml-2 font-weight-bold">Posting To Reddit</span>
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-unstyled pt-0">
                            <li 
                                v-for="(rule,number) in $getConst('REDDIT_POSTING_RULES')"
                                :key="number"
                                class="p-2" 
                            >
                                {{ number + 1}}.{{ rule }}                 
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import searchCommunity from './search-community'
    
    export default {
        components: {
            searchCommunity,
        },
        data() {
            return {
                pageLoading: false,
                submitting: false,
                baseCommunity: {},
                title: '',
                description: '',
                postWithMedia: false,
                uploadingPercentage: 0,
                uploadedImage: {
                    image: null,
                    frontEndURL: '',
                    databaseURL: ''
                },
                selectedCommunity: null,
                feedback: null,
            }
        },
        beforeRouteLeave (to, from, next) {

            if(this.isDraftBusy && !to.path.match('/submit')) {
                
                if(confirm('Are you sure you wanna leave without posting')) {
                    this.clearForm()
                    next()
                }

                return
            }

            next()
        },
        computed: {
            uploadingCompleted() {

                return this.uploadingPercentage === 100
            },
            uploadingStarted() {
                
                return this.uploadingPercentage > 0 
            },
            isSubmitPostFormValid() {

                if( ! this.title.trim() || ! this.selectedCommunity || this.submitting) return false

                return this.postWithMedia ? !!this.uploadedImage.databaseURL : true
            },
            isDraftBusy() {

                return !!(this.title || this.description || this.uploadedImage.image)
            },
        }, 
        watch: {
            title(newVal,oldVal) {
                this.title = this.title.replaceAll("\n",'')
            }
        },
        mounted() {
            this.getBaseCommunityIfDetected()
        },
        methods: {
            getBaseCommunityIfDetected() {
                
                const subredditName = this.$route.params.subreddit

                if(!subredditName) return
                
                this.pageLoading = true

                Axios.get(`/r/${subredditName}/get`)
                    .then( ({ data }) => {
                        this.selectedCommunity = this.baseCommunity = data
                        this.pageLoading = false
                    })
                    .catch( ({ response }) => {
                        if(response.status === 404) {
                            this.$showPageError('subreddit-not-found',response.data.message)
                        }
                    })
            },
            autoInputGrow(e) {
                let input = e.target

                // in case the user pasted new lines
                if(input.value.includes("\n")) return

                input.style.height = "5px"
                input.style.height = (input.scrollHeight)+"px"
            },
            showErrorMessageWhile(action) {
                __showSomethingWentWrongMessage(`Something went wrong while ${action}...please try again`)
            },
            selectCommunity(community) {
                this.selectedCommunity = community
            },
            unselectCommunity() {
                this.selectedCommunity = null
            },
            uploadImage(e) {
                
                const image = e.target.files[0],
                validImageTypes = ['image/jpeg','image/png']

                if(!validImageTypes.includes(image['type'])) {
                    __showSomethingWentWrongMessage('Please select a valid image')
                    return
                }
    
                const imageForm = new FormData()
                imageForm.append('image',image)    

                Axios.post('/posts/upload-image', imageForm, {
                    timeout: 1000 * 30,
                    onUploadProgress:(progressEvent) => {
                        this.uploadingPercentage = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
                    }
                })
                    .then( ({ data }) => {
                        this.uploadedImage.databaseURL = data.imageURL
                        this.uploadedImage.image = image
                        this.uploadedImage.frontEndURL = URL.createObjectURL(image)
                    })
                    .catch( () => {
                        this.clearUploadedImageData()
                        this.showErrorMessageWhile('uploading')
                    })
            },
            removeUploadedImage() {

                const imageDatabaseURL = this.uploadedImage.databaseURL 

                if(!imageDatabaseURL) return

                this.clearUploadedImageData()
                
                Axios.post('/posts/delete-uploaded-image',{
                    imageURL: imageDatabaseURL
                })
                    .then(() => {})
                    .catch(() => this.showErrorMessageWhile('removing'))    
            },
            clearUploadedImageData() {

                Object.keys(this.uploadedImage).forEach( key => this.uploadedImage[key] = '') 

                this.uploadingPercentage = 0
            },
            submitPost() {

                const submitPostForm = new FormData()
                
                submitPostForm.append('title',this.title)

                if(this.postWithMedia) {
                    submitPostForm.append('imageURL',this.uploadedImage.databaseURL)
                }
                
                else {

                    if(this.uploadedImage.databaseURL) this.removeUploadedImage()

                    if( ! this.$isEditorContentEmpty(this.description)) {
                        
                        this.description = this.$removeUnusedTextFromEditorContent(this.getEditor())

                        submitPostForm.append('description',this.description)
                    }
                }

                this.submitting = true

                Axios.post(`/r/${this.selectedCommunity.name}/submit`,submitPostForm)
                    .then(() => {
                        
                        __showSuccessMessage('Post created successfully')

                        setTimeout(() => {
                            window.location = `/r/${this.selectedCommunity.name}`
                        },2000)

                    })
                    .catch(({ response }) => {

                        this.submitting = false

                        if(response.status === 403) {
                            this.feedback = "you're not allowed to post here"
                            return
                        }
                        this.showErrorMessageWhile('submitting this post')
                    })

                    this.feedback = null
            },
            getEditor() {
                return $('#descriptionEditor .ql-editor')
            },
            clearForm() {

                this.title = this.description = null

                this.removeUploadedImage()
            }
        }
    }
</script>

<style scoped>

    textarea {
        resize: none;
        overflow: hidden;
        overflow-wrap: break-word;
        height: 35px;
        padding-right:55px;
        font-size: 16px;
    }

    .title-length {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .5px;
        line-height: 12px;
        text-transform: uppercase;
        bottom: 12px;
        color: grey;
        pointer-events: none;
        position: absolute;
        right: 12px;
    }


    .form-tabs {
        display: flex;
        color: gray;
        font-size: 14px;
        font-weight: 700;
    }

    .form-tabs .tab-link {
        padding: 13px 42px;
        cursor: pointer;
        border-right: 1px solid #dee2e6 !important;
    }

    .form-tabs .tab-link:hover {
       background-color: #def1fc; 
    }
    
    .form-tabs .tab-link.active {
        background-color: #def1fc;
        border-bottom: 2px solid #0079D3;
        color: #0079D3;
    }

    .form-tabs i {
        padding-right: 3px;
    }

    #upload {
        position: relative;
        overflow: hidden;
    }

    input[type="file"] {
        cursor: pointer;
        position: absolute;
        font-size: 50px;
        opacity: 0;
        right: 0;
        top: 0;
    }

    .submit-post-container {
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 0.25rem;
        background-color: #fff;

    }

    .uploaded-image-container {
        height: 100px;
        width: 100px;
        border: 2px solid grey;
        box-sizing: border-box;
        border-radius: 4px;
    }

    .uploaded-image-container img {
        max-width: 100%;
        max-height: 100%;
        height: 84px;
        width: 84px;
        margin:6px;
        border-radius: 4px;
    }

    .upload-image-zone {
        height: 200px;
        background-color: #fff;
        background-clip: border-box;
        border-style: dashed;
        border-color: #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .upload-image-zone i {
        cursor: pointer;
    }
</style>