<template>
     <div class="community-page-header">
        <div class="row subreddit-background"></div>
        <div class="row bg-white">
            <div class="container">
                <div class="d-flex ml-5">
                    <div class="subreddit-image-container" @click.stop="updateSubredditImage">
                        <div v-if="subredditOwner && !imageLoading">
                            <div class="subreddit-image-overlay">
                                <img :src="$getConst('images').CAMERA">
                            </div>
                            <form>
                                <input type="file" class="d-none" @change="submitTheNewImage" name="image" id="image">
                            </form>
                        </div>
                        <img
                            v-show="!imageLoading && !imageError"  
                            :src="currentSubreddit.imagePath" 
                            :class="{'subreddit-image': subredditOwner}"
                            class="img-fluid rounded-circle"
                            @error="setImageAsFailedToLoad()"
                            @load="deactivateImageLoading()"
                        >
                        <loading-simulation 
                            v-if="imageLoading"
                            type="subredditImageUpdating"
                        >
                        </loading-simulation>
                        <div v-if="imageError" class="text-center text-muted mt-1">
                            Image failed to load
                        </div>
                    </div>
                    <div class="d-flex mt-3">
                        <div class="subreddit-info">
                            <h1>{{ currentSubreddit.title }}</h1>
                            <h2>{{ currentSubreddit.name }}</h2>
                        </div>
                        <div>
                            <follow-button
                                entity-type="subreddit"
                                :entity-id="currentSubreddit.name"
                                :initial-subscriptions="currentSubreddit.subscriptions"
                                style="width: 145px !important;"
                            >
                            </follow-button>
                        </div>
                    </div>
                </div>
             </div> 
        </div> 
        <manage-image-modal
            modal-id="updateSubredditImageMenu" 
            entity-name="Subreddit"
            @uploadNewImage="uploadNewImage"  
            @deleteEntitytImage="deleteSubredditImage"     
        >
        </manage-image-modal> 
     </div> 
</template>

<script>

import manageImageModal from '../helpers/manage-image-modal'

export default {
    components: {
        manageImageModal,
    },
    props: {
        subreddit: {
            type: Object,
            required: true
        }    
    },
    data() {
        return {
            imageLoading: true,
            imageError: false,
        }
    },
    computed: {
        subredditOwner() {

            if(!__auth()) return false

            return this.currentSubreddit.moderator.username === __auth().username
        },
        currentSubreddit() {

            return this.subreddit
        },
    },
    methods: {
        uploadNewImage() {
            document.getElementById('image').click()
        },
        setImageAsFailedToLoad() {
            this.deactivateImageLoading()
            this.imageError = true
        },
        activateImageLoading() {
            this.imageLoading = true
        },
        deactivateImageLoading() {
            this.imageLoading = false
        },
        clearImageInputFile() {
            document.getElementById('image').value = ""
        },
        submitTheNewImage(e) {
            if(this.isUpdateImageMenuActive()) this.hidewUpdateImageMenu()

            const image = e.target.files[0],
            validImageTypes = ['image/jpeg','image/png']

            if(!validImageTypes.includes(image['type'])) {
                __showSomethingWentWrongMessage('Please select a valid image')

                this.clearImageInputFile()
                
                return
            }

            let form = new FormData()
            form.append('image',image)

            this.activateImageLoading()
            this.imageError = false

            axios.post(`/r/${this.subreddit.name}/update-image`, form)
                .then(({ data }) => {

                    this.updateImagePath(data.imagePath)

                    this.subreddit.hasDefaultImage = false

                    this.deactivateImageLoading()
                    
                    this.showImageUpadatedMessage('updated')
                })
                .catch(() => {
                    this.deactivateImageLoading()
                   __showSomethingWentWrongMessage()
                })
        },
        isUpdateImageMenuActive() {
            return !!$('#updateSubredditImageMenu').hasClass('show')
        },
        deleteSubredditImage() {
            this.hidewUpdateImageMenu()

            if(this.currentSubreddit.hasDefaultImage) return

            this.activateImageLoading()

            axios.delete(`/r/${this.subreddit.name}/delete-image`)
                .then( ({ data }) => {
                    this.updateImagePath(data.imagePath)
                    
                    this.subreddit.hasDefaultImage = true

                    this.deactivateImageLoading()
                    
                    this.showImageUpadatedMessage('removed')
                })
                .catch(() => {
                    this.deactivateImageLoading()
                   __showSomethingWentWrongMessage()
                })
        },
        updateImagePath(newPath) {
            this.subreddit.imagePath = newPath
        },
        updateSubredditImage() {
            if(!this.subredditOwner || this.imageLoading) return

            if(this.currentSubreddit.hasDefaultImage || this.imageError) {
                this.uploadNewImage()
                return
            }

            this.showUpdateImageMenu()
        },
        showUpdateImageMenu() {
            __showModalById('updateSubredditImageMenu')
        },
        hidewUpdateImageMenu() {
            __hideModalById('updateSubredditImageMenu')
        },
        showImageUpadatedMessage(action) {
            __showSuccessMessage(`Subreddit image has been ${action} successfully`)
        },
    }  
}
</script>

<style scoped>

    .subreddit-info {
        margin: 0 24px;
        display: block;
    }

    .subreddit-info h1 {
        font-size: 28px;
        font-weight: 700;
        line-height: 32px;
    }

    .subreddit-info h2 {
        font-size: 14px;
        font-weight: 500;
        line-height: 18px;
        color: #7c7c7c
    }
    
    .subreddit-background {
        background-color: #3490dc;
        height: 78px;
    }
    
    .subreddit-image-container{
        width: 80px;
        height: 80px;
        margin-top:-20px;
        border-radius: 50%;
        background-color: white;
        position: relative;
        cursor: pointer;
    }

    .subreddit-image-container:hover .subreddit-image {
        opacity: 0.2;
    }
    
    .subreddit-image-container:hover .subreddit-image-overlay {
        opacity: 1;
    }

    .subreddit-image-overlay {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        position: absolute;
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
        
</style>