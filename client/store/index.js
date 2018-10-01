import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import 'normalize.css'
import '@/assets/main.scss'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    places: [],
    location: '',
    detail: {}
  },
  getters,
  actions,
  mutations
})
export default store
