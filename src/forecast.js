const request = require('request')

const forecast = (lan, long, callback) => {
    url = 'https://api.darksky.net/forecast/191a7cdb10aa2d846db4fb849e59e01e/' + encodeURIComponent(lan) +',' + encodeURIComponent(long) +'?units=si'
    request({url, json: true}, (error, {body}) => {

        if (error){
            callback('unable to connect to forecast', undefined)
        } else if (body.error){
            callback('unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + '   ' + body.currently.temperature + ' degrees. there is a chance of ' + body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports = forecast