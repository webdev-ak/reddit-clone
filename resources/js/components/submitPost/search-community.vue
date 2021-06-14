<template>
    <div class="search-community mb-3">
        <div class="search-dropdown custom-dropdown">
            <div class="search-container d-flex align-items-center px-2 bg-white">
                <div class="result-image-container">
                    <i v-if="search" class="fas fa-search"></i>
                    <img v-else-if="selectedCommunityImg" :src="selectedCommunityImg" class="rounded-circle w-100 mb-1">
                    <i v-else class="fas fa-spinner"></i>
                </div>
                <div class="d-flex w-100">
                    <input
                        type="text"
                        placeholder="Choose a community"
                        id="input-query"
                        class="form-control border-0"
                        v-model="query"
                        @focus="activateSearch"
                        @keyup="getQueryResults()"
                    >
                </div>
                <div class="search-toggler" @click.stop="toggleDropdown">
                    <i class="fa fa-caret-down" aria-hidden="true"></i>
                </div>
            </div>
            <button class="dropdown-toggle d-none" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
            <div class="search-results dropdown-items-list dropdown-menu">
                <div v-if="myCommunitiesFiltered.length > 0">
                    <h3>MY COMMUNITIES</h3>
                    <community-overview
                        v-for="community in myCommunitiesFiltered" 
                        :key="community.name" 
                        :community="community"
                        @click.native="selectCommunity(community)"
                    >
                    </community-overview>
                    <div v-show="otherCommunitiesFiltered.length > 0" class="dropdown-divider"></div>
                </div>
                <div v-if="otherCommunitiesFiltered.length > 0">
                    <h3>OTHERS</h3>
                    <community-overview
                        v-for="community in otherCommunitiesFiltered" 
                        :key="community.name" 
                        :community="community"
                        @click.native="selectCommunity(community)"
                    >
                    </community-overview>
                </div>
                <div v-if="noCommunityIsFound">
                    <a class="dropdown-item text-center">
                        No communities found            
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CommunityOverview from '../community-overview'

    export default {
        components: {
            CommunityOverview
        },
        props: {
            baseCommunity: {
                type: Object,
                required: false,
            }
        },
        data() {
            return {
                myCommunities: [],
                myCommunitiesFiltered: [],
                otherCommunities: [],
                selectedCommunityImg: null,
                noCommunityIsFound: false,
                search: false,
                query: '',
            }
        },
        created() {
            this.detectBaseCommunity()
            
            this.getMyFollowedCommunities()
            
            this.getMyUnfollowedCommunities()

            this.listenToClickOutsideOfSearchContainer()
        },
        computed: {
            otherCommunitiesFiltered() {

                return this.otherCommunities.filter(community => ! this.myCommunities.find(c => c.name === community.name))
            },
            allCommunitiesLength() {

                return this.myCommunitiesFiltered.length + this.otherCommunitiesFiltered.length 
            },
            dropDownCanBeOpen() {

                if( ! this.search) return false

                return this.noCommunityIsFound || this.allCommunitiesLength > 0
            },
            currentCommunity() {
                return this.$route.params.subreddit
            },
        },
        watch: {
            $route(to,from) {
               if(to.name === 'submit') this.resetSearch(to.params.keepQuery)
            },
            dropDownCanBeOpen(newValue,oldValue) {
                this.manageDropdownVisibility()
            },
        },
        methods: {
            detectBaseCommunity() {
                if(Object.keys(this.baseCommunity).length > 0) this.markAsSelected(this.baseCommunity)
            },
            getQueryResults() {
                this.getMyUnfollowedCommunities()
                    .then(() => {
                        this.filterMyCommunities()
                        this.noCommunityIsFound = (this.query !== "" && this.allCommunitiesLength === 0) 
                    })
            },
            filterMyCommunities() {
                this.myCommunitiesFiltered = this.myCommunities.filter(community => community.name.startsWith(this.query))
            },
            getMyFollowedCommunities() {
                Axios.get('/user/auth/followed-subreddits')
                    .then( ({ data }) => {
                        this.myCommunitiesFiltered = this.myCommunities = data
                        this.filterMyCommunities()
                    })
                    .catch(() => {})
            },
            async getMyUnfollowedCommunities() {
                
                await Axios.post('/user/auth/unfollowed-subreddits', {
                    query: this.query
                })
                    .then( ({ data }) => this.otherCommunities = data)
                    .catch(() => {})
            },
            selectCommunity(community) {

                this.markAsSelected(community)

                this.sendSelectedCommunityToParent(community)
                
                this.changeRoutePath()

                this.deactivateSearch()
            },
            markAsSelected(community) {
                this.query = community.name
                this.selectedCommunityImg = community.imagePath
            },
            sendSelectedCommunityToParent(community) {
                this.$emit('communitySelected',community)
            },
            changeRoutePath() {

                const currentCommunity = this.$route.params.subreddit,
                selectedCommunityName = this.query

                if(currentCommunity && currentCommunity === selectedCommunityName) return

                this.$router.push(`/r/${selectedCommunityName}/submit`)
            },
            goBackToBaseSubmitPage() {
                this.$router.push({
                    name: 'submit',
                    params: {
                        keepQuery: true
                    }
                })
            },
            clearOtherCommunitiesData() {
                this.otherCommunities = []
            },
            listenToClickOutsideOfSearchContainer() {
                $(document).ready(() => {
                    $('.submit-post').on('click',(e) => {
                        if(!$(e.target).is('.search-community *')) {
                            this.deactivateSearch()
                            if(this.currentCommunity && this.currentCommunity !== this.query) this.goBackToBaseSubmitPage()
                        }   
                    })
                })                
            },
            focusSearchInput() {
                document.getElementById('input-query').focus()
            },
            activateSearch() {
                this.search = true
            },
            deactivateSearch() {
                this.search = false
            },
            resetSearch(keepQuery) {
                
                if( ! keepQuery) {
                    
                    this.query = ''
                    this.clearOtherCommunitiesData()
                }

                this.deactivateSearch()
                
                this.selectedCommunityImg = null
                
                this.$emit('communityUnselected')   
                
            },
            toggleDropdown() {
                
                const searchAlreadyActivated = this.search    
                
                this.focusSearchInput()
                
                if(searchAlreadyActivated) this.manageDropdownVisibility()
            },
            manageDropdownVisibility() {
                if(this.dropDownCanBeOpen && !this.dropdownIsActive()) {
                    this.showSearchDropdown()
                    return
                }
                this.hideSearchDropdown()
            },
            dropdownIsActive() {
                return !!$('.search-community .dropdown-menu').hasClass('show')
            },
            showSearchDropdown() {
                $('.search-community .dropdown-toggle').dropdown('show')
            },
            hideSearchDropdown() {
                $('.search-community .dropdown-toggle').dropdown('hide')
            },
        }
    }
</script>

<style scoped>
    
    .search-toggler {
        cursor: pointer;
    }

    .result-image-container {
        text-align: center;
        width:22px; 
        height:22px;
    }

    .search-results .community {
        display: flex;
        align-items: center;
    }

    .search-results .community img {
        width:35px;
        height:35px;
        border-radius: 50%;
    }

    .custom-dropdown .dropdown-items-list a.dropdown-item .community-members-count {
        color: #6c757d !important;
        font-size: 12px;
    }

    .form-control:focus {
        border: 1px solid #ced4da;
        box-shadow: none;
    }
</style>
