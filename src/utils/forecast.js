const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + encodeURIComponent(latitude)+ '&longitude=' +  encodeURIComponent(longitude)+ '&current_weather=true'
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service', undefined)
    
        }
        else if (body.error){
            callback('Unable to find weather at this location.Try another', undefined)
        } 
        else{
            callback(undefined, {temperature: body.current_weather.temperature,
                windspeed: body.current_weather.windspeed} )
        }
    })
}

module.exports = forecast


