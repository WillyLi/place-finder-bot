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
  }
}
</script>

<style>
</style>
