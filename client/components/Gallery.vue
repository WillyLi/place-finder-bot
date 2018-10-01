<template>
  <ul class="gallery" :style="style">
    <li v-for="(photo,index) in photos" :key="index" v-if="photos">
      <Photo :photo="photo" />
    </li>
    <li v-if="!photos">
      <Photo :photo="null" />
    </li>
  </ul>
</template>

<script>
import Photo from '@/components/Photo'

export default {
  name: 'gallery',
  components: { Photo },
  props: ['height', 'photos'],
  computed: {
    style () {
      return {height: this.height + 'px'}
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  width: 100%;
  white-space: nowrap;
  font-size: 0;
  overflow: auto;
  list-style: none;
  padding: 0;
}
li {
  width: 100vw;
  display: inline-block;
  height: 100%;
}
</style>
