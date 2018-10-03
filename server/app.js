// apply environment variables
const config = require('../config/prod.env')
process.env = Object.assign(process.env, config)

const express = require('express')
const fs = require('fs')
const path = require('path')
const port = process.env.PORT || 8080
const linebotParser = require('../src/linebotParser')
const app = express()

const {
  listController,
  detailController
} = require('../src/controllers')

app.use(express.static(path.resolve(__dirname, '../dist')))

app.get('/app/*', function (req, res) {
  var html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})

app.post('/chatbot', linebotParser)

app.get('/api/getList', listController)
app.get('/api/getDetail', detailController)

app.listen(port, function () {
  console.log('Listening on port ' + port)
})
