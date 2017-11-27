const express = require('express')
const app = express()
 
app.get('/jobs/add', function (req, res) {
  res.send('add jobs')
})

app.get('/jobs/', function (req, res) {
  res.send('show all jobs')
})

app.get('/jobs/:id', function (req, res) {
  res.send('show jobs id')
})


 
app.listen(3000)
