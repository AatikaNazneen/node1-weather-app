const request = require('request')
const geocode = (address, callback) =>{
    const url = 'https://us1.locationiq.com/v1/search?key=pk.cdba7f3a203c1750e4820bd135412f0b&q=' + encodeURIComponent(address) + '&format=json&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback("Unable to connect to location services", undefined)
        }
        else if (body.error){
            callback("Unable to find location.Try another location", undefined)
        } 
        else{
            const data = {
                latitude : body[0].lat,
                longitude: body[0].lon, 
                location: body[0].display_name
            }
            callback(undefined, data)
            
        } 
    })

}
module.exports = geocode