<template>
    <div class="communities-and-users">
        <div v-if="communitiesAndUsers.loadedDataIsEmpty()" class="empty-results">
            <div class="empty-results-img"></div>
            <div v-if="communitiesAndUsers.feedbackMessage()">{{ communitiesAndUsers.feedbackMessage() }}</div>
            <div v-if="communitiesAndUsers.dataFailedToLoad()" class="ml-2">
                <button class="btn btn-primary" @click="communitiesAndUsers.fetchData()">try again</button>
            </div>
        </div>
        <div v-else-if="!communitiesAndUsers.dataIsLoading()">
            <div v-if="bestResultsPage" class="text-muted border-bottom py-1 mb-3">communities and users</div>
            <div v-for="result in communitiesAndUsers.data" :key="result.id">
                <div class="result" v-if="result.type === 'subreddit'">
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
            <div v-if="bestResultsPage && moreDataToBeLoaded" class="font-weight-bold text-uppercase mt-3">
                <a href="" @click.prevent="viewMoreData()">view more</a>
            </div> 
        </div>
        <div v-else>
            <loading-simulation
                :type="communitiesAndUsers.getLoadingType()"
                :occurrences="communitiesAndUsers.getLoadingOccurrences()"
            >
            </loading-simulation>
        </div>
    </div>
</template>

<script>
    import SearchResult from './SearchResult' 

    const BEST_RESULTS_NUMBER = 3,
    RESULTS_PER_PAGE = 10

    export default {
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
                communitiesAndUsers: {},
                BEST_RESULTS_NUMBER,
                RESULTS_PER_PAGE
            }
        },
        created() {
            this.communitiesAndUsers = new SearchResult('communitiesAndUsers')
            
            this.communitiesAndUsers.setLoadingType('communitiesAndUsersResults')
            this.communitiesAndUsers.setLoadingOccurrences(this.getDataNumberToBeLoaded())
            
            this.communitiesAndUsers.setDataFetchUrl(this.getDataFetchURL()) 
            this.communitiesAndUsers.setDataFetchParams({
                'query': this.query,
            }) 
            
            this.communitiesAndUsers.fetchData()
        },
        activated() {
            this.$emit('activated',this.communitiesAndUsers)
        },
        computed: {
            moreDataToBeLoaded() {
                return this.bestResults && this.BEST_RESULTS_NUMBER < this.communitiesAndUsers.getTotalDataToBeLoaded()
            },
            bestResultsPage() {
                return !this.$route.query.type
            }
        },
        methods: {
            getDataNumberToBeLoaded() {
                return this.bestResults ? this.BEST_RESULTS_NUMBER : this.RESULTS_PER_PAGE
            },
            getDataFetchURL() {
                return this.bestResults ? '/search/subredditsAndUsers/'+this.BEST_RESULTS_NUMBER : '/search/subredditsAndUsers' 
            },
            viewMoreData() {
                this.$router.push({
                    name: 'searchResults', 
                    query: { 
                        q: this.query,
                        type: 'communitiesAndUsers'
                    } 
                })
            }
        },
    }
</script>

<style>
    .communities-and-users {
        margin-bottom: 3rem;
        padding: 1rem;
        background-color: #fff !important;
        border-color: #fff !important;
        border-radius: 0.2rem !important;
        border: 1px solid #dee2e6;
    }
 
    .communities-and-users .result {
        display: flex;
        margin-top: 8px;
    }

    .communities-and-users .result img {
        width:35px; 
        height:35px; 
        border-radius: 50%;        
    }

    .communities-and-users .result .follow-button {
        width: 140px !important;
    }

    .communities-and-users .result .result-name {
        padding-left: 8px;
        font-size:13px;
    }

    .communities-and-users .result .result-description {
        color:grey;
        flex-grow: 1;
        overflow-wrap: break-word;
        font-size: 13px;
        font-weight: 400;
        overflow: hidden;
        min-width: 17px;
    }
</style>