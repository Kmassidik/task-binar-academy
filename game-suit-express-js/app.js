const express = require('express')
const app = express()
const port = 3000
const route = require('./routes')

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine
app.use(express.json()) //It parses incoming JSON requests
app.use(express.urlencoded({ extended: true })) //It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/views')); // initialitation path 


app.use(route)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({
    status: `fail`,
    errors: err.message
  })
  next()
})

app.use((err, req, res, next) => {
  res.status(404).json({
    status: 404,
    errors: err.message
  })
  next()
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})