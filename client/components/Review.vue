<template>
  <div class="review">
    <div class="review_photo" :style="photoStyle"></div>
    <div class="review_author">
      {{review.author_name}}
    </div>
    <div class="review_desc">
      <Rating :score="review.rating" />
      <div class="review_time">
        {{review.relative_time_description}}
      </div>
    </div>
    <div class="review_text">
      {{review.text}}
    </div>
  </div>
</template>

<script>
import Rating from '@/components/Rating'

export default {
  name: 'review',
  components: { Rating },
  props: {review: Object},
  computed: {
    photoStyle () {
      return {'background-image': 'url(' + this.review.profile_photo_url + ')'}
    }
  }
}
</script>

<style lang="scss" scoped>
.review {
  padding-left: 40px;
  position: relative;

  &_photo {
    position: absolute;
    left: 0;
    width: 30px;
    height: 30px;
    background-position: center center;
    background-size: contain;
  }
  &_author {
    font-size: 15px;
    font-weight: bold;
  }
  &_text {
    line-height: 1.4em;
  }
  &_text,
  &_desc {
    font-size: 12px;
    margin-top: 5px;
  }
  .rating,
  &_time {
    display: inline-block;
  }
  .rating {
    margin-right: 10px;
  }
}
</style>
