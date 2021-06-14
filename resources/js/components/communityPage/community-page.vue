<template>
   <div class="community-page container-fluid pb-5" v-if="subreddit">
        <community-page-header :subreddit="subreddit"></community-page-header>
        <div class="row justify-content-center pt-5">
            <div class="col-md-6">
                <the-create-post-input 
                    v-if="isUserAllowedToCreatePost"
                    :submit-post-url="submitPostUrl"
                >
                </the-create-post-input>
                <posts 
                    v-if="postsDataPath" 
                    :posts-data-path="postsDataPath"
                    :key="postsDataPath"
                >
                </posts>
            </div>
            <div class="col-md-3">
                <about-community :subreddit="subreddit"></about-community>
                <div class="moderator card mt-4">
                    <div class="card-header bg-primary text-white ">
                        Moderator
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-unstyled pt-0">
                            <li class="mb-1">
                                <router-link :to="`/user/${subredditModeratorUsername}`">
                                    u/{{ subredditModeratorUsername }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>    

<script>
    import CommunityPageHeader from './community-page-header'
    import AboutCommunity from '../about-community'
    import Posts from '../posts'
    import TheCreatePostInput from '../the-create-post-input'

    export default {
        components: {
            CommunityPageHeader,
            AboutCommunity,
            Posts,
            TheCreatePostInput
        },
        data() {
            return {
                subreddit: null,
                postsDataPath: null,
            }
        },
        mounted() {
            this.getTheSubreddit()
            this.setPostsDataPath()
        },
        watch: {
            $route(to,from) {
                if(to.params.subreddit !== from.params.subreddit) {
                    this.getTheSubreddit()
                    this.setPostsDataPath()
                }
            }
        },
        computed: {
            submitPostUrl() {
                return `/r/${this.subreddit.name}/submit`
            },
            subredditModeratorUsername() {
                return this.subreddit.moderator.username
            },
            isUserAllowedToCreatePost() {

                if(!__auth()) return false

                if(this.subreddit.privacy === 'public') return true

                return this.isAuthUserModeratorOfSubreddit || this.isAuthUserSubscribedToSubreddit
                
            },
            isAuthUserModeratorOfSubreddit() {
                
                if(!__auth()) return false

                return __auth().username === this.subredditModeratorUsername
            },
            isAuthUserSubscribedToSubreddit() {
                
                if(!__auth()) return false

                return !!this.subreddit.subscriptions.find(subscription => subscription.user_id === __auth().id)
            }
        },
        methods: {
            setPostsDataPath() {
                this.postsDataPath = `/r/${this.$route.params.subreddit}/posts`
            },
            getTheSubreddit() {
                
                this.subreddit = null

                const subredditName = this.$route.params.subreddit

                Axios.get(`/r/${subredditName}/get`)
                    .then( ({ data }) => {
                        this.subreddit = data

                        this.sendCurrentCommunityToPageObserver(data)    
                    })
                    .catch( ({ response }) => {
                        
                        if(response.status === 404) {
                            this.$showPageError('subreddit-not-found',response.data.message)
                        }
                        
                        if(response.status === 403) {
                            this.$showPageError('private-subreddit-error',response.data.message)
                        } 
                    })
            },
            sendCurrentCommunityToPageObserver(community) {
                __sendEntityToPageObserver(community)
            },
        }
    }
</script>
