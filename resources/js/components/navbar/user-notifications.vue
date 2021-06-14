<template>
    <div class="notifications dropdown mt-1 mr-1">
        <a
            id="navbarDropdown"
            href="#"
            @click.prevent="markNotificationsAsRead()"
            class="notifications-dropdown-toggler nav-link" 
            role="button" data-toggle="dropdown" aria-expanded="false"
        >
            <i class="fas fa-bell">
                <span id="notifications-count" v-show="unreadNotificationsCount > 0">
                    {{ unreadNotificationsCount }}
                </span>
            </i>
        </a>
        <div class="dropdown-menu dropdown-menu-right" >
            <div class="notifications-header border-bottom">
                Notifications
            </div>
            <ul v-if="!loading" class="notificationsList border-0 mb-0">
                <li v-if="notifications.length > 0">
                    <div 
                        class="notification d-flex" 
                        @click="showNotification(notification)"
                        v-for="(notification,index) in notifications" 
                        :key="notification.id"
                        :class="{ 'border-bottom' : index < notifications.length - 1 }"
                    >
                        <div class="d-flex">
                            <img :src="notification.sender.imagePath" width="35" height="35" class="rounded-circle" alt=""/>
                            <div class="notification-content">
                                <div>
                                    <a class="font-weight-bold">{{ notification.sender.username }}</a>
                                    <span>{{ notification.data.action }}</span>
                                </div>
                                <div class="text-light text-muted">
                                    {{ notification.data.created_at | moment("from","now") }}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li v-else>
                   <div class="notification text-center font-weight-bold">
                       You have no notifications
                   </div>
                </li> 
           </ul>
           <loading-simulation
                v-else
                type="user-notifications"
                :occurrences="5"
           >
           </loading-simulation>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                notifications: [],
                unreadNotificationsCount: 0,
                loading: null
            }
        },
        mounted() {
            this.getNotifications();
            this.listenToNewNotifications()
        },
        methods: {
            showNotification( { data: {path} } ) {
                this.$router.push(path).catch(() => {})
            },
            getNotifications() {
                this.loading = true

                Axios.get('/notifications')
                    .then( ({ data }) => {
                        
                        this.notifications = data.notifications
                        this.unreadNotificationsCount = data.unreadNotificationsCount

                        this.loading = false
                    })
                    .catch(() => {
                        this.loading = false
                    })
            },
            markNotificationsAsRead() {
                
                if(this.unreadNotificationsCount === 0) return

                Axios.post('/notifications/markAsRead')
                    .then(() => {
                        this.resetUnreadNotificationsCount()
                    })
                    .catch(() => {})
            },
            resetUnreadNotificationsCount() {
                this.unreadNotificationsCount = 0
            },
            incrementUnreadNotificationsCount() {
                this.unreadNotificationsCount +=1
            },
            listenToNewNotifications() {
                Echo.private('App.User.' + __auth().id)
                    .notification((notification) => {
                        this.notifications = [notification,...this.notifications]
                        this.incrementUnreadNotificationsCount()   
                    })
            },
        },
    }

</script>

<style scoped>

    .notifications-dropdown-toggler i {
        font-size:19px;
        color: #7c7c7c;
    }

    #notifications-count {
        color: white;
        width: 18px;
        height: 18px;
        background-color: red;
        font-size: 9px;
        text-align: center;
        font-family: "Nunito", sans-serif;
        padding-top:5px;
        border-radius: 50% !important;
        position: absolute;
        top:3px;
        right:2px;
    }

    .dropdown-menu {
        border-radius: 0;
        width: 340px;
        margin-top:2px;
        padding: 0;
    }
    
    .notifications-header {
        font-weight: 700 !important;
        padding: 10px 12px;
    }
    
    .notification-content {
        padding: 0 8px;
        font-size:13px;
    }

    .notificationsList {
        padding-left: 0;
        list-style: none;
        background-color: white;
        width: 100%;
        max-height: 300px;
        overflow-y: auto;
        border: 1px solid #ddd;
        z-index: 1;
    }

    .notificationsList li {
        border: none;
    }

    .notificationsList li div.notification {
        padding: 12px;
        cursor: pointer;
    }

    .notificationsList li a {
        color: black;
        text-decoration: none;
    }
    
    .notificationsList li div.notification:hover {background-color: #ddd;}

</style>