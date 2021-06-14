<template>
    <div class="create-community">
        <form-helper slot="form" class="create-community-form">
            <h1 slot="form-header">Create New Community</h1>
            <div slot="form-inputs">
                <div class="form-group">
                    <input type="text" placeholder="name" v-model="communityForm.name">
                    <field-feedback v-if="errors.name" :feedback="errors.name" />                    
                </div>
                <div class="form-group">
                    <input type="text" placeholder="title" v-model="communityForm.title">
                    <field-feedback v-if="errors.title" :feedback="errors.title" />                    
                </div>
                <div class="form-group">
                    <textarea   
                        rows="3" 
                        placeholder="description" 
                        v-model="communityForm.description" 
                    >
                    </textarea>
                    <field-feedback v-if="errors.description" :feedback="errors.description" />                    
                </div>
                <div class="form-group community-types">
                    <span class="font-weight-bold text-muted">COMMUNITY TYPE</span>
                    <div 
                        v-for="type in communityTypes" 
                        :key="type.name"
                        class="type" 
                    >
                        <div>
                            <input 
                                type="radio" 
                                v-model="communityForm.privacy" 
                                :value="type.name" 
                                :id="type.name"
                                name="privacy" 
                                class="mt-1"    
                            >
                        </div>
                        <div class="type-icon" v-html="type.icon"></div>
                        <div>
                            <span class="font-weight-bold">{{ type.name | capitalizeFirstLetter }}</span>
                            <span class="description">{{ type.description }}</span>
                        </div>
                    </div>
                    <field-feedback v-if="errors.privacy" :feedback="errors.privacy" />                    
                </div>
            </div>
            <div slot="form-submit-button">
                <button type="button" @click="createCommunity()" class="btn btn-primary" :disabled="!isCreateCommunityFormValid">
                   CREATE
                </button>
            </div>
        </form-helper>
    </div>
</template>

<script>
    const COMMUNITY_TYPES = [
        {
            name: 'public',
            description: 'Anyone can view, post, and comment to this community',
            icon: '<i class="fa fa-lock"></i>'
        },
        {
            name: 'restricted',
            description: 'Anyone can view this community, but only approved users can post',
            icon: '<i class="fas fa-eye"></i>'
        },
        {
            name: 'private',
            description: 'Only approved users can view and submit to this community',
            icon: '<i class="fas fa-key"></i> '
        }
    ];

    export default {
        data() {
            return {
                communityForm: {
                    title: '',
                    name: '',
                    description: '',
                    privacy: '',
                },
                formSubmitting: false,
                communityTypes: COMMUNITY_TYPES,
                errors: {},
                loading: false
            }
        },
        computed: {
            isCreateCommunityFormValid() {
                return this.$checkIfAllAttributesAreFilled('communityForm') && !this.formSubmitting
            }
        },
        methods: {
            clearForm() {
                this.$clearObjectAttributes('communityForm')
                this.clearFormErrors()
            },
            clearFormErrors() {
                this.errors = {}
            },
            createCommunity() {
                this.loading = true
                this.formSubmitting = true

                Axios.post('/r',this.communityForm)
                   .then( ({ data }) => {
                        this.loading = false

                        __showSuccessMessage(`r/${this.communityForm.name} has been created successfully`)   

                        setTimeout(() => {
                            __hideModalById('communityModal')

                            window.location = data.subredditPath
                            
                            this.clearForm()
                        },1500)
                   })
                   .catch( ({ response }) => {
                        this.loading = false
                        this.formSubmitting = false

                        if(response.status === 422) {
                            this.errors = response.data.errors
                            return
                        }
                        __showSomethingWentWrongMessage()
                   })

                this.clearFormErrors()
            }
        },
    }
</script>

<style scoped>
    .create-community {
        display: flex;
        width: 100%;
        min-height: 100%;
    }
    
    .create-community-form >>> .art {
        background-image: url('/storage/img/snoo-maze.png');
    }

    .type-icon {
        margin: 0 13px;
        text-align: center;
        font-size:14px;
        width: 15px;
        height: 15px;
    }

    .community-types {
        margin: 27px 0;
    }

    .community-types .type {
        display: flex;
        margin-top: 8px;
    }

    .community-types .description {
        font-size: 13px;
        font-weight: 400;
        line-height: 16px;
        color: gray;
    }
    
    input[type='radio']:after {
        width: 20px;
        height: 20px;
        border-radius: 15px;
        top: -2px;
        left: -1px;
        position: relative;
        background-color: #d1d3d1;
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid white;
    }
    
    input[type='radio']:checked:after {
        width: 20px;
        height: 20px;
        border-radius: 15px;
        top: -2px;
        left: -1px;
        position: relative;
        background-color: #ffa500;
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid white;
    }

</style>