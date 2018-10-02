const axios = require('axios')
const nearbysearchApi = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
const detailApi = 'https://maps.googleapis.com/maps/api/place/details/json'
const googleKey = process.env.googleKey.slice(1, -1)

module.exports.getListParser = function (req, res) {
  let payload = {
    key: googleKey,
    ...req.query
  }
  axios.get(nearbysearchApi, {
    params: payload
  })
    .then(response => {
      res.json({
        ...response.data
      })
    })
    .catch(error => {
      console.log(error)
    })
}

module.exports.getDetailParser = function (req, res) {
  let payload = {
    key: googleKey,
    ...req.query
  }
  axios.get(detailApi, {
    params: payload
  })
    .then(response => {
      res.json({
        ...response.data
      })
    })
    .catch(error => {
      console.log(error)
    })
}
