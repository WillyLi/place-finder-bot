<template>
  <div class="placeList">
    <ul>
      <li v-for="place in places" :key="place.place_id">
        <Place :placeInfo="place" />
      </li>
    </ul>
    <div class="loading" v-if="isLoading"><img src="../assets/loading.gif" alt=""></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Place from '@/components/Place'

export default {
  name: 'placeList',
  components: { Place },
  computed: mapState({
    places: state => state.places,
    isLoading: state => state.isLoading
  })
}
</script>

<style lang="scss" scoped>
.placeList {
  & > ul {
    padding: 0;
    margin: 0;
    list-style: none;
    background: #eaeaea;
    & > li {
      background: #ffffff;
      border: 1px solid #dddddd;
      margin-top: 20px;
      &:first-child {
        margin-top: 0;
      }
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
