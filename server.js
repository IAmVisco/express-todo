'use strict'

const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const moment = require('moment')

const app = express()
const { status, icon } = require('./data/const.json')
const data = require('./data/data.json')
const port = process.env.PORT || 3000
const liveReloadPort = 35729

app.set('view engine', 'ejs')

app.use(express.static('static'))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

if (app.get('env') === 'development') {
    app.use(require('connect-livereload')({
        port: liveReloadPort
    }))

    app.use((req, res, next) => {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
        res.header('Expires', '-1')
        res.header('Pragma', 'no-cache')
        next()
    })
}

app.get('/', (req, res) => {
    res.render('pages/index', {data: data, moment: moment, status: status, icon: icon})
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
    res.render('pages/index', {data: data, moment: moment, status: status, icon: icon})
})

app.post('/filter', (req, res) => {
    let filteredData
    if (req.body.btn === 'find') {
        let filters = req.body.status || []
        filteredData = data.filter(el => filters.includes(el.status))
    }
    else {
        filteredData = data
    }
    res.render('pages/index', {data: filteredData, moment: moment, status: status, icon: icon})
})

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Express server listening on http://localhost:%d in %s mode.', port, app.get('env'))
})
