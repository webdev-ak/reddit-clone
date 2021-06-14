<template>
    <div class="loading-simulation">
        <div v-if="simulationFor === 'postsCard'">
            <div class="posts">
                <div 
                    class="post"
                    v-for="occurrence in occurrencesNumber"
                    :key="occurrence"
                >
                    <div class="vote">
                        <i class="fas fa-caret-up"></i>
                        <i class="fas fa-square py-2"  style="font-size: 10px;"></i>
                        <i class="fas fa-caret-down"></i>
                    </div>
                    <div class="post-content w-100">
                        <vue-content-loading :width="70" :height="48">
                            <rect x="2" y="1" rx="0.4" ry="0.4" width="30%" height="4%" />
                            <rect x="0" y="5" rx="0.4" ry="0.4" width="50%" height="5%" />
                            <rect x="0" y="9" rx="0.4" ry="0.4" width="100%" height="77%" />
                        </vue-content-loading>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="simulationFor === 'postImage'">
            <div class="w-100">
                <vue-content-loading :width="70" :height="40">
                    <rect x="0" y="0" rx="0.4" ry="0.4" width="100%" height="100%" />
                </vue-content-loading>
            </div>
        </div>

        <div v-if="simulationFor === 'postsClassic'">
            <div class="posts">
                <div 
                    class="post mb-0"
                    v-for="occurrence in occurrencesNumber"
                    :key="occurrence"
                >
                    <div class="vote pt-0">
                        <i class="fas fa-caret-up"></i>
                        <i style="font-size: 10px;" class="fas fa-square py-2"></i>
                        <i class="fas fa-caret-down"></i>
                    </div>
                    <div class="post-content d-flex">
                        <div style="height:60;width:80px;">
                            <vue-content-loading :width="100" :height="100">
                                <rect x="1" y="1" rx="0.6" ry="0.6" width="100%" height="80%" />
                            </vue-content-loading>
                        </div>
                        <div class="px-1 pt-1 w-100" style="height:40px;">
                            <vue-content-loading :width="70" :height="9">
                                <rect x="1" y="0" rx="0.6" ry="0.6" width="45%" height="10%" />
                                <rect x="1" y="2" rx="0.6" ry="0.6" width="15%" height="10%" />
                                <rect x="1" y="4" rx="0.6" ry="0.6" width="10%" height="10%" />
                            </vue-content-loading>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-if="simulationFor === 'userActivitiesComments'">
            <div class="commented-posts bg-white">
                <div 
                    class="post-header w-100"
                    v-for="occurrence in occurrencesNumber"
                    :key="occurrence"
                >
                    <i class="fas fa-comment-alt"></i>
                    <div class="w-100 px-2 pt-2">
                        <vue-content-loading :width="70" :height="2">
                            <rect x="0" y="0" rx="0.2" ry="0.2" width="8%" height="50%" />
                            <rect x="7" y="0" rx="0.2" ry="0.2" width="88%" height="50%" />
                        </vue-content-loading>
                    </div>
                </div>    
            </div>    
        </div>
        
        <div v-if="simulationFor === 'commentsTree'">
            <div
                class="d-flex w-100"
                v-for="occurrence in occurrencesNumber"
                :key="occurrence"
            >
                <div class="d-flex mt-5 pr-3 flex-column align-items-center" style="font-size: 27px;">
                    <i class="fas fa-caret-up"></i>
                    <i class="fas fa-caret-down"></i>
                </div>
                <div class="px-1 pt-1 mb-2 w-100">
                    <vue-content-loading :width="100" :height="22" :speed="4">
                        <rect x="0" y="5" rx="0.4" ry="0.4" width="30%" height="2" />
                        <rect x="0" y="9" rx="0.4" ry="0.4" width="100%" height="14" />
                    </vue-content-loading>
                </div>
            </div>
        </div>

        <div v-if="simulationFor === 'communitiesList'">
            <div class="w-100">
                <div
                    v-for="occurrence in occurrencesNumber"
                    :key="occurrence"
                    class="pb-1"
                >
                    <vue-content-loading :width="70" :height="4">
                        <rect x="2" y="0" rx="0.2" ry="0.2" width="95%" height="88%" />
                    </vue-content-loading>
                </div>    
            </div>
        </div>

        <div v-if="simulationFor === 'trendingCommunitiesCard'">
            <div class="mb-3">  
                <vue-content-loading :width="80" :height="8">
                    <rect x="1" y="0" rx="0.2" ry="0.2" width="50" height="4" />
                </vue-content-loading>
            </div>
            <div 
                v-for="occurrence in occurrencesNumber" 
                :key="occurrence" 
                class="community d-flex"
            >
                <div class="w-75">
                    <vue-content-loading :width="250" :height="61">
                        <circle cx="20" cy="20" r="20" />
                        <rect x="50" y="3" rx="4" ry="4" width="80" height="11" />
                        <rect x="50" y="25" rx="4" ry="4" width="45" height="8" />
                    </vue-content-loading>
                </div>
                <div class="w-25">
                    <vue-content-loading :width="120" :height="60">
                        <rect x="1" y="8" rx="0.2" ry="0.2" width="120" height="30" />
                    </vue-content-loading>
                </div>
            </div>    
        </div>
        
        <div v-if="simulationFor === 'user-notifications'">
            <div 
                v-for="occurrence in occurrencesNumber" 
                :key="occurrence" 
                class="d-flex border-bottom"
            >
                <div class="w-100 p-3">
                    <vue-content-loading :width="250" :height="34">
                        <circle cx="14" cy="14" r="14" />
                        <rect x="44" y="3" rx="4" ry="4" width="100" height="10" />
                        <rect x="44" y="22" rx="4" ry="4" width="45" height="8" />
                    </vue-content-loading>
                </div>
            </div>    
        </div>
        
        <div v-if="simulationFor === 'submitPostImageUploading'">
            <div class="w-100 p-2">
                <vue-content-loading :width="84" :height="84">
                    <rect x="0" y="0" rx="0.2" ry="0.2" width="100%" height="100%" />
                </vue-content-loading>
            </div>
        </div>
          
        <div v-if="simulationFor === 'profileImageLoading'" style="border-radius: 0.7em;">
            <div class="w-100">
                <vue-content-loading :width="87" :height="87" :speed="1">
                    <rect x="0" y="0" width="100" height="100" />
                </vue-content-loading>
            </div>
        </div>
        
        <div v-if="simulationFor === 'subredditImageUpdating'">
            <div class="w-100">
                <vue-content-loading :width="80" :height="80" :speed="1">
                     <circle cx="40" cy="40" r="40" />
                </vue-content-loading>
            </div>
        </div>

        <div v-if="simulationFor === 'communitiesAndUsersResults'" class="bg-white pb-2">
            <div
                v-for="occurrence in occurrencesNumber"
                :key="occurrence"
                class="d-flex align-items-center"
            >
                <div class="col-md-2 pl-0">
                    <div class="d-flex">
                        <div class="pt-1" style="width: 140px;">
                            <vue-content-loading :width="100" :height="30">
                                <circle cx="13" cy="13" r="13" />
                                <rect x="38" y="1" rx="1" ry="2" width="100%" height="35%" />
                                <rect x="38" y="16" rx="1" ry="2" width="38%" height="35%" />
                            </vue-content-loading>
                        </div>
                    </div>
                </div>
                <div class="col-md-8" >
                    <vue-content-loading :width="140" :height="15">
                        <rect x="27" y="5" rx="1" ry="1" width="100%" height="15%" />
                        <rect x="27" y="9" rx="1" ry="1" width="100%" height="15%" />
                    </vue-content-loading>
                </div>
                <div class="col-md-2">
                    <vue-content-loading :width="100" :height="25">
                        <rect x="1" y="4" rx="2" ry="2" width="100%" height="100%" />
                    </vue-content-loading>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import VueContentLoading from 'vue-content-loading'

    export default {
        props: {
            type: {
                required: true,
                type: String
            },
            occurrences: {
                required: false,
                type: Number
            }
        },
        components: {
            VueContentLoading,
        },
        computed: {
            simulationFor() {
                return this.type
            },
            occurrencesNumber() {
                return this.occurrences
            }
        },
    }
</script>

<style scoped>
    
</style>