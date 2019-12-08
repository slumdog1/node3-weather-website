const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZWxpcmFua2QiLCJhIjoiY2szZnh1YTZuMDlwaTNibHUxc2x4Nmk2ZCJ9.kQ09NxqxAK5yvdpaqW6sgQ'

    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0){
            callback('cant find the location!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode