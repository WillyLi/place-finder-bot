<template>
  <div id="finderList">
    <PlaceList />
  </div>
</template>

<script>
import PlaceList from '@/components/PlaceList'
import axios from 'axios'

export default {
  name: 'FinderList',
  components: { PlaceList },
  data: () => {
    return {}
  },
  beforeMount () {
    //  Request nearby places data from google place api
    let location = this.$route.query.test.trim()
    let type = this.$route.query.type.trim()
    let googleKey = process.env.googleKey

    // TODO: cors work around by cors-anywhere
    let uri =
      'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json'
    this.$store.commit('setLocation', location)
    axios
      .get(uri, {
        params: { location, rankby: 'distance', types: type, key: googleKey }
      })
      .then(res => {
        this.$store.commit('setPlaces', res)
        if (process.env.NODE_ENV === 'development') {
          console.log(res)
        }
      })
      .catch(error => {
        if (process.env.NODE_ENV === 'development') {
          console.log(error)
        }
      })
  }
}
</script>

<style>
</style>
