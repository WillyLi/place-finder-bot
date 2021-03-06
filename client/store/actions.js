import axios from 'axios'

const language = 'zh-TW'
export default {
  getList ({
    commit,
    state
  }, payload) {
    let nextPageToken = state.nextPageToken
    if (!state.pageTokens.has(nextPageToken) && nextPageToken !== 'end') {
      commit('setLoading', true)
      axios
        .get(process.env.domain + 'api/getList', {
          params: {
            language,
            pagetoken: nextPageToken,
            location: payload.location,
            rankby: payload.rankby,
            types: payload.types
          }
        })
        .then(res => {
          commit('setPlaces', res.data.results)
          commit('setPageTokens', nextPageToken)
          commit('setLoading', false)
          commit('setNextPageToken', res.data.next_page_token || 'end')
          window.addEventListener('scroll', payload.scrollHandler)

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
      .get(process.env.domain + 'api/getDetail', {
        params: {
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
