<template>
    <div class="user-dropdown custom-dropdown mr-2">
        <a id="navbarDropdown" class="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div class="d-flex align-items-center">
                <img :src="user.imagePath" class="rounded-sm" width="24" height="24">
                <span class="dropdown-title">{{ user.username }}</span> 
                <div class="dropdown-toggle ml-auto"></div>
            </div>
        </a>
        <div class="dropdown-items-list dropdown-menu" id="user-items" aria-labelledby="navbarDropdown">
            <h3>MY STUFF</h3>
            <a 
                v-for="item in dropDownItems.myStuff" 
                :key="item.name"
                @click.prevent="showItemPage(item)" 
                class="dropdown-item"
            >
                <div class="d-flex">
                    <div class="item-icon" v-html="item.icon"></div>
                    <div class="item-title">{{ item.name }}</div> 
                </div>
            </a>
            <div class="dropdown-divider"></div>
            <a href="https://github.com/webdev-ak/reddit-clone" target="blank" class="dropdown-item">
                <div class="d-flex">
                    <div class="item-icon"><i class="fas fa-code"></i></div>
                    <div class="item-title">Github repository</div> 
                </div>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" @click.prevent="logout">
                <div class="d-flex">
                    <div class="item-icon"><i class="fas fa-sign-out-alt"></i></div>
                    <div class="item-title">Logout</div> 
                </div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: __auth(),
                dropDownItems: {
                    myStuff: [
                        {
                            name: 'Profile',
                            icon: '<i class="fas fa-user"></i>',
                            path: `/user/${__auth().username}`
                        },
                        {
                            name: 'Settings',
                            icon: '<i class="fas fa-cog"></i>',
                            path: '/settings/account'
                        },
                    ]
                }        
            }
        },
        created() {
            window.events.$on('updateUserProp',({ prop, value }) => {
                this.user[prop] = value
            });
        },
        methods: {
            showItemPage({ path }) {
                this.$router.push(path).catch(() => {})
            },
            logout(e) {
                Axios.post('/logout')
                    .then(() => {
                        window.location = '/'
                    })
                    .catch(() => {})
            }    
        },
    }
</script>
