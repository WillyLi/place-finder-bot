const express = require('express')
const fs = require('fs')
const path = require('path')
const PORT = process.env.PORT || 8080
const app = express()
app.use(express.static(path.resolve(__dirname, '../dist')))

app.get('/', function (req, res) {
  var html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})

app.listen(PORT, function () {})
