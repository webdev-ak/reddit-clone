<template>
    <div class="form-modal-helper modal fade" :id="modalId" tabindex="-1" role="dialog"  aria-hidden="true">
        <div class="modal-dialog modal-lg my-0 py-3" role="document">
            <div class="d-flex h-100">
                <div class="modal-content">
                    <div class="modal-body p-0 m-0 d-flex">
                        <slot name="form"></slot>
                        <div class="p-2 ml-auto">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
    export default {
        props: {
            modalId: {
                type: String,
                required: true
            }
        },
        created() {
            $(document).on("hidden.bs.modal",'#'+this.modalId, () => {
                
                this.$emit('modalHidden')
                
                //if there is another open modal then keep the body scroll hidden    
                if(!!$('.modal.show')[0]) {
                    $('body').addClass('modal-open')
                } 
            });
        },
    }
</script>

<style scoped>

    .form-modal-helper >>> .art {
       width: 15%;
       border-top-left-radius: 0.3rem;
       border-bottom-left-radius: 0.3rem;
    } 

    .form-modal-helper >>> .form-helper {
        border-top-left-radius: 0.3rem;
        border-bottom-left-radius: 0.3rem;
    }
</style>