<template>
    <div class="container-fluid mt-1 h-100">
        <div class="search-header row">
            <div class="col-md-12 pl-5 pt-3">
                <span class="route-query" v-if="query">{{ query }}</span>
                <span class="text-muted">search results</span>
            </div>
            <search-types-bar 
                :query="query" 
                @set-search-type="setSearchType"
            >
            </search-types-bar>
        </div>
        <div class="row">
           <div class="col-md-9 flex-row mb-5">
                <keep-alive>
                    <component 
                        :is="searchType" 
                        :query="query"
                        @activated="componentActivated"
                    >
                    </component>
                </keep-alive>
           </div>
        </div>
    </div>
</template>

<script>
    import SearchTypesBar from './search-types-bar'
    import BestResults from './best-results'
    import Posts from './posts'
    import CommunitiesAndUsers from './communities-and-users.vue'

    export default {
        components: {
            SearchTypesBar,
            BestResults,
            Posts,
            CommunitiesAndUsers,
        },
        data() {
            return {
                query:'',
                searchType:'',
                routeBaseName: this.$route.name
            }
        },
        created() {
            this.setQuery()
        },
        watch: {
            $route(to,from) {
                if(to.name === this.routeBaseName) this.setQuery()
            }
        },
        methods: {
            setQuery() {
                this.query = this.$route.query.q
            },
            setSearchType(type) {
                this.searchType = type
            },
            componentActivated(component) {
                if(component.getQuery() !== this.query) {
                    component.resetData() 
                    component.setDataFetchParams({'query':this.query})                   
                    component.fetchData()
                }
            },
        }
    }
</script>

<style>
    
    .search-header {
        background-color: #fff;
        margin-bottom: 16px;
        height: 145px;
        border-bottom: 1px solid #fff; 
    }

    .route-query {
        font-size: 18px;
        display:block;
        font-weight: bold;
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