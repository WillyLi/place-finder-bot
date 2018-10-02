<template>
  <div id="finderList">
    <PlaceList />
  </div>
</template>

<script>
import PlaceList from '@/components/PlaceList'

export default {
  name: 'FinderList',
  components: { PlaceList },
  data () {
    return {
      scrollTop: 0,
      bodyHeight: 0,
      windowHeight: 0,
      scrollThreshold: 300
    }
  },
  couputed: {
    offset () {
      return this.bodyHeight - this.windowHeight
    }
  },
  methods: {
    scrollHandler () {
      let location = this.$route.query.location.trim()
      let type = this.$route.query.types.trim()
      if (typeof window.pageYOffset !== 'undefined') {
        this.scrollTop = window.pageYOffset
      } else if (typeof document.compatMode !== 'undefined' &&
             document.compatMode !== 'BackCompat') {
        this.scrollTop = document.documentElement.scrollTop
      } else if (typeof document.body !== 'undefined') {
        this.scrollTop = document.body.scrollTop
      }
      this.bodyHeight = document.querySelector('#app').clientHeight
      this.windowHeight = window.innerHeight
      if (this.bodyHeight - this.windowHeight - this.scrollThreshold <= this.scrollTop) {
        window.removeEventListener('scroll', this.scrollHandler)
        this.$store.dispatch('getList', {
          location,
          rankby: 'distance',
          types: type,
          scrollHandler: this.scrollHandler
        })
      }
    }
  },
  beforeMount () {
    //  Request nearby places data from google place api
    let location = this.$route.query.location.trim()
    let type = this.$route.query.types.trim()
    let params = {
      location,
      rankby: 'distance',
      types: type
    }
    this.$store.commit('setLocation', location)
    this.$store.dispatch('getList', params)

    window.addEventListener('scroll', this.scrollHandler)
  }
}
</script>

<style>
</style>
