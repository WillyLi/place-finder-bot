<template>
  <div class="place">
    <div class="place_photos">
      <Gallery :photos="placeInfo.photos" :height="200" />
    </div>
    <div class="place_text">
      <div class="place_name">{{placeInfo.name}}</div>
      <div class="place_isOpen">
        <span v-if="opening" class="opening">營業中</span>
        <span v-if="!opening" class="closing">休息中</span>
      </div>
      <div class="place_rating">
        <Rating :score="placeInfo.rating" />
      </div>
      <div class="place_vicinity">{{placeInfo.vicinity}}</div>
    </div>
    <div class="place_actions">
      <a :href="googleMapDeepLink">Google Map</a>
      <a @click="sendMsg">就是這個！</a>
    </div>
  </div>
</template>

<script>
import Rating from '@/components/Rating'
import Gallery from '@/components/Gallery'

export default {
  name: 'place',
  components: { Rating, Gallery },
  props: {placeInfo: Object},
  computed: {
    googleMapDeepLink () {
      return (
        // TODO: Android url scheme
        'comgooglemaps://?q=' +
        this.placeInfo.name +
        '&center=' +
        this.$store.state.location +
        '&views=traffic&zoom=15'
      )
    },
    opening () {
      if (this.placeInfo.opening_hours) {
        return this.placeInfo.opening_hours.open_now
      } else {
        return null
      }
    }
  },
  methods: {
    sendMsg () {
      let placeID = this.placeInfo.place_id
      let placeName = this.placeInfo.name
      window.liff.sendMessages([{
        type: 'text',
        text: '下一站：' + placeName + '，長按此則訊息以轉傳給你同行的夥伴！想知道暸解更多？立刻點擊連結- line://app/1610106375-ngjZ6yyD?place_id=' + placeID
      }])
        .then(() => {
          console.log('message sent')
          window.liff.closeWindow()
        })
        .catch((err) => {
          console.log('error', err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.place {
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
  &_isOpen {
    margin-top: 5px;
    font-size: 14px;
  }
}
.closing {
  color: #ac1414;
}
</style>
