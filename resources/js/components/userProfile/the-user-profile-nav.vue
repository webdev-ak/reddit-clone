<template>
    <div class="profile-nav" :class="navWidth">
        <a
            v-for="navFilter in navFilters"
            :key="navFilter"
            @click.prevent="changeCurrentFilter(navFilter)"
            class="nav-link"     
            :class="{ 'active-filter': navFilter === currentFilter}"       
        >
        {{ navFilter }}
        </a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                navFilters: [ 
                    'overview',
                    'posts',
                    'comments',
                    'upvoted',
                    'downvoted'
                ],
                defaultFilter:'overview',
                currentFilter: '',
                baseRouteName: this.$route.name
            }
        },
        mounted() {
            this.setCurrentFilter()
        },
        computed: {
            navWidth() {
                return this.currentFilter === this.defaultFilter  
                    ? 'col-md-6' 
                    : 'col-md-9 pl-4'
            },
        },
        watch: {
            $route(to,from) {
                if(to.name === this.baseRouteName) this.setCurrentFilter()
            }
        },
        methods: {
            setCurrentFilter() {
                this.currentFilter = this.$route.params.filter ? this.$route.params.filter : this.defaultFilter

                this.$emit('set-filter',this.currentFilter)
            },
            changeCurrentFilter(filter) {
                
                this.currentFilter = filter

                if(filter === this.defaultFilter) filter = ''

                this.$router.push(`/user/${this.$route.params.username}/${filter}`).catch(() => {})
            }
        }
    }
</script>


<style scoped>

    .profile-nav {
        display: flex;
        align-items: center;
        padding-top: 4px;
    }

    a {
        color: #000;
        font-size: 14px;
        font-weight: 595;
        text-transform: uppercase;
        cursor: pointer;
    }

    a:hover {
        color: #3490dc;
    }

    a.active-filter {
        color: #3490dc;
        border-bottom: 0.2px solid;
    }
    
</style>