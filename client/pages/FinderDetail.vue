<template>
  <div id="finderDetail">
    <Gallery :photos="detail.photos" :height="200" />
    <div class="finderDetail_info">
      <div class="finderDetail_title">{{detail.name}}</div>
      <Rating :score="detail.rating" />
      <div>
        <font-awesome-icon icon="clock" />
        <span v-if="opening" class="opening">營業中</span>
        <span v-if="!opening" class="closing">休息中</span>
      </div>
      <div>
        <font-awesome-icon icon="phone" />
        <span><a :href="'tel:'+detail.formatted_phone_number">{{ detail.formatted_phone_number }}</a></span>
      </div>
      <div>
        <font-awesome-icon icon="map-marker-alt" />
        <span><a :href="googleMapDeepLink">{{ detail.formatted_address }}</a></span>
      </div>
      <div>
        <font-awesome-icon icon="globe" />
        <span><a @click="openWebsite">{{ detail.website }}</a></span>
      </div>
      <ul class="reviews">
        <li v-for="(review ,index) in detail.reviews" :key="index">
          <Review :review="review" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Gallery from '@/components/Gallery'
import Rating from '@/components/Rating'
import Review from '@/components/Review'

export default {
  name: 'FinderDetail',
  components: { Gallery, Rating, Review },
  computed: {
    place_id () {
      return this.$route.query.place_id
    },
    ...mapState({
      detail: state => state.detail
    }),
    opening () {
      if (this.detail.opening_hours) {
        return this.detail.opening_hours.open_now
      } else {
        return null
      }
    },
    googleMapDeepLink () {
      return (
        'comgooglemaps://?q=' +
        this.detail.name +
        '&views=traffic&zoom=15'
      )
    }
  },
  methods: {
    openWebsite () {
      window.liff.openWindow({
        url: this.detail.website,
        external: true
      })
    }
  },
  beforeMount () {
    //  Request place detail data from google place api
    let placeid = this.place_id
    let params =
      { placeid: placeid }
    this.$store.dispatch('getDetail', params)
  }
}
</script>
<style lang="scss" scoped>
.finderDetail {
  &_info {
    text-align: left;
    padding: 20px;
    font-size: 14px;
    & > div {
      margin-bottom: 10px;
      color: #333;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    span {
      margin-left: 5px;
    }
    a {
      text-decoration: none;
      color: #333;
    }
    svg {
      color: #00cc00;
    }
  }
  &_title {
    font-size: 20px;
    font-weight: bold;
  }
}
.closing {
  color: #ac1414;
}
.reviews {
  padding: 0;
  list-style: none;
  & > li {
    margin: 0;
    padding: 20px 0;
    border-bottom: 1px solid #e9e9e9;
  }
}
</style>
