<template>
    <div class="post-thread-modal modal fade" :id="threadModalId" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg py-3 my-0 thread-max-width" role="document">
            <div class="modal-content h-100">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times; close</span>
                    </button>
                </div>
                <div class="modal-body p-0" style="background-color:#DAE0E6">
                   <post-thread
                        :initial-post="$route.params.post"                   
                        :modal="true"
                   >
                   </post-thread>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PostThread from './post-thread'

    export default {
        components: {
            PostThread
        },
        data() {
            return {
                post: null,
                threadModalId: 'postThreadModal',
                pathBeforeModalShow: '',
            }
        },
        created() {
            $(document).on("hidden.bs.modal","#"+this.threadModalId, () => {
                this.updateCurrentRoute()
            })
        },
        mounted() {
            // setTimeout(()=> {
                this.showThreadModal()
            // },400)
        },
        beforeRouteEnter: function(to, from, next) {
            next(vm => {
                vm.pathBeforeModalShow = from.fullPath
            })
        },
        beforeRouteLeave (to, from, next) {
            
            const nextRouteThreadId = to.params.threadId,
            goingOrComingFromThread = nextRouteThreadId || from.params.threadId 

            if(goingOrComingFromThread && to.path !== this.pathBeforeModalShow) {
                
                let route = {
                    name: this.$route.meta.threadRouteName,
                    params: {},
                    replace:true
                }

                if(nextRouteThreadId) {
                    route.name = this.$route.meta.singleThreadRouteName
                    route.params.threadId = nextRouteThreadId
                }

                next(route)

                return
            }

            this.hideThreadMoal()
            
            next()
        },
        methods: {
            showThreadModal() {
                $('#'+this.threadModalId).modal()
                $('.modal-backdrop').css('width','0')
            },
            hideThreadMoal() {
                $('#'+this.threadModalId).modal('hide')
            },
            updateCurrentRoute() {
                if(this.$route.path !== this.pathBeforeModalShow) this.$router.push(this.pathBeforeModalShow).catch(() => {})
            },
        },
    }
</script>

<style scoped>

    .modal.fade .modal-dialog, .fade {
        transition: none;
    }

    .thread-max-width {
        max-width: calc(100% - 160px);
    }
    
    .post-thread-modal {
        bottom: 0;
        height: 100%;
        left: 0;
        position: fixed;
        right: 0;
        top: 30px;
        width: 100%;
        z-index: 50;
        padding-left: 0;
        background-color: rgba(28,28,28,.9);
    }

    .post-thread-modal >>> .postDescription {
        margin-top:12px;
    }

    .modal-header {
        background-color: #000;
        height: 55px;
        color:white;
    }

    .modal-header .close {
        float: right;
        font-size: 1.1rem;
        color: white;
        text-shadow: none;
        opacity: .8;
        font-weight: 100;
    }
</style>