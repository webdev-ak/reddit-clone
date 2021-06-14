<template>
    <div class="search-types col-md-12 pl-4">
        <a
            v-for="type in searchTypes" 
            :key="type.name"
            class="nav-link" 
            :class="{'active-item':currentSearchType === type.value }"
            @click.prevent="alterSearchType(type.value)"
        >
            {{ type.name }}
        </a>
    </div>
</template>

<script>
    export default {
        props: {
            query: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                searchTypes: [
                    {
                        name: 'Best Results',
                        value: 'bestResults',
                        default: true
                    },
                    {
                        name: 'Posts',
                        value: 'posts'
                    },
                    {
                        name: 'Communities and users',
                        value: 'communitiesAndUsers'
                    }
                ],
                baseRouteName: this.$route.name,
                currentSearchType: '',
            }
        },
        mounted() {
            this.setSearchType()
        },
        watch: {
            $route(to,from) {
                if(to.name === this.baseRouteName) this.setSearchType()
            }
        },
        methods: {
            alterSearchType(newType) {
                
                this.currentSearchType = newType
                
                if(newType == this.getDefaultSearchType()) newType = ''

                this.$router.push({ 
                    name: 'searchResults',
                    query: { 
                        'q': this.query,
                        'type': newType
                    } 
                }).catch(() => {})
            },
            setSearchType() {
                let type = this.$route.query.type
                
                if(!type || !this.searchTypes.some(searchType => searchType.value === type)) type = this.getDefaultSearchType()
                
                this.currentSearchType = type 

                this.$emit('set-search-type',this.currentSearchType)
            },
            getDefaultSearchType() {
                return this.searchTypes.find(searchType => searchType.default).value
            }
        }    
    }
</script>

<style scoped>

    .search-types {
        display: flex;
        align-self: flex-end;
    }

    a {
        color: #7C7C7C;
        font-size: 14px;
        text-decoration: none;
        font-weight: 600;
        padding: 8px 9px;
        margin-right: 18px;
        cursor: pointer;
    }
    
    a:hover {
        color: #000;
    }

    a.active-item {
        color: #000;
        border-bottom: 2px solid #3490dc;
    }    
</style>