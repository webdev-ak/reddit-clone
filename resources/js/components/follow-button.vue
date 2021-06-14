<template>
    <button 
        class="follow-button btn"
        @mouseenter="toggleButtonHover"
        @mouseleave="toggleButtonHover"
        @click.prevent.stop="toggleSubscription"
        :class="followBtnClass"
    >
        {{ followBtnValue }}
    </button>
</template>

<script>

    const Entities = [
        {
            type: 'profile',
            tag: 'u',
            subscriptionActions: {
                added: 'followed',
                deleted: 'unfollowed',
            },
            btnValues: {
                hovered: 'UNFOLLOW',
                subscribed: 'FOLLOWED',
                unsubscribed: 'FOLLOW'
            }
        },
        {
            type: 'subreddit',
            tag: 'r',
            subscriptionActions: {
                added: 'joined',
                deleted: 'left',
            },
            btnValues: {
                hovered: 'LEAVE',
                subscribed: 'JOINED',
                unsubscribed: 'JOIN'
            }
        }
    ];
    
    export default {
        props: {
            entityType: {
                type: String,
                required: true
            },
            entityId: {
                required: true
            },
            initialSubscriptions: {
                type: Array,
                required: true,
                default: () => []
            }
        },
        data() {
            return {
                subscriptions: this.initialSubscriptions,
                hovered: false,
                disabled: false,
                followBtnId: __uuid()
            }
        },
        created() {
            window.events.$on('spreadUpdatesToSimilarFollowButtons',this.updateEntitySubscriptions)
        },
        destroyed() {
            window.events.$off('spreadUpdatesToSimilarFollowButtons',this.updateEntitySubscriptions)
        },
        computed: {
            profileOwner() {
                if(!__auth() || this.entityType !== 'profile') return
                return this.entityId === __auth().id
            },
            subscription() {
                return this.subscriptions.find(s => s.user_id === __auth().id)
            },
            subscribed() {
                if( ! __auth() ) return
                return !!this.subscription
            },
            followBtnClass() {
                return this.subscribed ? 'btn-outline-primary' : 'btn-primary'
            },
            followBtnValue() {
                
                if(this.profileOwner) return 'New Post'
                
                let entity = Entities.find(entity => entity.type === this.entityType)
                
                if(this.subscribed) {

                    if(this.hovered) return entity.btnValues.hovered

                    return entity.btnValues.subscribed
                }

                return entity.btnValues.unsubscribed

            }
        },
        methods: {
            toggleSubscription() {
    
                if( ! __auth()) {
                    __openAuth('login')
                    return
                }

                // Create New Post
                if(this.profileOwner) {
                    window.location = '/submit'
                    return
                }

                if(this.disabled) return

                this.deactivateFollowBtn()

                Axios.post(`/subscriptions/${this.entityId}`)
                    .then( ({ data }) => {

                        this.reactivateFollowBtn()

                        this.spreadUpdatesToSimilarFollowButtons(data)                            
                        
                        this.manageSubscription(data)

                        this.showActionSucceededMessage(data.subscribeableName)

                    })
                    .catch(() => {

                        this.reactivateFollowBtn()

                        __showSomethingWentWrongMessage()
                    })
            },
            spreadUpdatesToSimilarFollowButtons(subscription) {
                window.events.$emit('spreadUpdatesToSimilarFollowButtons',{
                    btnId: this.followBtnId,
                    entityId: this.entityId,
                    entityType: this.entityType,
                    subscription,
                })
            },
            updateEntitySubscriptions({btnId, entityId, entityType,subscription}) {
                if(btnId !== this.followBtnId && entityType === this.entityType && entityId === this.entityId){
                   this.manageSubscription(subscription)
                }
            },
            deactivateFollowBtn() {
                this.disabled = true
            },
            reactivateFollowBtn() {
                this.disabled = false
            },
            showActionSucceededMessage(subscribeableName) {

                let entity = Entities.find( entity => entity.type === this.entityType),
                action = this.subscribed ? 'added' : 'deleted',
                notificationText = `Successfully ${entity.subscriptionActions[action]} ${entity.tag}/${subscribeableName}`

                __showSuccessMessage(notificationText,4000);
            },
            manageSubscription(subscription) {

                if(this.subscribed) {
                    this.subscriptions = this.subscriptions.filter(s => s.id !== subscription.id)
                }
                else {
                    this.subscriptions = [...this.subscriptions,subscription]
                }

                this.sendUpdatesToParentEntity()
            },
            sendUpdatesToParentEntity() {
                this.$emit('update-subscriptions',this.subscriptions)
            },
            toggleButtonHover() {
                this.hovered = !this.hovered
            }
        }
    }
</script>

<style scoped>

    .btn-outline-primary:hover {
        color: #3490dc;
        border-color: #3490dc;
        background-color: white;
    }

    .btn-primary:hover {
        color: #fff;
        background-color: #3490dc;
        opacity: 0.7;
        border-color: #3490dc;
    }

    .btn-sm {
        width: 75px !important;
    }

    .follow-button.btn:focus {
        box-shadow: none;
    }

</style>