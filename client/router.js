import VueRouter from 'vue-router'
import Home from '@/pages/Home'
import FinderList from '@/pages/FinderList'
import FinderDetail from '@/pages/FinderDetail'

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [{
    path: '/',
    component: Home
  },
  {
    path: '/app/finder-list',
    component: FinderList,
    query: {
      location: 'private',
      types: 'private'
    }
  },
  {
    path: '/app/finder-detail',
    component: FinderDetail,
    query: {
      place_id: 'private'
    }
  }
  ]
})
