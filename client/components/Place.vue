<template>
  <div class="place">
    <a @click="openDetail">
      <div class="place_photos">
        <Gallery :photos="placeInfo.photos" :height="200" />
      </div>
      <div class="place_text">
        <div class="place_name">{{placeInfo.name}}</div>
        <div class="place_rating">
          <Rating :score="placeInfo.rating" />
        </div>
        <div class="place_vicinity">{{placeInfo.vicinity}}</div>
      </div>
    </a>
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
  props: ['placeInfo'],
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
    },
    openDetail () {
      let placeID = this.placeInfo.place_id
      window.liff.closeWindow()
      window.liff.openWindow([{
        url: 'line://app/' + process.env.detailLiffID + '?place_id=' + placeID
      }])
        .then(() => {
          console.log('detail opened')
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
}
</style>
