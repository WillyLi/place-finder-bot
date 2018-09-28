<template>
  <div class="place">
    <div class="place_photo" :style="{'background-image':'url('+photoURI+')'}"></div>
    <div class="place_text">
      <div class="place_name">{{placeInfo.name}}</div>
      <div class="place_vicinity">{{placeInfo.vicinity}}</div>
      <div class="place_rating">
        <Rating :score="placeInfo.rating" />
      </div>
    </div>
    <div class="place_actions">
      <a :href="googleMapDeepLink">Google Map</a>
      <a class="sendmessagebutton">就是這個！</a>
    </div>
  </div>
</template>

<script>
import Rating from '@/components/Rating'
const googleKey = process.env.googleKey
const liff = window.liff
export default {
  name: 'place',
  components: {Rating},
  props: ['placeInfo'],
  data () {
    return {}
  },
  computed: {
    photoURI () {
      if (this.placeInfo.photos) {
        return (
          'https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=' +
          this.placeInfo.photos[0].photo_reference +
          '&key=' +
          googleKey
        )
      } else {
        return process.env.imagePlaceholder
      }
    },
    googleMapDeepLink () {
      return (
        'comgooglemaps://?q=' +
        this.placeInfo.name +
        '&center=' +
        this.$store.state.location +
        '&views=traffic&zoom=15'
      )
    }

  },
  methods: {
    sendMsg () {
      liff.init(function (data) {
        liff.sendMessages([{
          type: 'text',
          text: 'line://app/1610106375-95yDl55L?types=restaurant&location=' + this.$store.state.location
        }])
          .then(() => {
            console.log('message sent')
          })
          .catch((err) => {
            console.log('error', err)
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.place {
  &_photo {
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center center;
  }
  &_actions {
    display: table;
    width: 100%;
    a {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      padding: 10px 0;
      text-decoration: none;
      color: #008800;
      font-weight: bold;
    }
  }
  &_text {
    text-align: left;
    padding: 0 20px;
    margin-top: 10px;
  }
  &_name {
    font-size: 18px;
    font-weight: bold;
  }
  &_vicinity {
    font-size: 13px;
    margin-top: 5px;
  }
}
</style>
