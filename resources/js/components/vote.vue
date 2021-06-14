<template>
    <div class="vote">
        <i 
            class="fas fa-caret-up" 
            :class="{'upvoted': upvoted }" 
            @click.stop="vote('up')"
        >
        </i>
        <div v-if="entityInfo && entityInfo.type === 'Post'">
            <span class="votes-count" :class="[ upvoted ? 'upvoted' : downvoted ? 'downvoted' : '' ]">
                {{ rank | numeralize }}
            </span>
        </div>
        <i 
            class="fas fa-caret-down" 
            :class="{'downvoted': downvoted }" 
            @click.stop="vote('down')"
        >
        </i>
    </div>
</template>

<script>

    export default {
        props: {
            defaultVotes: {
                type: Array,
                required: true,
            },
            entityInfo: {
                required: true,
                type: Object
            },
        },
        data() {
            return {
                votes: this.defaultVotes,
                disabled: false,
                voteId: __uuid(),
            }
        },
        created() {
            window.events.$on('entityVotesUpdated',this.updateEntityVotes) 

            this.listenToEntityNewBroadcastedVotes()
        },
        destroyed() {
            window.events.$off('entityVotesUpdated',this.updateEntityVotes) 
        },
        computed: {
            upVotes() {
                return this.votes.filter(v => v.type === 'up')
            },
            downVotes() {
                return this.votes.filter(v => v.type === 'down')
            },
            upVotesCount() {
                return this.upVotes.length
            },
            downVotesCount() {
                return this.downVotes.length
            },
            rank() {
                return this.upVotesCount - this.downVotesCount;
            },
            upvoted() {
                if( ! __auth()) return false
                return !!this.upVotes.find(v => v.user_id === __auth().id)
            },
            downvoted() {
                if( ! __auth()) return false
                return !!this.downVotes.find(v => v.user_id === __auth().id)
            },
        },
        watch: {
            rank(newRank,oldRank) {
                this.sendNewVotesToTheParentEntity()
                this.sendNewRankToTheParentEntity(newRank)
            }
        },
        methods: {
            updateEntityVotes({entityId, voteId, newVote}) {
                if(voteId !== this.voteId && entityId === this.entityInfo.id ) {
                    this.manageVote(newVote)
                }
            },
            deactivateVoting() {
                this.disabled = true
            },
            reactivateVoting() {
                this.disabled = false
            },
            vote(type) {
                if( ! __auth() ){
                    __openAuth('login')
                    return
                }

                if(this.disabled) return

                this.deactivateVoting()

                Axios.post(`/votes/${type}`, {
                    entityInfo: this.entityInfo,
                })
                    .then( ({ data }) => {
                        
                        this.spreadVoteToSimilarEntities(data)
                        
                        this.manageVote(data)

                        this.reactivateVoting()
                    })
                    .catch(() => {
                        this.reactivateVoting()
                        __showSomethingWentWrongMessage()
                    })
            },
            manageVote(vote) {

                let voteAlreadyExists = this.votes.find( v => v.id === vote.id)

                // delete vote from the frontend too
                if(vote.isDeleted) {
                    this.votes = this.votes.filter(v => v.id !== vote.id)
                }

                // replace vote
                else if(voteAlreadyExists) {
                    this.votes = this.votes.map(v => {
                        if(v.id !== vote.id) return v

                        return vote
                    })
                }
                // add vote as new one
                else {
                    this.votes = [...this.votes,vote]
                }
                
            },
            spreadVoteToSimilarEntities(vote) {
                window.events.$emit('entityVotesUpdated',{
                    entityId:this.entityInfo.id,
                    voteId:this.voteId,
                    newVote:vote
                })
            },
            sendNewRankToTheParentEntity(newRank) {
                this.$emit('newRank',newRank)
            },
            sendNewVotesToTheParentEntity() {
                this.$emit('newVotes',this.votes)
            },
            listenToEntityNewBroadcastedVotes() {
                Echo.channel('vote-channel')
                    .listen('VoteEvent', (e) => {
                        if(e.vote.voteable_id === this.entityInfo.id) {
                            this.manageVote(e.vote)
                        }
                    });
            }
        }
    }
</script>

<style>

    .vote {
        width: 40px;
        border-radius: 0.40rem;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .vote .votes-count {
        font-size: 13px;
        font-weight: 700;
        line-height: 16px;
        pointer-events: none;
        word-break: normal;
    }
    
    .vote .upvoted {
        color: #FF4500;
    }

    .vote .downvoted {
        color: #7193FF;
    }

    .vote i {
        color: #A5A4A4;
        cursor: pointer;
        font-size: 27px;
    }

</style>