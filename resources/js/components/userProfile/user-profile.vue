<template>
    <div class="user-profile container-fluid mt-1" v-if="!pageLoading">
        <div class="row justify-content-center bg-white mb-4">
            <the-user-profile-nav @set-filter="setFilter"></the-user-profile-nav>
            <div class="col-md-3"></div>
        </div>
        <div class="row justify-content-center">
            <user-activities :user="user" ref="userActivities"></user-activities>
            <div class="col-md-3">
                <the-user-profile-card :user="user" :subscriptions="user.subscriptions"></the-user-profile-card>
             </div>
        </div>
    </div>    
</template>

<script>
    import TheUserProfileNav from './the-user-profile-nav'
    import TheUserProfileCard from './the-user-profile-card'
    import UserActivities from './user-activities'

    export default {
        components: {
            TheUserProfileNav,
            TheUserProfileCard,
            UserActivities,
        },
        data() {
            return {
                user: {},
                currentUsername:'',
                pageLoading: true,
            }
        },
        mounted() {

            if(!this.isUserActivitiesFilterValid()){
                this.$showPageError('page-not-found')
                return
            } 
            
            this.getTheUser()
        },
        watch: {
            currentUsername(newVal,oldVal) {
                this.getTheUser()
            },
            $route(to,from) {
                if(to.params.username) this.setUsername()
            }
        },
        methods: {
            setFilter(filter) {
                this.$refs.userActivities.setFilter(filter)
            },
            setUsername() {
                this.currentUsername = this.$route.params.username
            },    
            isUserActivitiesFilterValid() {
                let currentFilter = this.$route.params.filter,
                    validFilters = [undefined,'posts','comments','upvoted','downvoted']
                
                return validFilters.includes(currentFilter)
            },
            getTheUser() {
                this.pageLoading = true

                this.setUsername()

                if(!this.currentUsername) return

                Axios.get(`/user/${this.currentUsername}/getUser`)
                    .then( ({ data }) => {
                        
                        this.user = data
 
                        this.sendCurrentUserToPageObserver(data)    
                        
                        this.pageLoading = false
                    })
                    .catch( ({ response }) => {
                        
                        if(response.status === 404) {
                            this.$showPageError('user-not-found', response.data.message)
                        }

                    })
            },
            sendCurrentUserToPageObserver(user) {
                __sendEntityToPageObserver(user)
            },
        }             
    }
</script>

<style>
    
</style>