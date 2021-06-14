<template>
    <div class="search-results">
        <div v-if="posts.loadedDataIsEmpty()" class="empty-results">
            <div class="empty-results-img"></div>
            <div v-if="posts.feedbackMessage()">{{ posts.feedbackMessage() }}</div>
            <div v-if="posts.dataFailedToLoad()" class="ml-2">
                <button class="btn btn-primary" @click="posts.fetchData()">try again</button>
            </div>
        </div>
        <div class="posts">
            <post-classic
                v-for="post in posts.data"
                :post="post"
                :key="`${$route.fullPath}:${post.id}`"
                :class="['mb-0','rounded-0']"
            >
            </post-classic>
        </div>
        <div v-if="posts.dataIsLoading()">
            <loading-simulation
                :type="posts.getLoadingType()"
                :occurrences="posts.getLoadingOccurrences()"
            >
            </loading-simulation>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import PostClassic from '../post-classic'
    import SearchResult from './SearchResult' 

    const POSTS_PER_PAGE = 10

    export default {
        components: {
            PostClassic,
        },
        props: {
            bestResults: {
                type: Boolean,
                required: false,
                default: false
            },
            query: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                posts: {},
                POSTS_PER_PAGE
            }
        },
        created() {
            window.addEventListener('scroll',this.loadMoreData)

            this.posts = new SearchResult('posts')
            
            this.posts.setLoadingType('postsClassic')
            this.posts.setLoadingOccurrences(this.POSTS_PER_PAGE)

            this.posts.setDataFetchUrl('/search/posts')
            this.posts.setDataFetchParams({
                'query': this.query,
                'best': this.bestResults 
            })
            
            this.posts.fetchData()
        },
        destroyed() {
            window.removeEventListener('scroll',this.loadMoreData)
        },
        activated() {
            this.$emit('activated',this.posts)
        },
        methods: {
            loadMoreData() {
                if(__bottomOfThePageIsHit() &&  this.posts.dataInfo.next_page_url && !this.posts.dataIsLoading()) {
                    
                    __disablePageScrolling()
                    
                    this.posts.fetchData()
                        .then( () => __enablePageScrolling())
                }
            },
        }
    }
</script>

<style lang="css">

    .search-results >>> .post-title {
        font-weight: normal;
    }
    
</style>