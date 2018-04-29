const timers = require('timers');

const fs = require('fs')
const strava = require('strava-v3')
const polyline = require('polyline')

const routes = fs.readFileSync('routes.json', 'utf-8')

JSON.parse(routes).forEach((route, i) => {
  strava.segments.get({ id: route.strava }, (err, payload) => {
    if(!err) {
      console.log(`writing file ${i + 1} of ${JSON.parse(routes).length}`)
      route.polyline = payload.map.polyline
      fs.writeFileSync(`routes/${route.strava}-route.json`, JSON.stringify(route))
    }
    else {
      console.log(err)
    }
  })
})
