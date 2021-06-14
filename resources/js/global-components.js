import Vue from 'vue'

Vue.component('app-navbar',require('./components/navbar/app-navbar').default)
Vue.component('auth-buttons',require('./components/navbar/auth-buttons.vue').default)

Vue.component('auth-forms',require('./components/auth/auth-forms').default)
Vue.component('auth-modal',require('./components/auth/auth-modal').default)
Vue.component('reset-password',require('./components/auth/reset-password').default)

Vue.component('about-community',require('./components/about-community').default)

Vue.component('empty-results',require('./components/helpers/empty-results').default)
Vue.component('loading-simulation',require('./components/helpers/loading-simulation.vue').default)
Vue.component('field-feedback',require('./components/helpers/field-feedback').default)

Vue.component('form-helper',require('./components/helpers/form-helper').default)
Vue.component('form-modal-helper',require('./components/helpers/form-modal-helper').default)

Vue.component('follow-button',require('./components/follow-button').default)

