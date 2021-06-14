<template>
    <div class="page-observer custom-dropdown mr-2">
        <a 
            href="#" 
            id="navbarDropdown" 
            class="nav-link" 
            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
            @click.prevent="getAuthUserFollowedCommunities()"
        >
            <div v-if="currentItem" class="d-flex align-items-center">
                <div class="dropdown-icon" v-html="getCurrentPageIcon"></div>
                <span class="dropdown-title" v-html="getCurrentPageTitle"></span>
                <div class="dropdown-toggle ml-auto"></div>
            </div>
        </a>
        <div class="dropdown-items-list dropdown-menu" aria-labelledby="navbarDropdown">
            <div class="filter">
                <input type="text" name="" class="form-control" v-model="filter" placeholder="Filter">
            </div>
            <div v-if="itemsFiltered.redditFeeds">
                <h3>REDDIT FEEDS</h3>
                <a 
                    v-for="item in itemsFiltered.redditFeeds" 
                    @click="showItem(item)" 
                    class="dropdown-item" 
                    :key="item.name"
                >
                    <div class="d-flex">
                        <div class="item-icon" v-html="item.icon"></div>
                        <div class="item-title">{{ item.name }}</div> 
                    </div>
                </a>
            </div>
            <div v-if="!loadingCommunities">
                <div v-if="itemsFiltered.myCommunities" class="communities">
                    <h3>MY COMMUNITIES</h3>
                    <a 
                        v-for="community in itemsFiltered.myCommunities" 
                        :key="community.name"
                        @click.prevent="showCommunity(community)" 
                        class="dropdown-item"
                    >
                        <div class="d-flex align-items-center">
                            <img :src="community.imagePath">
                            <div class="item-title">r/{{ community.name }}</div> 
                        </div>
                    </a>
                </div>
            </div>
            <div v-else class="ml-3 mr-1">
                <loading-simulation
                    type="communitiesList"
                    :occurrences="4"
                >
                </loading-simulation>    
            </div>
            <div v-if="itemsFiltered.other">
                <h3>OTHER</h3>
                <a v-for="item in itemsFiltered.other" @click="showItem(item)" class="dropdown-item" :key="item.name">
                    <div class="d-flex">
                        <div class="item-icon" v-html="item.icon"></div>
                        <div class="item-title">{{ item.name }}</div> 
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            items: {},
            currentItem: null,
            filter: '',
            loadingCommunities: false,
            areUserCommunitiesFetched: false,
        }
    },
    mounted() {
        this.setPageObserverItems()
        this.detectCurrentPage()
    },
    computed: {
        itemsFiltered() {
            
            let itemsFiltered = {}
                  
            Object.keys(this.items).forEach(key => {
                let item = [] 
                
                item = this.items[key].filter( subItem => subItem.name && subItem.name.toLowerCase().indexOf(this.filter) > -1)
                
                if(item.length > 0) itemsFiltered[key] = item

            })
            
            return itemsFiltered
        },
        getCurrentPageTitle() {

            return this.currentItem.tagName ? this.currentItem.tagName  : this.currentItem.name
        },
        getCurrentPageIcon() {

            return this.currentItem.icon ? this.currentItem.icon 
                    : `<img src=${this.currentItem.imagePath} width="24" height="24" class="rounded-circle">`
        },
    },
    watch: {
        $route(to,from) {
            if(!to.name.match(from.name) && !from.name.match(to.name)) {
                this.detectCurrentPage()
                this.clearFilter()
            }
        }
    },
    methods: {
        clearFilter() {
            this.filter = ''
        },
        setPageObserverItems() {
            this.items =  {
                hiddenItems: [
                    {
                        name: 'Search Results',
                        path: '/search',
                        icon: '<i class="fas fa-search"></i>'
                    },
                ],
                other: [
                    {
                        name: 'User Settings',
                        path: '/settings/account',
                        icon: `<img src=${__auth().imagePath} class="user-img">`
                    },
                    {
                        name: 'Create Post',
                        path: '/submit',
                        icon: '<i class="fas fa-edit"></i>'
                    },
                    {
                        name: 'Create Community',
                        path: '/subreddits/create',
                        icon: '<i class="fas fa-edit"></i>'
                    },
                ],
                redditFeeds: [
                    {
                        name: 'Popular',
                        path: '/r/popular',
                        icon: '<i class="fas fa-fire"></i>'
                    },
                    {
                        name: 'All',
                        path: '/r/all',
                        icon: '<i class="fas fa-database"></i>'
                    },
                    {
                        name: 'Home',
                        path: '/',
                        icon: '<i class="fas fa-home"></i>'
                    },
                ],
                myCommunities: [],
            }
        },
        detectCurrentPage() {

            if(this.detectErrorPage()) return
            
            if(['postThread','postSingleThread','userProfile', 'subreddit'].includes(this.$route.name)) {
                this.getPageEntity()
                return
            }

            this.detectActiveItemFromItemsList()
        },
        getPageEntity() {
            window.events.$on('currentEntityDetected', (entity) => {
                this.currentItem = entity
            })
        },
        detectActiveItemFromItemsList() {

            Object.keys(this.items).every((item) => {

                this.currentItem = this.items[item].find(subItem => this.$route.path.match(subItem.path)) 
                
                if(this.currentItem) return false // break here

                return true
            })
        },
        detectErrorPage() {
            
            let isErrorPage = false

            if(this.$route.meta.errorPage) {
                this.currentItem = {
                    name: 'Page error',
                    icon: '<i class="fas fa-exclamation-circle"></i>'
                }

                isErrorPage = !isErrorPage
            }
            
            return isErrorPage
        },
        getAuthUserFollowedCommunities() {

            if(this.areUserCommunitiesFetched) return

            this.loadingCommunities = true
            
            Axios.get('/user/auth/followed-subreddits')
                .then(( { data }) => {
                    this.items.myCommunities = data

                    this.loadingCommunities = false

                    this.setUserCommunitiesAsFetched()
                })
                .catch(() => {})
        },
        showCommunity({ name }) {
            this.$router.push(`/r/${name}`).catch(() => {})
        },
        showItem({ path }) {

            if(path === '/' && this.$route.path === '/') {
                __fetchHomePosts()
                return
            }
            
            this.$router.push(path).catch(() => {})
        },
        setUserCommunitiesAsFetched() {
            this.areUserCommunitiesFetched = true
        },
    },
}
</script>







