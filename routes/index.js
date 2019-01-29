'use strict'

module.exports = function (app) {
    app.get('/', (req, res) => {
        res.render('pages/index')
    })

    app.get('/about', (req, res) => {
        res.render('pages/about')
    })
}
