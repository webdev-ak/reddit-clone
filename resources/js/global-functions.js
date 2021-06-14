
import Vue from 'vue'

const { v4: uuid } = require('uuid')

window.__uuid = () => uuid()

window.__openAuth = (formToOpen) => {
    window.events.$emit('openAuth',formToOpen)
}

window.__sendEntityToPageObserver = (entity) => {
    window.events.$emit('currentEntityDetected',entity)
}

window.__fetchHomePosts = () => {
    window.events.$emit('fetchHomePosts')
}

window.__updateUserProp = ({ prop, value }) => {
    window.events.$emit('updateUserProp',{prop, value})
}

window.__hideModalById = (modalId) => {
    $('#'+modalId).modal('hide')
}

window.__showModalById = (modalId) => {
    $('#'+modalId).modal('show')
}

window.__disablePageScrolling = () => {
    
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop,
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

    window.onscroll = function() { 

        if(this.oldScroll <= this.scrollY && this.scrollY >= scrollTop) { 
            window.scrollTo(scrollLeft, scrollTop) 
        }

        this.oldScroll = this.scrollY
    } 
}

window.__enablePageScrolling = () => {
    window.onscroll = function(){}
}

window.__bottomOfThePageIsHit = () => {
    return $(window).scrollTop() + $(window).height() === ($(document).height())
}

window.__showSomethingWentWrongMessage = (message = null) => {
    Vue.notify({
        group: 'app',
        type: 'error',
        text: message ? message : 'Something went wrong...please try again',
        duration: 2500
    })
}

window.__showSuccessMessage = (message,duration = null) => {
    Vue.notify({
        group: 'app',
        type: 'success',
        text: `${message}`,
        duration: duration ? duration : 2000
    })
}
