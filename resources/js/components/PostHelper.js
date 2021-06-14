import Router from '../router'

export default class PostHelper {

    constructor(post) {
        this.post = post

        this.postInfo = {
            id: post.id,
            type: "Post",
            path:`/r/${post.subreddit.name}/comments/${Hashids.encode(post.id)}/${post.slug}`
        }
    }

    deletePost() {
        if(confirm('Are you sure you wanna delete this post')){
            Axios.delete(`/posts/${this.postInfo.id}`)
                .then(() => {
                    
                    __showSuccessMessage('Post deleted successfully')

                    this.updateCurrentPage()
                })
                .catch(() => __showSomethingWentWrongMessage())
        }
    }

    updateCurrentPage() {
        setTimeout(() => {
            if(!!Router.currentRoute.meta.threadRouteName) {
                window.location = `/r/${this.post.subreddit.name}`
                return
            }
            window.location.reload()
        },1500)
    }
    
    goToPostSubreddit() {
        Router.push(`/r/${this.post.subreddit.name}`)   
    }
    
    goToPostAuthorProfile() {
        Router.push(`/user/${this.post.AuthorUsername}`)   
    }

    showPost() {
        
        const currentRouteName = Router.currentRoute.name
                
        if(!!currentRouteName.match('postThreadModal')) return

        Router.push({
            name: `${currentRouteName}.postThreadModal`,
            params: {
                subreddit: this.post.subreddit.name,
                postId: Hashids.encode(this.post.id),
                postSlug: this.post.slug,
                post:this.post
            }
        })
    }
}