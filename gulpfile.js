'use strict'

const { watch } = require('gulp')
const lr = require('gulp-livereload')
const nodemon = require('gulp-nodemon')
const liveReloadPort = 35729

function runProject () {
    nodemon({
        script: 'server.js'
    }).on('restart', () => {
        console.log('Restarted!') // eslint-disable-line no-console
    })

    lr.listen(liveReloadPort)

    watch(['static/**', 'views/**', '*.js'], (cb) => {
        lr.reload()
        cb()
    })
}

exports.default = runProject
