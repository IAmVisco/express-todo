'use strict'

const express = require('express')
const lrServer = require('tiny-lr')()
const routes = require('./routes/index.js')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
const liveReloadPort = 35729

app.use('/public', express.static(process.cwd() + '/public/'))
// app.use(require('connect-livereload')({
//     port: liveReloadPort
// }))
app.set('view engine', 'ejs')

routes(app)

// app.get('/', (req, res) => {
//     res.send('Main page')
// })

app.listen(port, () => {
    console.log("Express server listening on http://localhost:%d in %s mode.", port, app.get("env"))
})
// lrServer.listen(liveReloadPort)