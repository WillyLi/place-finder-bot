<template>
  <div id="finderDetail">
    {{placeID}}
  </div>
</template>

<script>

export default {
  name: 'FinderDetail',
  components: { },
  data: () => {
    return {}
  },
  computed: {
    placeID () {
      return this.$route.query.place_id
    }
  }
}
</script>

<style>
</style>
