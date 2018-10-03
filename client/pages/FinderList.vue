<template>
  <div class="finderList">
    <ul>
      <li v-for="place in places" :key="place.place_id">
        <Place :placeInfo="place" />
      </li>
    </ul>
    <div class="loading" v-if="isLoading"><img src="../assets/loading.gif" alt=""></div>
    </div>
</template>

<script>
import Place from '@/components/Place'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'finder-list',
  components: { Place },
  data () {
    return {
      scrollThreshold: 300,
      rankby: 'distance',
      location: '',
      type: '',
      scrollElement: {}
    }
  },
  computed: {
    ...mapState({
      places: state => state.places,
      isLoading: state => state.isLoading
    })
  },
  methods: {
    scrollHandler () {
      let scrollTop = this.scrollElement.element[this.scrollElement.attr]
      let bodyHeight = document.querySelector('#app').clientHeight
      let windowHeight = window.innerHeight
      if (bodyHeight - windowHeight - this.scrollThreshold <= scrollTop) {
        window.removeEventListener('scroll', this.scrollHandler)
        this.getList({
          location: this.location,
          rankby: this.rankby,
          types: this.type,
          scrollHandler: this.scrollHandler
        })
      }
    },
    ...mapActions(['getList'])
  },
  created () {
    this.location = this.$route.query.location.trim()
    this.type = this.$route.query.types.trim()

    // define which scrollElement should be watched
    if (typeof window.pageYOffset !== 'undefined') {
      this.scrollElement = {element: window, attr: 'pageYOffset'}
    } else if (typeof document.compatMode !== 'undefined' && document.compatMode !== 'BackCompat') {
      this.scrollElement = {element: document.documentElement, attr: 'scrollTop'}
    } else if (typeof document.body !== 'undefined') {
      this.scrollElement = {element: document.body, attr: 'scrollTop'}
    }

    this.$store.commit('setLocation', location)
    this.getList({
      location: this.location,
      rankby: this.rankby,
      types: this.type,
      scrollHandler: this.scrollHandler
    })
  },
  mounted () {
    window.addEventListener('scroll', this.scrollHandler)
  }
}
</script>

<style lang="scss" scoped>
.finderList {
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    background: #eaeaea;
  }
  li {
    background: #ffffff;
    border: 1px solid #dddddd;
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
  }
}
.loading {
  width: 100%;
  text-align: center;
  height: 50px;
  line-height: 50px;
  img {
    height: 50px;
  }
}
</style>
