<template>
  <div class="rating">
    <div class="rating_score">{{score}}</div>
    <div class="rating_stars">
      <span :class="'rating_star rating_star-'+ star" v-for="(star,index) in stars" :key="index"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rating',
  props: {score: Number},
  computed: {
    stars () {
      let count = Math.round(this.score * 2) / 2
      let stars = []
      for (let i = 0; i < 5; i++) {
        if (count > 0.5) {
          stars[i] = 'full'
          count -= 1
        } else if (count > 0) {
          stars[i] = 'half'
          count -= 0.5
        } else {
          stars[i] = 'empty'
        }
      }
      return stars
    }
  }
}
</script>

<style lang="scss" scoped>
.rating {
  &_score {
    display: inline-block;
    color: #e7711b;
    vertical-align: middle;
  }
  &_stars {
    display: inline-block;
    vertical-align: middle;
  }
  &_star {
    background: url(//maps.gstatic.com/tactile/omnibox/star-20130618-2x.png)
      no-repeat;
    background-position: 0 1px;
    background-size: 37px 13px;
    display: inline-block;
    height: 13px;
    width: 13px;
    &-empty {
      background-position: -25px 1px;
    }
    &-half {
      background-position: -13px 1px;
    }
  }
}
</style>
