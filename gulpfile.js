'use strict'

const { watch } = require('gulp')
const lr = require('gulp-livereload')
const nodemon = require('gulp-nodemon')
const liveReloadPort = 35729


function runProject () {
    nodemon({
        script: 'index.js'
    }).on('restart', () => {
        console.log('Restarted!')
    })

    lr.listen(liveReloadPort)

    watch(['public/**', 'routes/**', 'views/**'], (cb) => {
        lr.reload()
        cb()
    })
}
exports.default = runProject