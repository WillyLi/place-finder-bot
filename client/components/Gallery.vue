<template>
  <div ref="swiper" class="swiper-container">
    <div class="gallery swiper-wrapper">
      <div v-for="(photo,index) in photos" :key="index" v-if="photos" class="swiper-slide" :style="style">
        <Photo :photo="photo" />
      </div>
      <div v-if="!photos" class="swiper-slide" :style="style">
        <Photo :photo="null" />
      </div>
    </div>
  </div>
</template>

<script>
import Photo from '@/components/Photo'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'gallery',
  components: { Photo },
  props: ['height', 'photos'],
  data () {
    return {
      loop: true
    }
  },
  computed: {
    style () {
      return {height: this.height + 'px'}
    },
    swiperConfig () {
      return {
        loop: true
      }
    }
  },
  mounted () {
    if (this.photos) {
      this.swiperInstance = new Swiper(this.$refs.swiper, this.swiperConfig)
    }
  },
  beforeDestroy () {
    this.swiperInstance.destroy()
    this.swiperInstance = undefined
  }
}
</script>

<style lang="scss" scoped>
</style>
