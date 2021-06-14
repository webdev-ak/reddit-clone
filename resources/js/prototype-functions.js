import Vue from 'vue'

Vue.prototype.$clearObjectAttributes = function(objectName){

    let objectToClear = this[objectName]

    if(!objectToClear) return

    Object.keys(objectToClear).forEach(attributeKey => {
        objectToClear[attributeKey] = ''        
    })

}

Vue.prototype.$checkIfAllAttributesAreFilled = function(objectName){

    let objectToCheck = this[objectName]

    if(!objectToCheck) return

    return Object.keys(objectToCheck).every(attributeKey => objectToCheck[attributeKey].trim())

}


Vue.prototype.$isEditorContentEmpty = (content) => {
    
    let div = document.createElement("div"),
    text = ""
    
    div.innerHTML = content
    
    text = div.textContent || div.innerText

    return !!!text.trim()
}

Vue.prototype.$removeUnusedTextFromEditorContent = function(editor) {

    let editorLastParagraph = editor.find('p')[0] ? editor.find('p').last('p') : null
    
    if( ! editorLastParagraph || editorLastParagraph.text().trim() !== "") return editor[0].innerHTML

    editorLastParagraph.remove()

    return this.$removeUnusedTextFromEditorContent(editor)
}

Vue.prototype.$showPageError = function(routeName,message = '') {

    if(!routeName) return

    this.$router.history.updateRoute(  
        this.$router.match({
            name: routeName,
            params:{
              errorMessage: message
            }
        })
    )
}
