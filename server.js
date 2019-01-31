'use strict'

const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const moment = require('moment')

const app = express()
const data = require('./data/data.json')
const port = process.env.PORT || 3000
const liveReloadPort = 35729

app.set('view engine', 'ejs')

app.use(express.static('static'))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())
if (process.env.NODE_ENV === 'dev') {
    app.use(require('connect-livereload')({
        port: liveReloadPort
    }))
}

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
    let card = req.body
    card.createdAt = moment().format('YYYY-MM-DD')
    data.unshift(card)
    fs.writeFile('./data/data.json', JSON.stringify(data), 'utf8', (err) => {
        if (err) {
            throw err
        }
    })
    res.render('pages/index', {data: data, moment: moment})
})

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Express server listening on http://localhost:%d in %s mode.', port, app.get('env'))
})
