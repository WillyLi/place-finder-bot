const axios = require('axios')
const nearbysearchApi = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'

module.exports.getListParser = function (req, res) {
  let payload = {
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
