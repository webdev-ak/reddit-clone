<template>
    <div class="card">
        <div class="card-header bg-primary text-white" style="height: 43px;">
            <span v-if="subredditRoute">About Community</span>
        </div>
        <div class="card-body">
            <div class="d-flex mb-2" v-if="postThreadRoute || submitPostRoute ">
                <img
                    width="60px" 
                    height="60px"
                    class="rounded-circle mr-2"
                    :src="subreddit.imagePath"
                >
                <router-link :to="`/r/${subreddit.name}`" class="align-self-center font-weight-bold">
                    r/{{ subreddit.name}}
                </router-link>
            </div>
            <div>{{ subreddit.description }}</div>
            <div class="my-2">
                <span class="font-weight-bold">{{ subreddit.membersCount }}</span><br>
                <span>{{ 'member' | pluralize(subreddit.membersCount)  }}</span>
            </div>
            <hr>
            <div>
                <i class="fas fa-birthday-cake"></i>
                Created at {{ subreddit.created_at }}
            </div>
            <div class="w-100 mt-3" v-if="postThreadRoute">
                <follow-button
                    entity-type="subreddit"
                    :entity-id="subreddit.name"
                    :initial-subscriptions="subreddit.subscriptions"
                    style="width: inherit !important;"
                >
                </follow-button>
            </div> 
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            subreddit: {
                required: true,
                type: Object
            },
        },
        data() {
            return {
                subredditRoute: this.$route.name === 'subreddit',
                postThreadRoute: !!this.$route.meta.threadRouteName 
            }
        },
        computed: {
            submitPostRoute() {    
                return !!this.$route.path.match('/submit')
            }
        },
    }
</script>
