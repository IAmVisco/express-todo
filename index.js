'use strict'

const express = require('express')
const routes = require('./routes/index.js')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000;

app.use('/public', express.static(process.cwd() + '/public/'))
app.set('view engine', 'ejs')

routes(app)

app.get("/", (req, res) => {
    res.send('Main page')
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`)
})
