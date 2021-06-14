<template>
    <div class="container-fluid mt-1 h-100">
        <div class="search-header row">
            <div class="col-md-12 pl-5 pt-2">
                <span class="route-query">{{ query }}</span>
                <span class="text-muted">search results</span>
            </div>
            <div class="search-results-filter d-flex col-md-12 align-self-end pl-4">
                <router-link :to="{ name: 'searchResults', query:{ q: query} }"  class="nav-link" exact>
                    Best Results
                </router-link>
                <router-link :to="{ name: 'searchResults', query:{ q: query, type: 'posts'} }"  class="nav-link" exact>
                    Posts
                </router-link>
                <router-link :to="{ name: 'searchResults', query:{ q: query, type: 'communitiesAndUsers'} }"  class="nav-link" exact>
                    Communities and users
                </router-link>
            </div>
        </div>

        <!-- Search Results -->
        <div class="row">
           <div class="col-md-9 flex-row mb-5">
               <div v-if="!loading">
                    <div v-if="feedback.status === 'error'" class="empty-results">
                        <div class="empty-results-img"></div>
                        <div v-if="feedback.message">{{ feedback.message }}</div>
                        <button class="ml-2 btn btn-primary" @click.stop="searchForResults()">
                            retry
                        </button>
                    </div>
                    <div v-else>
                        <!-- communities and users !-->
                        <div
                            v-if="queryResultsFiltered.communitiesAndUsers" 
                            class="bg-white border border-white rounded-sm mb-5 py-3 px-3"
                        >
                            <div v-if="communitiesAndUsersToShow.length === 0" class="empty-results">
                                <div class="empty-results-img"></div>
                                <div>Sorry, there were no community or user results for “ {{ query }} ”</div>
                            </div>
                            <div v-else>
                                <div class="text-muted m-3 border-bottom pb-1">
                                    communities and users
                                </div>
                                <div 
                                    v-for="result in communitiesAndUsersToShow" 
                                    :key="result.id" 
                                    class="communitiesAndUsers"
                                >
                                    <div class="result" v-if="result.type === 'community'">
                                        <img :src="result.imagePath"  alt="">
                                        <div class="result-name">
                                            <div style="width:240px">
                                                <div>
                                                    <router-link class="dark-link" :to="`/r/${result.name}`">
                                                        r/{{ result.name }}
                                                    </router-link>
                                                </div>
                                                <div class="text-muted">
                                                    {{ result.membersCount }} {{ 'member' | pluralize(result.membersCount) }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="result-description">{{ result.description }}</div>
                                        <div class="ml-4" v-if="result.subscriptions">
                                            <follow-button
                                                entity-type="subreddit"
                                                :entity-id="result.name"
                                                :initial-subscriptions="result.subscriptions"
                                            >
                                            </follow-button>
                                        </div>
                                    </div>
                                    <div v-if="result.type === 'user'" class="result">
                                        <img :src="result.imagePath" alt="">
                                        <div class="result-name align-self-center">
                                            <router-link class="dark-link" :to="`/user/${result.username}`">
                                                u/{{ result.username }}
                                            </router-link>
                                        </div>
                                        <div class="ml-auto">
                                            <follow-button
                                                entity-type="profile"
                                                :entity-id="result.id"
                                                :initial-subscriptions="result.subscriptions"
                                            >
                                            </follow-button>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="showViewMore" class="mt-3 font-weight-bold" >
                                    <router-link 
                                        :to="{ name: 'searchResults', query:{ q: query, type: 'communitiesAndUsers'}}"
                                    >
                                        VIEW MORE
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <!-- end communities and users -->
                            
                        <!-- posts -->
                        <div v-if="queryResultsFiltered.posts">
                            <div v-if="queryResultsFiltered.posts.length === 0" class="empty-results">
                                <div class="empty-results-img"></div>
                                <div>Sorry, there were no posts results for “ {{ query }} ”</div>
                            </div>
                            <div v-else class="posts">
                                <post-classic
                                    v-for="post in queryResultsFiltered.posts"
                                    :post="post"
                                    :key="post.id"
                                    :class="['mb-0','rounded-0']"
                                >
                                </post-classic>
                            </div>
                        </div>
                        <!-- end posts-->
                    </div>
               </div>

               <div v-else>
                    <div v-if="!filter || filter === 'communitiesAndUsers' " class="bg-white mb-3">
                        <loading-simulation
                            type="searchResultsOfCommunitiesAndUsers"
                            :occurrences="3"
                        >
                        </loading-simulation>
                    </div>
                    <div v-if="!filter || filter === 'posts' ">
                        <loading-simulation
                            type="postsClassic"
                            :occurrences="5"
                        >
                        </loading-simulation>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Search Results-->
    </div>
</template>

<script>
    import PostClassic from './post-classic.vue'

    export default {
        components: {
            PostClassic  
        },
        data() {
            return {
                loading: null,
                queryResults: {
                    posts: [],
                    communitiesAndUsers: []
                },
                feedback: {
                    status: '',
                    message: ''
                }
            }
        },
        mounted() {
            this.searchForResults()
        },
        watch: {
            query(newQuery,oldQuery) {
                this.searchForResults()
            },
        },
        computed: {
            query() {
                return this.$route.query.q
            },
            filter() {
                return this.$route.query.type;
            },
            communitiesAndUsersToShow() {
                let communitiesAndUsers = this.queryResults.communitiesAndUsers;

                return !this.filter && communitiesAndUsers.length > 3 ? communitiesAndUsers.slice(0,3) : communitiesAndUsers ;
            },
            showViewMore() {
                return  !this.filter && this.queryResults.communitiesAndUsers.length > 3
            },
            loadingOccurrencesNumber() {
                return !this.filter ? 3 : 7;
            },
            queryResultsFiltered() {
                
                if(!this.filter) return this.queryResults;

                let result = {};
                
                result[this.filter] = this.queryResults[this.filter]; 
                
                return result;
                
            }
        },
        methods: {
            searchForResults() {
                this.loading = true;

                Axios.post('/search/global-search', {
                    q: this.query
                })
                    .then( ({ data }) => {
                        this.queryResults = data;
                        this.loading = false;
                    })
                    .catch (error => {
                        this.loading = false;

                        this.feedback.status = 'error'
                        this.feedback.message = 'Something went wrong...please try again'
                    })

                this.clearFeedback();
            },
            clearFeedback() {
                this.feedback = {
                    status: '',
                    message: ''
                }
            },
        }
    }
</script>

<style scoped>

    .search-header {
        background-color: #fff;
        margin-bottom: 16px;
        height: 145px;
        border-bottom: 1px solid #fff; 
    }

    .communitiesAndUsers .result {
        display: flex;
        margin-top: 8px;
    }

    .communitiesAndUsers .result img {
        width:35px; 
        height:35px; 
        border-radius: 50%;        
    }

    .communitiesAndUsers .result .follow-button {
        width: 140px !important;
    }

    .communitiesAndUsers .result .result-name {
        padding-left: 8px;
        font-size:13px;
    }

    .communitiesAndUsers .result .result-description {
        color:grey;
        flex-grow: 1;
        overflow-wrap: break-word;
        font-size: 13px;
        font-weight: 400;
        overflow: hidden;
        min-width: 17px;
    }

    .route-query {
        font-size: 18px;
        display:block;
        font-weight: bold;
    }

    .search-results-filter a {
        color: #7C7C7C;
        font-size: 14px;
        text-decoration: none;
        font-weight: 600;
        padding: 8px 9px;
        margin-right: 18px;
    }

    .search-results-filter a:hover {
        color: #000;
    }

    .search-results-filter .router-link-active {
        color: #000;
        border-bottom: 2px solid #3490dc;
    }

    .empty-results {
        display: flex !important;
        align-items: center !important;
        flex-direction: row !important;
        justify-content: center !important;
        height: 140px;
        background-color: #fff;
    }
    
    .empty-results-img {
        background-image: url('https://drive.google.com/uc?export=view&id=1ldyitPRx7EXg80JHtx9dUrk9o4bW5YzW'); 
        background-position: center center;
        background-size: 48px 48px;
        width:48px;
        height: 48px;
        border:none;
    }
</style>