'use strict'

const express = require('express')
const fs = require('fs')

const app = express()
const data = JSON.parse(fs.readFileSync('data/data.json', 'utf8'))
const port = 3000
const liveReloadPort = 35729

app.set('view engine', 'ejs')

app.use(express.static('static'))

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
    res.render('pages/index', {data: data})
})

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Express server listening on http://localhost:%d in %s mode.', port, app.get('env'))
})
