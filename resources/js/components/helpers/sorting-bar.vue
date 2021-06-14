<template>
    <div class="sorting-bar">
        <div class="sortItems">
            <a
                v-for="sort in sortItems" 
                :key="sort.name"
                @click.prevent="changeCurrentSort(sort)"
                :id="sort.name" 
                :class="{'active-item': sort.name === currentSort}"
            >
                <i :class="sort.iconClass"></i>
                <span>{{ sort.name | capitalizeFirstLetter }}</span>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sortItems: [
                    {
                        name: 'new',
                        iconClass: 'fas fa-certificate',
                        default: true
                    },
                    {
                        name: 'hot',
                        iconClass: 'fas fa-fire'
                    },
                    {
                        name: 'top',
                        iconClass: 'fas fa-rocket',
                    }
                ],
                currentSort: ''
            }
        },
        created() {
            this.validateCurrentSort()
        },
        watch: {
            currentSort(newSort, oldSort) {
                this.validateCurrentSort()
                this.$emit('sort-items',this.currentSort)
            },
            $route(to,from) {
                if(to.params.sort) this.setCurrentSort()
            }
        },
        methods: {
            setCurrentSort() {
                this.currentSort = this.$route.params.sort ? this.$route.params.sort : this.sortItems.find(sort => sort.default).name
            },
            changeCurrentSort(newSort) {

                if(newSort.name === this.currentSort) return

                this.$router.push({
                    name: this.$route.name,
                    params: { 
                        sort: newSort.name
                    }
                })
            },
            validateCurrentSort() {
                
                this.setCurrentSort()

                if(!this.currentSort) return
                
                let currentSortIsValid = this.sortItems.some(sortItem => sortItem.name === this.currentSort)

                if(! currentSortIsValid) {
                    this.$router.history.updateRoute(
                        this.$router.match({
                            name: 'page-not-found',
                        })
                    )
                }
            }
        }
    }
</script>

<style scoped>

    .sorting-bar {
        background-color: #fff;
        background-clip: border-box;
        border-radius: 0.30rem;
        border: 1px solid #CDCDCD;
        height: 60px;
        display: flex;
        margin-bottom: 24px;
        padding: 16px;
    }
    
    a {
        padding: 6px;
        margin-right: 8px;
        text-decoration: none;    
        font-size: 15px;
        font-weight: bold;
        color: gray;
    }

    a > span {
        font-weight: 590;
        line-height: 18px;
        margin: 0 4px
    }
    
    a:hover  {
        cursor: pointer;
        background-color:#DAE0E6;
        border-radius: 0.9rem;
    }

    a.active-item {
        color: #FF8b60;
        background-color:#DAE0E6;
        border-radius: 0.9rem;
    }
</style>