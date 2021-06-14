<template>
    <div class="container-fluid user-settings p-5">
        <div>
            <h3><i class="fas fa-cog"></i> User Settings</h3>
        </div>
        <div class="user-settings-filter d-flex border-bottom col-md-8 my-4 pl-0">
            <router-link :to="{path:'/settings/account'}" id="account" class="nav-link" exact>Account</router-link>
        </div>

        <div class="account-settings row">
            <div class="col-md-8">
                <h3>Account Settings</h3>
            </div>
            <div class="col-md-8">
                <h4>account preferences</h4>
            </div>
            <div class="col-md-8 mb-4">
                <div class="account-preference">
                    <div>
                        <div class="title">Email Address</div>
                        <p>{{ user.email }}</p>
                    </div>
                    <div>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#updateEmailForm">change</button>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="account-preference">
                    <div>
                        <div class="title">Password</div>
                        <p>password must be at least 6 characters long</p>
                    </div>
                    <div>
                        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#updatePasswordForm">change</button>
                    </div>
                </div>
            </div>
        </div>
       
        <update-password></update-password>
        <update-email></update-email>
    </div>
</template>

<script>
    import updatePassword from './update-password'
    import updateEmail from './update-email'

    export default {
        components: {
            updatePassword,
            updateEmail
        },
        data() {
            return {
                user: __auth(),
            }
        },
    }
</script>

<style scoped>

    .container-fluid {
        background-color: #FFFFFF;
        height: 100%;
    }

    .account-preference {
        display: flex;
        justify-content: space-between;
    }

    .account-preference .title {
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
    }

    .account-preference p {
        font-weight: 400;
        color: #7c7c7c;
    }

    .account-settings h3 {
        font-size: 18px;
        font-weight: 500;
        line-height: 22px;
        padding: 16px 0px 30px;
        margin: 0 auto;
    }

    .account-settings h4 {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: .5px;
        line-height: 12px;
        text-transform: uppercase;
        border-bottom: 1px solid #edeff1;
        color: #7c7c7c;
        margin-bottom: 32px;
        padding-bottom: 6px;
    }
    
   .user-settings-filter a {
        color: #7C7C7C;
        font-size: 14px;
        text-decoration: none;
        font-weight: 600;
        padding: 8px 9px;
    }

    .user-settings-filter a:hover {
        color: #000;
    }

    .user-settings-filter .router-link-active {
        color: #000;
        border-bottom: 2px solid #3490dc;
    }
</style>