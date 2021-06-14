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
        'REDDIT_ALIEN': "https://drive.google.com/uc?export=view&id=1u3yoLkGvgI3uAs7OB6XlN5V6CfAQrJTP",
        'SNOO_DISCOVERY': "https://drive.google.com/uc?export=view&id=1zKrwRKj5crn-C9moT98epxHPIV68UplA",
        'SNOO_THOUGHTFUL': "https://drive.google.com/uc?export=view&id=1pzRKqaIEW8IVo9REVME0dNYDBu1m9TIT",
        'SNOO_HAPPY': "https://drive.google.com/uc?export=view&id=1J7qnKqk6kizFnPLTJimR_6MmhH3eLXcQ",
        'PAGE_404': "https://drive.google.com/uc?export=view&id=1HDAqNG9g74LIhnaR0vC2UB9YdrVEWwzr",
        'PRIVATE_KEY': "https://drive.google.com/uc?export=view&id=1fn8W4mlDvj9Xf9HihKVWKW00e5dkim4z",
        'CAMERA': "https://drive.google.com/uc?export=view&id=1TRHnsEPTYdsd8-oZtTASfYsmjpvKWFpf"
    } 
}    

constants.install = function(Vue) {
    Vue.prototype.$getConst = (key) => {
        return constants[key]
    }    
}    

export default constants;
