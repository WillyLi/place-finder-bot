import axios from 'axios'

const googleKey = process.env.googleKey
const language = 'zh-TW'
export default {
  getList ({
    commit
  }, payload) {
    axios
      .get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params: {
          key: googleKey,
          language,
          ...payload
        }
      })
      .then(res => {
        commit('setPlaces', res)
        commit('setPageToken', res.next_page_token)
        if (process.env.NODE_ENV === 'development') {
          console.log(res)
        }
      })
      .catch(error => {
        if (process.env.NODE_ENV === 'development') {
          console.log(error)
        }
      })
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
