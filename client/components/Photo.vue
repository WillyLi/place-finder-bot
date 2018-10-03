<template>
  <div class="photo" :style="style"></div>
</template>

<script>
const googleKey = process.env.googleKey
const googlePhotoUrl = process.env.googlePhotoUrl
const imagePlaceholder = process.env.imagePlaceholder

export default {
  name: 'photo',
  props: {photo: Object},
  computed: {
    photoURI () {
      if (this.photo === null) {
        return imagePlaceholder
      } else {
        return googlePhotoUrl +
          this.photo.photo_reference +
          '&key=' +
          googleKey
      }
    },

    style () {
      return {'background-image': 'url(' + this.photoURI + ')'}
    }
  }
}
</script>

<style lang="scss" scoped>
.photo {
  height: 100%;
  background-position: center center;
  background-size: cover;
}
</style>
