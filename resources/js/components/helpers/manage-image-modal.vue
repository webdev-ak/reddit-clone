<template>
    <div class="manage-image-modal modal fade" :id="modalId" tabindex="-1" role="dialog"  aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered " role="document">
            <div class="modal-content font-weight-bold">
                <div class="modal-header justify-content-center">
                    <h5 class="modal-title">{{ modalTitle }}</h5>
                </div>
                <div class="modal-body p-0">
                    <div class="items">
                        <a href="#" @click.prevent="$emit('uploadNewImage')"  class="text-primary border-bottom">Upload new image</a>
                        <a href="#" @click.prevent="$emit('deleteEntitytImage')" class="text-danger border-bottom">Delete current image</a>
                        <a href="#" class="text-dark" data-dismiss="modal" aria-label="Close">Cancel</a>
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
        },
        entityName: {
            type: String,
            required: true
        }
    },
    computed: {
        modalTitle() {
            return `Change ${this.entityName} Image`
        }
    }
}
</script>

<style scoped>
    .modal-body .items {
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    .modal-body .items a {
        text-decoration: none;
        padding:15px;
    }
</style>