import Vue from 'vue'

import VueRouter from 'vue-router'

import Home from './components/home'

import UserProfile from './components/userProfile/user-profile'

import UserSettings from './components/userSettings/user-settings'

import CommunityPage from './components/communityPage/community-page'

import CreateCommunity from './components/create-community'

import SubmitPost from './components/submitPost/submit-post'

import PostThreadModal from './components/postThread/post-thread-modal'
import PostThread from './components/postThread/post-thread'

import GlobalSearchResults from './components/globalSearchResults/global-search-results'

import PostNotFound from './components/errors/post-not-found'
import PrivateSubredditError from './components/errors/private-subreddit-error'
import SubredditNotFound from './components/errors/subreddit-not-found'
import UserNotFound from './components/errors/user-not-found'
import PageNotFound from './components/errors/page-not-found'

Vue.use(VueRouter)

function getPostThreadComponent(baseRouteName,threadWithModal = true) {
    
    const threadComponent = threadWithModal ? PostThreadModal : PostThread,
    threadRouteName = threadWithModal ? `${baseRouteName}.postThreadModal` : baseRouteName,
    singleThreadRouteName = threadWithModal ? `${threadRouteName}.postSingleThread` : 'postSingleThread',
    routeMeta = {
        threadRouteName,
        singleThreadRouteName
    }

    return {
        name: threadRouteName,
        component: threadComponent,
        path: '/r/:subreddit/comments/:postId/:postSlug',
        props: true,
        children: [
            {
                name: singleThreadRouteName,
                path: ':threadId',
                meta: {
                    singleThread: true,
                    ...routeMeta
                }
            }
        ],
        meta: {...routeMeta}
    }
}

const routes = [
    getPostThreadComponent('postThread',false),
    {
        name:'popularPosts',
        path: '/r/popular/:sort?',
        component: Home,
        children: [
            getPostThreadComponent('popularPosts')
        ]
    },
    {
        name:'allPosts',
        path: '/r/all/:sort?',
        component: Home,
        children: [
            getPostThreadComponent('allPosts')
        ]
    },
    {
        name: 'submit',
        path: '/submit',
        component: SubmitPost,
        meta: {
            private: true
        }
    },
    {
        name: 'submitToSubreddit',
        path: '/r/:subreddit/submit',
        component: SubmitPost,
        meta: {
            private: true
        }
    },
    {
        name: 'createCommunity',
        path: '/subreddits/create',
        component: CreateCommunity,
        meta: {
            private: true
        }
    },
    {
        name: 'subreddit',
        path: '/r/:subreddit/:sort?',
        component: CommunityPage,
        props: true,
        children: [
            getPostThreadComponent('subreddit')
        ]
    },
    {
        name: 'userProfile',
        path: '/user/:username/:filter?',
        component: UserProfile,
        props: true,
        children: [
            getPostThreadComponent('userProfile')
        ]
    },
    {
        name: 'userSettings',
        path: '/settings/account',
        component: UserSettings,
        meta: {
            private: true
        }
    },
    {
        path: '/search',
        name: 'searchResults', 
        component: GlobalSearchResults,
        props: true,
        children: [
            getPostThreadComponent('searchResults')
        ]
    },
    {
        path: '/post-not-found',
        name: 'post-not-found',
        component: PostNotFound,
        props: true,
        meta: {
            errorPage: true
        }
    },
    {
        path: '/private-subreddit-error',
        name: 'private-subreddit-error',
        component: PrivateSubredditError,
        props: true,
        meta: {
            errorPage: true
        }
    },
    {
        path: '/subreddit-not-found',
        name: 'subreddit-not-found',
        component: SubredditNotFound,
        props: true,
        meta: {
            errorPage: true
        }
    },
    {
        path: '/user-not-found',
        name: 'user-not-found',
        component: UserNotFound,
        props: true,
        meta: {
            errorPage: true
        }
    },
    {
        name:'home',
        path: '/:sort?',
        component: Home,
        children: [
            getPostThreadComponent('home')
        ]
    },
    {
        path: "*",
        name: 'page-not-found',
        component: PageNotFound,
        meta: {
            errorPage: true
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to,from,next) => {
    
    // Checking private routes while taking into account nested routes
    if(to.matched.some(r => r.meta.private ) && !__auth()){
        window.location = '/login'
        return
    }

    next()
})

export default router
