<template>
    <div class="card">
        <div v-if="!loading" class="card-body">
            <div class="mb-3">
                Trending Communities
            </div>
            <div v-if="trendingCommunities.length === 0" class="d-flex justify-content-center">
                <div v-if="feedback.message">{{ feedback.message }}</div>
                <button 
                    v-show="feedback.status === 'error'"
                    @click="getTrendingCommunities"
                    class="btn btn-sm btn-primary"
                >
                    retry
                </button>
            </div>
            <div v-else> 
                <div class="d-flex" v-for="community in trendingCommunities" :key="community.name">
                    <div class="mt-1">
                        <img
                            width="32px" height="32px"
                            class="rounded-circle"
                            :src="community.imagePath"
                        >
                    </div>
                    <div class="communityInfo">
                        <a href="#" @click.prevent="showCommunity(community)">
                            r/{{ community.name }}
                        </a>
                        <p>
                            {{ community.membersCount }} {{ 'member' | pluralize(community.membersCount) }}
                        </p>
                    </div>
                    <div v-if="community.subscriptions" class="ml-auto">
                        <follow-button
                            entity-type="subreddit"
                            :entity-id="community.name"
                            :initial-subscriptions="community.subscriptions"
                            class="btn-sm"
                            style="width: 80px !important"
                        >
                        </follow-button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="card-body">
            <loading-simulation
                type="trendingCommunitiesCard" 
                :occurrences="3"
            >
            </loading-simulation>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: true,
                trendingCommunities: [],
                feedback: {
                    status: '',
                    message: ''
                }
            }
        },
        mounted() {
            this.getTrendingCommunities()
        },
        methods: {
            getTrendingCommunities() {

                Axios.get('/r/trending-Communities')
                    .then( ({ data } ) => {
                        
                        this.trendingCommunities = data
                        
                        this.loading = false
                    })
                    .catch(() => {
                        this.loading = false

                        this.feedback.status = 'error'
                        this.feedback.message = 'Something went wrong...'
                    })
            },
            showCommunity({ name }) {
                this.$router.push(`/r/${name}`)
            }
        }   
    }
</script>

<style scoped>
    
    .communityInfo {
        margin-left: 8px;
    }

    .communityInfo a {
        font-size: 13px;
    }

    .communityInfo p {
        font-size: 11px;
    }
</style>