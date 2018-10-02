export default {
  setPlaces (state, places) {
    state.places = state.places.concat(places.map((val) => ({
      lat: val.geometry.location.lat,
      lng: val.geometry.location.lng,
      name: val.name,
      photos: val.photos || null,
      place_id: val.place_id,
      rating: val.rating,
      vicinity: val.vicinity,
      opening_hours: val.opening_hours
    })))
  },
  setLocation (state, location) {
    state.location = location
  },
  setDetail (state, res) {
    state.detail = res.data.result
  },
  setPageTokens (state, token) {
    state.pageTokens.add(token)
  },
  setNextPageToken (state, token) {
    state.nextPageToken = token
  }
}
