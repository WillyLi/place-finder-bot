import axios from 'axios'

const googleKey = process.env.googleKey
const language = 'zh-TW'
export default {
  getList ({
    commit,
    state
  }, payload) {
    let nextPageToken = state.nextPageToken
    if (!state.pageTokens.has(nextPageToken) && nextPageToken !== 'end') {
      axios
        .get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
          params: {
            key: googleKey,
            language,
            pagetoken: nextPageToken,
            ...payload
          }
        })
        .then(res => {
          commit('setPlaces', res.data.results)
          commit('setPageTokens', nextPageToken)
          commit('setNextPageToken', res.data.next_page_token || 'end')

          if (process.env.NODE_ENV === 'development') {
            console.log(res)
          }
        })
        .catch(error => {
          if (process.env.NODE_ENV === 'development') {
            console.log(error)
          }
        })
    }
  },
  getDetail ({
    commit
  }, payload) {
    axios
      .get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json', {
        params: {
          key: googleKey,
          language,
          ...payload
        }
      })
      .then(res => {
        commit('setDetail', res)
        if (process.env.NODE_ENV === 'development') {
          console.log(res)
        }
      })
      .catch(error => {
        if (process.env.NODE_ENV === 'development') {
          console.log(error)
        }
      })
  }
}
