// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/index'
import VueRouter from 'vue-router'
import router from './router'
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faGlobe,
  faMapMarkerAlt,
  faPhone,
  faClock
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

library.add(faGlobe, faMapMarkerAlt, faPhone, faClock)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// setting router
Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: `
  <div id="app">
    <router-view></router-view>
  </div>
`
})
