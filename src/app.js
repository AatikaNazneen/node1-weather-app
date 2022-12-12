const path = require('path')
const express = require('express')
const hbs = require('hbs')
//const cors = require('cors')
const port = process.env.PORT || 3000
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//setting up paths for public and view directory 
//res.query contains information about query string
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
//app.get(url partial, (req,res))
//setting up handlebars
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirPath))
//;app.use(cors())
app.get('',(req,res) => {
    //res.render for handlebars
    res.render( 'index', { title: 'Weather app', name: 'Aatika'})
})

app.get('/about',(req,res) => {
    //res.render for handlebars
    res.render( 'about', { title: 'About', name:'Aatika'})
}) 
app.get('/help',(req,res) => {
    //res.render for handlebars
    res.render( 'help', { title: 'Help' , message: 'Contact Alumni@pieas.edu.pk', name:'Aatika'})
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error:'You must provide an address'})
    }
    else{
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
            if(error){
                 return res.send({error})
            }
           forecast(latitude, longitude, (error, forecastdata) => {
                if(error)
                {
                    return res.send({error: error})
                }
                res.send({
                    location: location,
                    temperature: forecastdata.temperature,
                    windspeed:forecastdata.windspeed,
                    winddirection: forecastdata.winddirection,
                    address: req.query.address})
               })
    })
}})

app.get('/help/*', (req,res) =>{
    res.render('404', {title:"Error", errorText:'Help article not found', name:'aatika'})
})
app.get('*', (req, res) => {
    res.render('404', {title:"Error" , errorText:'Page not found', name:'aatika'})
})
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

/*
app.get('', (req, res) => {
    res.send('Hello express')
}) 
app.get('/help', (req, res) => {
    res.send('help page')
})
app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
}) */
