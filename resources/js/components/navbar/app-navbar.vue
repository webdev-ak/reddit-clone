<template>
    <nav class="app-navbar">
        <div class="left-nav-items">
            <a @click.prevent="goHome()" class="home-link">
                <div class="app-logo"></div>
                <div id="appName">reddit</div>
            </a>
            <page-observer v-if="authenticated"></page-observer>
            <search-bar></search-bar>
        </div>
        <div class="right-nav-items">
            <div class="items" v-if="authenticated">
                <user-notifications></user-notifications>
                <user-dropdown-menu></user-dropdown-menu>
            </div>
            <div class="items" v-else>
                <auth-buttons></auth-buttons>
            </div>
        </div>
    </nav>
</template>

<script>
    import PageObserver from './page-observer'
    import SearchBar from './search-bar'
    import UserNotifications from './user-notifications'
    import UserDropdownMenu from './user-dropdown-menu'

    export default {
        components: {
            PageObserver, 
            SearchBar, 
            UserNotifications, 
            UserDropdownMenu 
        },
        computed: {
            authenticated() {
                return !!__auth()
            }
        },
        watch: {
            $route(to,from) {
                if(this.leavingCurrentRoute(to,from)) this.hideAnyOpenDropdownMenu()
            }
        },
        methods: {
            leavingCurrentRoute(to,from) {
                return from.name !== to.name 
            }, 
            hideAnyOpenDropdownMenu() {
                $('a[aria-expanded="true"]').dropdown('hide')
            },
            goHome() {
                if(this.$route.name === 'home' ) {
                    __fetchHomePosts()
                    return
                }
                this.$router.push({ 'name': 'home'}).catch(() => {})
            }
        }
    }
</script>

<style>
    
    .left-nav-items {
        flex-grow: 1;
        margin-right: 5px; 
    }

    .left-nav-items, .right-nav-items .items {
        align-items: center;
    }

    .left-nav-items a.home-link {
        cursor: pointer;
        color: black;
        margin-right: 20px;
        text-decoration: none;
    }

    .custom-dropdown .dropdown-title {
        color: black;
        font-size: 14px;
        font-weight: 500;
        padding-left: 6px;
    }


    .custom-dropdown {
        position: relative;
        width: 270px;
    }
    
    .user-dropdown {
        width: 190px;
    }

    .user-dropdown .dropdown-items-list {
        left: auto;
        right: 0;
    }

    .custom-dropdown .dropdown-items-list  {
        max-height: 300px;
        overflow: auto;
        padding: 10px 0px;
        width: inherit;
    }

    .custom-dropdown .dropdown-items-list, .notifications .dropdown-menu {
        border-top-width: 1px;
        border: 1px solid #edeff1;
        border-top: 0 solid #edeff1;
        border-radius: 0 0 4px 4px;
    }

    .custom-dropdown .dropdown-items-list a.dropdown-item {
        padding: 2px 24px;
    }

    .custom-dropdown .dropdown-items-list .dropdown-item {
        padding: 0;
        cursor: pointer;    
    }

    .custom-dropdown .dropdown-items-list .item-title {
        padding-left: 10px;
    }

    .custom-dropdown .dropdown-items-list h3 {
        margin-top: 10px;
        font-size: 12px;
        color: gray;
        font-weight: 500;
        padding: 1px 24px;
    }

    .custom-dropdown .dropdown-items-list .filter {
        text-align: center;
        padding: 0 24px;
    }

    .custom-dropdown .dropdown-items-list .communities img{
        width: 26px;
        height: 26px;
        border-radius: 50% !important;
    }

    .custom-dropdown .user-img {
        border-radius: 0.2rem !important;
        width: 21px;
        height: 21px;
    }

    .custom-dropdown .dropdown-items-list .item-icon{
        width: 22px;
        text-align: center;
    }

    .custom-dropdown .dropdown-items-list .item-icon i {
        font-size: 18px;
    }

    .custom-dropdown .dropdown-icon i {
        color: gray;
        font-size: 16px;
    }
    
    #navbarDropdown {
        border: 1px solid #fff;
        border-radius: 4px 4px 0 0;
    }
    
    #navbarDropdown:focus, #navbarDropdown:hover  {
        border: 1px solid #edeff1;
    }
    
    #navbarDropdown:focus {
        border-bottom: 1px solid #fff;
    }

    @media(max-width: 1000px) {
        .user-dropdown .dropdown-title {
            display: none;
        }

        .user-dropdown {
            width: 72px;
        }

        .user-dropdown .dropdown-items-list {
            width: 190px;
        }
    }
    
    @media(max-width: 610px) {
        .notifications, .page-observer {
            display: none;
        }
    }

    @media(max-width: 930px) {
        .page-observer .dropdown-title {
            display: none;
        }

        .page-observer {
            width: 72px;
        }

        .page-observer .dropdown-items-list {
            width: 270px;
        }
    }

    @media(max-width: 1066px) {
        #appName {
            display: none;
        }
    }
   
</style>