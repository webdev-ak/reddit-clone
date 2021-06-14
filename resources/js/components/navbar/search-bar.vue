<template>
     <div class="search" :style="searchBarStyles">
        <form>
            <input 
                type="text" 
                placeholder="Search" 
                class="form-control"
                v-model="query"
                id="search-input"
                @input="getQueryResults"
                @keypress.enter="globalSearch"
                @focus="manageDropdownVisibility"
            >
            <a class="dropdown-toggle d-none" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
            <div class="custom-dropdown">
                <div class="dropdown-menu dropdown-items-list" :style="{ 'width': `${searchDropdownWidth}px` } ">
                    <loading-simulation
                        v-if="loading"
                        type="communitiesList"
                        :occurrences="5"
                    >
                    </loading-simulation>
                    <div v-else>
                        <community-overview
                            v-for="community in communities" 
                            :community="community"
                            :key="community.name" 
                            @click.native="showCommunity(community)"
                        >
                        </community-overview>
                    </div>
                </div>
            </div>
        </form>
     </div>
</template>

<script>
    import CommunityOverview from '../community-overview'

    export default {
        components: {
            CommunityOverview
        },
        data() {
            return {
                query: '' ,
                communities: [],
                searchDropdownWidth: null,
                loading: false
            }
        },
        mounted() {
            this.initiateQueryValue()

            if(this.query) this.searchSubreddits()

            $(document).ready(() => {
                this.setSearchDropdownWidth()
            })
        },
        created() {
            window.addEventListener("resize", () => {
                this.setSearchDropdownWidth()
            })
        },
        computed: {
            searchBarStyles() {

                if(__auth()) return {}

                return {
                    'margin': '0 auto',
                    'max-width': '690px'
                }
            }
        },
        watch: {
            $route(to, from) {
                if(this.leavingSearchResultsPage(to,from)) this.clearQuery()
            },
            loading(newVal, oldVal) {
                if(newVal) this.showSearchDropdown()
            }
        },
        methods: {
            initiateQueryValue() {
                this.query = this.$route.query.q ? this.$route.query.q : ''
            },
            clearQuery() {
                this.query = ''
            },
            leavingSearchResultsPage(to,from) {
                return !!!to.name.match('searchResults')
            }, 
            manageDropdownVisibility() {
                
                if(this.query && this.communities.length > 0 && this.doesSearchInputHaveFocus()) {
                    this.showSearchDropdown()
                    return
                }
                this.hideSearchDropdown()
            },
            showSearchDropdown() {
                $('.search .dropdown-toggle').dropdown('show')
            },
            hideSearchDropdown() {
                $('.search .dropdown-toggle').dropdown('hide')
            },
            setSearchDropdownWidth() {
                this.searchDropdownWidth = $('.search form').width()
            },
            getQueryResults() {
                this.loading = true

                this.searchSubreddits()
                    .then(() => {
                        
                        this.loading = false
                        
                        this.manageDropdownVisibility()
                    })
            },
            blurSearchInput() {
                document.getElementById('search-input').blur()
            },
            doesSearchInputHaveFocus() {
                return !!$('#search-input').is(':focus')
            },
            trimQuery() {
                this.query = this.query.trim()
            },
            async searchSubreddits() {
                
                if(!this.query) return

                await Axios.post('/search/subreddits',{
                   query: this.query
                })
                   .then(({ data }) => {
                       this.communities = [...data]
                    })
                   .catch(() => {})
            },
            globalSearch(e) {

                e.preventDefault()

                this.trimQuery()
                
                if(!this.query || this.$route.query.q === this.query) {
                    this.hideSearchDropdown()
                    return
                } 

                this.hideSearchDropdown()

                this.blurSearchInput()
                
                this.$router.push( 
                    { 
                        name: 'searchResults',
                        query: { q:this.query, type:'' } 
                    }
                );
            },
            showCommunity({ name }) {
                this.$router.push(`/r/${name}`).catch(() => {})
            }
        }
    }
</script>

<style scoped>
    
    .search {
        flex-grow: 1;
        margin-left: 16px;
        margin-right: 16px;
        width: auto;
    }

    input#search-input {
        background-color: #F6F7F8;

    }

    input#search-input:hover, .form-control:focus {
        background-color: #fff;
        border: 1px solid #0079D3;
        box-shadow: none;
    }
    .search form {
        margin-bottom:0;
        width: 70%;
    }
    .search >>> .dropdown-items-list a.dropdown-item {
        padding: 5px 20px;
    }

    .search >>> .dropdown-items-list a.dropdown-item .community img {
        width: 19px;
        height: 19px;
    }

    @media(max-width: 635px) {
        .search form{
            width: 100%;
        }
    }
    
</style>