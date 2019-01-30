'use strict'

const express = require('express')
const routes = require('./routes/index.js')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
const liveReloadPort = 35729

app.set('view engine', 'ejs')

app.use('/public', express.static(process.cwd() + '/public/'))

app.use(require('connect-livereload')({
    port: liveReloadPort
}))

routes(app)

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Express server listening on http://localhost:%d in %s mode.', port, app.get('env'))
})
