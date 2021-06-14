<template>
    <div class="card user-card">
        <div class="card-header bg-primary text-white" style="height:100px;">
            <div class="profile-image-container">
                <img
                    v-show="!imageLoading && !imageError"  
                    :src="user.imagePath" 
                    @error="setImageAsFailedToLoad()"
                    @load="deactivateImageLoading()"
                >
                <loading-simulation
                    v-if="imageLoading"
                    type="profileImageLoading"
                >
                </loading-simulation> 
                <div v-if="imageError" class="bg-white text-center text-muted pt-3 h-100">
                    Image failed to load
                </div>
                <div 
                    v-if="profileOwner && !imageLoading" 
                    @click="updateProfileImage" 
                    class="edit-image text-center"
                >
                    <i class="fas fa-pencil-alt pt-2 rounded-circle border border-primary"></i>
                    <input type="file" class="d-none" name="image" id="image" @change="submitNewImage">
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="user-infos">
                <div class="mt-1">u/{{ user.username }}</div>
                <div class="mt-2">
                    <div class="font-weight-bold">Cake day</div>
                    <div class="birthdate">
                        <i class="fas fa-birthday-cake"></i>
                        <span>{{ user.birthdate }}</span>
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <follow-button
                    entity-type="profile"
                    :entity-id="user.id"
                    :initial-subscriptions="subscriptions"
                    class="btn-block"
                >
                </follow-button>
            </div>
        </div>
        <manage-image-modal
            modal-id="updateProfileImageMenu" 
            entity-name="Profile"
            @uploadNewImage="uploadNewImage"  
            @deleteEntitytImage="deleteProfileImage"     
        >
        </manage-image-modal>
    </div>
</template>


<script>
    import manageImageModal from '../helpers/manage-image-modal'

    export default {
        components: {
            manageImageModal
        },
        props: {
            user: {
                type: Object,
                required: true
            },
            subscriptions: {
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
            profileOwner() {
                if(!__auth()) return false

                return this.user.id === __auth().id
            },
            userHasDefaultImage() {
                return this.user && this.user.hasDefaultImage
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
            deactivateImageLoading() {
                this.imageLoading = false
            },
            activateImageLoading() {
                this.imageLoading = true
            },
            clearImageInputFile() {
                document.getElementById('image').value = ""
            },
            submitNewImage(e) {
                this.hidewUpdateImageMenu()

                let form = new FormData()
                
                const image = e.target.files[0],
                validImageTypes = ['image/jpeg','image/png']

                if(!validImageTypes.includes(image['type'])) {
                    __showSomethingWentWrongMessage('Please select a valid image')
                    
                    this.clearImageInputFile()
                    
                    return
                }

                form.append('image',image)

                this.activateImageLoading()
                this.imageError = false

                axios.post(`/user/${this.user.username}/update-profile-image`, form)
                    .then( ({ data }) => {

                        this.updateImagePath(data.imagePath)

                        this.deactivateImageLoading()

                        this.user.hasDefaultImage = false

                        this.showImageUpdatedSuccessMessage('updated')

                    })
                    .catch( () => {
                        this.deactivateImageLoading()
                       __showSomethingWentWrongMessage()
                    })
            },
            deleteProfileImage() {

                this.hidewUpdateImageMenu()
                
                if(this.userHasDefaultImage) return

                this.activateImageLoading()
                
                Axios.delete(`/user/${this.user.username}/delete-profile-image`)
                    .then( ({ data }) => {

                        this.updateImagePath(data.imagePath)

                        this.user.hasDefaultImage = true

                        this.activateImageLoading()

                        this.showImageUpdatedSuccessMessage('deleted')
                    })
                    .catch(() => {
                        this.deactivateImageLoading()
                        __showSomethingWentWrongMessage()
                    })
            },
            showImageUpdatedSuccessMessage(action) {
                __showSuccessMessage(`Profile image has been ${action} successfully`)
            },
            updateImagePath(newPath) {
                this.user.imagePath = newPath

                __updateUserProp({
                    prop: 'imagePath',
                    value: newPath
                })
            },
            updateProfileImage() {

                if(this.userHasDefaultImage || this.imageError) {
                    this.uploadNewImage()
                    return
                }

                this.showUpdateImageMenu()
            },
            showUpdateImageMenu() {
                __showModalById('updateProfileImageMenu')
            },
            hidewUpdateImageMenu() {
                __hideModalById('updateProfileImageMenu')
            },
        }
    }
</script>

<style scoped>

    .profile-image-container {
        margin-top: 24px;
        width:87px; 
        height:87px;
        border: 3px solid #fff !important;
        border-radius: 0.8em;
    }

    .profile-image-container img {
        max-width: 100%;
        max-height: 100%;
        border-radius: 0.7em;
    }

    .user-infos {
        pointer-events: none;
    }

    .user-infos .birthdate i {
        color: #3f9ae5;
    }
    
    .user-infos .birthdate span {
        font-size: 13px; 
        font-weight: 400 ;
        line-height: 16px;
        color:#606060;
    }
    
    .edit-image i {
        cursor: pointer;
        width: 28px;
        height: 28px;
        background-color: white;
        position: relative;
        left: 35px;
        top: -20px;
        color: #1d68a7;
        font-size: 15px;
    }
</style>