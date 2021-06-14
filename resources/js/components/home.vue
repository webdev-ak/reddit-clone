<template>
    <div class="container-fluid py-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <the-create-post-input v-if="authenticated"></the-create-post-input>
                <posts 
                    v-if="postsDataPath" 
                    :posts-data-path="postsDataPath"
                    :key="postsDataPath"
                >
                </posts>
            </div>
            <div class="home-side-cards">
                <trending-communities-card></trending-communities-card>    
                <div class="front-page-card card mt-4">
                    <div class="card-header mb-3">
                        <div class="d-flex">
                            <div class="mt-2">
                                <img :src="$getConst('images').REDDIT_ALIEN" alt="">
                            </div>
                            <div class="text mt-4">Home</div>
                        </div>
                    </div>
                    <div class="card-body mt-5 pt-0">
                        <div class="card-text">
                            Your personal Reddit frontpage. Come here to check in with your favorite communities
                        </div>
                        <div class="d-block mt-3 text-white font-weight-bold">
                            <button @click="createPost()" class="btn btn-primary btn-block">CREATE POST</button>
                            <button @click="createCommunity()" class="btn btn-primary btn-block" >CREATE COMMUNITY</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import TheCreatePostInput from './the-create-post-input'
    import trendingCommunitiesCard from './trending-communities-card'
    import Posts from './posts'

    export default {
        components: {
            Posts,
            TheCreatePostInput,
            trendingCommunitiesCard
        },
        data() {
            return {
                postsDataPath: null,
            }
        },
        mounted() {
            this.setPostsDataPath()

            $(document).ready(() => {
                this.showEmailVerificationMessageIfRequested()
            })
        },
        computed: {
            authenticated() {
                return !!__auth()
            },
        },
        watch: {
            $route(to,from) {
                this.setPostsDataPath()
            }
        },
        methods: {  
            setPostsDataPath() {
                const homePostsTypes = [
                    {
                        name: 'popularPosts',
                        dataPath: '/popularPosts',
                    },
                    {
                        name: 'allPosts',
                        dataPath: '/allPosts',
                    },
                    {
                        name: 'home',
                        dataPath: __auth() ?  '/subscriptionsPosts' : '/popularPosts',
                    },
                ]

                const currentPage = homePostsTypes.find( page => this.$route.name.match(page.name))

                if(currentPage) this.postsDataPath = currentPage.dataPath
            },
            showEmailVerificationMessageIfRequested() {
                if(! this.authenticated) return

                if(this.$route.name === 'home' && this.$route.query.verified === 'true') 
                    __showSuccessMessage('Email Verification Completed')
            },
            createPost() {
                if( ! this.authenticated) {
                    __openAuth('login')
                    
                    return
                }
                this.$router.push('/submit')
            },
            createCommunity() {
                if(! this.authenticated) {
                    __openAuth('login')
                    return
                }
                this.$router.push({ name: 'createCommunity' })
            }
        }
    }
</script>

<style scoped>

    .home-side-cards .card{
        width: 305px;
    }
    
    .home-side-cards{
        padding: 0 15px;
    }

    .home-side-cards .front-page-card .card-header {
        height:40px;
        background-color: #FF4301 
    }

    .front-page-card .card-header img {
        border-radius: 0.8em;
        width: 60px;
        height: 75px;
    }

    .front-page-card .card-header .text {
        color: #343a40;
        font-weight: bold;
        align-self: center;
        pointer-events: none;
    }

    .no-posts .link {
        top: 45%;
    }
</style>