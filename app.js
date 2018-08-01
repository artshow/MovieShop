const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/static', express.static('public'))

app.set('view engine', 'pug')

const mainRoutes = require('./routes')
const help = require('./routes/help')

app.use(mainRoutes)
app.use('/help', help)

app.listen(8000, () => {
  console.log('App Movie Shop started')
})
