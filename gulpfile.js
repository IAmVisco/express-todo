'use strict'

const { watch } = require('gulp')
const express = require('express')
const livereload = require('gulp-livereload')
const routes = require('./routes/index.js')

const serverPort = process.env.PORT || 3000
const liveReloadPort = 35729

const server = express()
const lrServer = require('tiny-lr')()
server.set('view engine', 'ejs')
server.use('/public', express.static(process.cwd() + '/public'));
server.use(require('connect-livereload')({
    port: liveReloadPort
}))

routes(server)

watch(['public/**', 'routes/**', 'views/**'], (cb) => {
    livereload(lrServer)
    cb()
})

function runProject(cb) {
    server.listen(serverPort, function () {
        console.log('Express server listening on http://localhost:%d in %s mode.', serverPort, server.get('env'))
    })
    livereload.listen(liveReloadPort)
    cb()
}

exports.default = runProject