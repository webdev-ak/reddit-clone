<template>  
    <div :class="userActivitiesClass">
        <keep-alive>
            <component 
                v-bind:is="currentFilter" 
                @activated="setCurrentActivity"
                @show-thread = "(post,comment) => showThread(post,comment)"
            >
            </component>
        </keep-alive> 

        <loading-simulation
            v-if="dataIsLoading"
            :type="currentActivity.params.loadingType"
            :occurrences="11"
        >
        </loading-simulation>
        
        <div v-if="loadedDataIsEmpty">
            <empty-results 
                v-if="currentActivity.feedback"
                :message="currentActivity.feedback.message"
            >
                <button 
                    v-show="currentActivity.feedback.status === 'error'"
                    slot="button"
                    @click="currentActivity.fetchData()"
                >
                    retry
                </button>
            </empty-results>
        </div>  

        <router-view></router-view>
    </div>
</template>

<script>
    import Overview from './activities/overview'
    import Posts from './activities/posted'
    import Comments from './activities/commented'
    import Upvoted from './activities/up-voted'
    import Downvoted from './activities/down-voted'

    export default {
        components: {
            Overview,
            Posts,
            Comments,
            Upvoted,
            Downvoted
        },
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                currentActivity: null,
                currentFilter: ''
            }
        },
        created() {
            window.addEventListener('scroll',this.loadMoreData)
        },
        destroyed() {
            window.removeEventListener('scroll',this.loadMoreData)
        },
        computed: {
            userActivitiesClass() {
                return [
                    this.currentFilter === 'overview' ? 'col-md-6 ': 'col-md-9 pl-4',
                    'mb-5'
                ]
            },
            dataIsLoading() {
                return this.currentActivity && this.currentActivity.params.loading
            },
            loadedDataIsEmpty() {

                if(this.dataIsLoading) return false

                return this.currentActivity && this.currentActivity.data.length === 0
            }
        },
        methods: {
            setFilter(newFilter) {
                this.currentFilter = newFilter
            },
            setCurrentActivity(activity) {
                this.currentActivity = activity
            },
            loadMoreData() {

                if(__bottomOfThePageIsHit() &&  this.currentActivity.dataInfo.next_page_url) {
                    
                    __disablePageScrolling()
                    
                    this.currentActivity.fetchData()
                        .then( () => __enablePageScrolling())
                }
            },
            showThread(post, comment = null) {

                const currentRouteName = this.$route.name
                
                if(!!currentRouteName.match('postThreadModal')) return

                let routeParams = {
                    subreddit: post.subreddit.name,
                    postId: Hashids.encode(post.id),
                    postSlug: post.slug,
                    post,
                    commentToHighlightId: comment ? comment.id : undefined
                },
                routeName = `${currentRouteName}.postThreadModal`
                
                const isSingleThread = !!(comment && comment.comment_id)
                
                if(isSingleThread) {
                    routeName = `${routeName}.postSingleThread`
                    routeParams.threadId = Hashids.encode(comment.comment_id)
                }

                this.$router.push({
                    name: routeName,
                    params: routeParams
                }).catch(() => {})
            },
        }
    }
</script>

<style>

    #posts > .post {
        border-bottom: none;
    }

    .post-title {
        cursor: pointer;
    }

    .post-header {
        word-break:break-word;
    }

    .post-header .text-muted {
        font-size: 13px;
    }

    .post-header span.small-point {
        padding: 0 3px;
        font-size: 8px;
        line-height: 20px;
        color: #6c757d;
    }

    .post-header .post-title {
        display: inline;
        cursor: pointer;
    }

    .post-header .posted-by {
        display: inline;
        color: #6c757d !important;
        font-weight: 300;
        font-size: 12px
    }

    .post-header .posted-by a {
        color: #6c757d;;
        line-height: 1.7em;
    }

    .post-header .posted-by a:hover {
        color: #6c757d;
        text-decoration: underline;
    }
</style>
