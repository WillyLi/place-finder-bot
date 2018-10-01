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
  methods: {
    scrollHandler () {
      let location = this.$route.query.location.trim()
      let type = this.$route.query.types.trim()
      if (document.querySelector('body').offsetHeight - window.innerHeight <= document.documentElement.scrollTop) {
        this.$store.dispatch('getList', {
          location,
          rankby: 'distance',
          types: type
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
