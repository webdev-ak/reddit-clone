<template>
    <a class="community-overview dropdown-item">
        <div class="community">
            <img :src="currentCommunity.imagePath" alt="">
            <div class="item-title"> 
                <span class="community-name">r/{{ currentCommunity.name }}</span>
                <div class="community-members-count">
                    {{ currentCommunity.membersCount }} {{ 'member' | pluralize(currentCommunity.membersCount) }}
                </div>
            </div>
        </div>
    </a>
</template>

<script>
    export default {
        props: {
            community: {
                type: Object,
                required: false
            }
        },
        computed: {
            currentCommunity() {
                return this.community
            }
        }
    }
</script>

<style scoped>

    .custom-dropdown .dropdown-items-list a.dropdown-item {
        padding: 2px 10px;
    }

    a.dropdown-item:hover {
        cursor: pointer;
    }
    
    .community {
        display: flex;
        align-items: center;
    }

    .community img {
        width:35px;
        height:35px;
        border-radius: 50%;
    }

    .community .community-members-count {
        color: #6c757d !important;
        font-size: 12px;
    }

    .community span.community-name {
        font-size: 14px;
        font-weight: 600;
        color: #343a40;
        text-decoration: none;
    }

</style>