import Vue from 'vue'

require('./bootstrap');

import './global-components'
import './global-functions'
import './prototype-functions'
import * as filters from './filters'
import constantsPlugin from './constants'

import router from './router'

import VueEditor  from "vue2-editor"
import Notifications from 'vue-notification'
import moment from 'vue-moment'

import axios from 'axios'
import hashids from 'hashids'


// filters
for(const keyName in filters) {
    Vue.filter(keyName,filters[keyName]);
}

// plugins
Vue.use(constantsPlugin);
Vue.use(VueEditor);
Vue.use(Notifications);
Vue.use(moment);

window.events = new Vue();
window.Axios = axios;
window.Hashids = new hashids();

Vue.config.devtools = false
Vue.config.debug = false
Vue.config.silent = true
Vue.config.productionTip = false

const app = new Vue({
    el: '#app',
    router,
});
