const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./geocode.js')
const foreCast = require('./forecast.js')
const app = express()

const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//serve up the assest in publicDirectoryPath
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Eliran'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Eliran'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Eliran'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address as a search term!'
        })
    }

    geoCode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if (error){
            return res.send({error})
        }

        foreCast(latitude, longtitude, (error, data) => {
            if (error){
                return res.send({ error })
            }

            return res.send({
                forecast: data,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    req.query
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {title:'404', name:'eliran', errorMessage:'Help article not found!'})
})

app.get('*', (req, res) => {
    res.render('404', {title: '404', name: 'eliran', errorMessage: 'Page not found.'})
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})