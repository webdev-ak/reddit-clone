<template>
    <div>
        <sorting-bar @sort-items="sortPosts"></sorting-bar>
        
        <div v-show="!dataIsSorting" class="posts">
            <post-card
                v-for="post in sortedPosts"
                :key="post.id"
                :post="post"
                @click.native="showPost(post)"
            >
            </post-card>
        </div>
        
        <div v-if="dataIsLoading || dataIsSorting">
            <loading-simulation
                type="postsCard"
                :occurrences="$getConst('POSTS_PER_PAGE_NUMBER')"
            >
            </loading-simulation>
        </div>
        
        <div v-if="loadedDataIsEmpty">
            <empty-results v-if="feedback" :message="feedback.message">    
                <button 
                    v-show="feedback.status === 'error'"
                    slot="button"
                    @click="preparePostsFetching"
                >
                    retry
                </button>
                <router-link 
                    v-show="feedback.status === 'no subscriptions found'"
                    :to="{name: 'popularPosts'}" 
                    slot="button"
                >
                    BROWSE POPULAR POSTS
                </router-link>
            </empty-results>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
    import PostCard from './post-card'
    import SortingBar from './helpers/sorting-bar'

    export default {
        components: {
            PostCard,
            SortingBar
        },
        props: {
            postsDataPath: {
                type: String,
                required: true
            }
        },
        created() {
            window.addEventListener('scroll', this.loadMorePosts)

            window.events.$on('fetchHomePosts', () => {
                this.clearSortedPostsData()
                this.preparePostsFetching()
            })

            this.preparePostsFetching()
        },
        destroyed() {
            window.removeEventListener('scroll', this.loadMorePosts)
        },
        data() {
            return {
                posts: {
                    data: []
                },
                dataIsLoading: false,
                dataIsSorting: false,
                showing:false,
                feedback: {
                    status: '',
                    message: ''
                },
            }
        },
        computed: {
            sortedPosts() {
                return this.posts.data
            },
            loadedDataIsEmpty() {
                return !this.dataIsLoading && this.sortedPosts.length === 0
            }
        },
        methods: {
            clearSortedPostsData() {
                this.posts =  {
                    data: []
                }
            },
            preparePostsFetching() {
                
                this.dataIsLoading = true

                this.fetchPosts()
                    .then(() => {
                        this.sortPosts()
                            .then(() => {
                                this.dataIsLoading = false
                            })
                    })
            },
            async fetchPosts() {
                const dataURL = this.posts.next_page_url ? this.posts.next_page_url : this.postsDataPath;

                await Axios.get(dataURL)
                    .then( ({ data }) => {
                        this.saveLoadedPosts(data)
                    })
                    .catch( ({ response }) => {
                        if(response.status === 404) {
                            this.feedback.status = response.data.status
                            this.feedback.message = response.data.message
                            return
                        }
                        this.feedback.status = 'error'
                        this.feedback.message = 'Something went wrong...'
                    })
            },
            saveLoadedPosts(posts) {
                if(posts instanceof Object) posts.data = Object.values(posts.data)

                this.posts = {
                    ...posts,
                    data: [...this.posts.data,...posts.data]
                }
            },
            showPost(post) {

                const currentRouteName = this.$route.name
                
                if(!!currentRouteName.match('postThreadModal')) return

                this.$router.push({
                    name: `${currentRouteName}.postThreadModal`,
                    params: {
                        subreddit: post.subreddit.name,
                        postId: Hashids.encode(post.id),
                        postSlug: post.slug,
                        post
                    }
                })
            },
            async sortPosts(criteria = this.$route.params.sort) {
                
                this.simulateLoading()

                switch (criteria) {
                    
                    case 'top': 
                        this.posts.data = this.posts.data.sort((postA,postB) => this.comparePostsRanks(postA.rank,postB.rank)) 
                        break

                    case 'hot': 
                        this.posts.data = this.posts.data.sort((postA,postB) => {
                            const rankA = postA.rank / postA.created_at,
                                rankB =  postB.rank / postB.created_at

                            return this.comparePostsRanks(rankA,rankB)
                        })
                        break

                    case 'new': 
                        this.posts.data = this.posts.data.sort((postA,postB) => this.comparePostsRanks(postA.created_at,postB.created_at))
                        break

                    default: return    
                }
            },
            comparePostsRanks(rankA,rankB) {
                
                if(rankA > rankB) return -1
                if(rankB > rankA) return 1

                return 0
            },
            simulateLoading() {
                this.dataIsSorting = true

                setTimeout(() => {
                    this.dataIsSorting = false
                },1050)
            },
            loadMorePosts(e) {

                if(__bottomOfThePageIsHit() && this.posts.next_page_url) {

                    this.dataIsLoading = true
                    
                    __disablePageScrolling()

                    this.fetchPosts()
                        .then(() => {
                            
                            this.dataIsLoading = false
                            
                            __enablePageScrolling()
                        })
                }
            },
        },
    }
</script>
