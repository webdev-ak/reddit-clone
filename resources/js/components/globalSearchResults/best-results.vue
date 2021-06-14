<template>
    <div class="best-results">
        <communities-and-users
            :class="['p-4']"
            :best-results="true"
            :key="'communitiesAndUsers:'+query"
            :query="query"
            @activated="(data) => $emit('activated',data)"
        >
        </communities-and-users>
        <posts
            :best-results="true"
            :key="'posts:'+query"
            :query="query"
            @activated="(data) => $emit('activated',data)"
        >
        </posts>       
    </div>
</template>

<script>

    import CommunitiesAndUsers from './communities-and-users'
    import Posts from './posts'

    export default {
        components: {
            CommunitiesAndUsers,
            Posts,
        },
        props: {
            query: {
                type: String,
                required: true
            }
        },
    }
</script>
