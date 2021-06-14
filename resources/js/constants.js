const constants = {
    'REDDIT_POSTING_RULES' : [
        'Remember the human',
        'Behave like you would in real life',
        'Look for the original source of content',
        'Search for duplicates before posting',
    ],
    'CUSTOM_EDITOR_TOOLBAR' : [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['blockquote', 'code-block'],
    ],
    'COMMENTS_DEPTH': 10,
    'POSTS_PER_PAGE_NUMBER': 4,
    'images': {
        'REDDIT_ALIEN': "/storage/img/reddit-alien.png",
        'SNOO_DISCOVERY': "/storage/img/snoo_discovery.png",
        'SNOO_THOUGHTFUL': '/storage/img/snoo_thoughtful.png',
        'SNOO_HAPPY': "/storage/img/snoo-happy.png",
        'PAGE_404': "/storage/img/page404.png",
        'PRIVATE_KEY': "/storage/img/private.png",
        'CAMERA': "/storage/img/camera.png"
    },
}    

constants.install = function(Vue) {
    Vue.prototype.$getConst = (key) => {
        return constants[key]
    }    
}    

export default constants;
