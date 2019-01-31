'use strict'

const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const uploadcare = require('uploadcare')('demopublickey', 'demoprivatekey')
const moment = require('moment')

const app = express()
const data = require('./data/data.json')
const port = 3000
const liveReloadPort = 35729

app.set('view engine', 'ejs')

app.use(express.static('static'))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.use(require('connect-livereload')({
    port: liveReloadPort
}))

app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.header('Expires', '-1')
    res.header('Pragma', 'no-cache')
    next()
})

app.get('/', (req, res) => {
    res.render('pages/index', {data: data, moment: moment})
})

app.post('/', (req, res) => {
    console.log(req.body)
    // uploadcare.groups.info(req.body.files.slice(21, req.body.files.length - 1), (err, data) => {
    //     console.log(data)
    // })
    res.render('pages/index', {data: data, moment: moment})
})

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Express server listening on http://localhost:%d in %s mode.', port, app.get('env'))
})
