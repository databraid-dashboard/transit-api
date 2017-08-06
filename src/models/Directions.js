require('dotenv').config();

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
  Promise,
});

class Directions {
  getDirections(apiQuery) {
    const currentUtcTimeInSeconds = Math.round(Date.now() / 1000);

    return googleMapsClient.directions(apiQuery).asPromise()
      .then((response) => {
        if (response.json.status !== 'OK') {
          return response.json;
          // return res.sendStatus(404);
        }

        // sometimes Google Directions returns routes without
        // arrival_time and departure_time so we exclude them
        response.json.routes = response.json.routes.filter(route =>
          route.legs[0].arrival_time && route.legs[0].departure_time);

        // sort multiple routes by best option
        if (response.json.routes.length > 1) {
          response.json.routes.sort((a, b) => (
            ((a.legs[0].arrival_time.value - currentUtcTimeInSeconds)
              + a.legs[0].departure_time.value) -
            ((b.legs[0].arrival_time.value - currentUtcTimeInSeconds)
              + b.legs[0].departure_time.value)
          ));
        }

        return response.json.routes.slice(0, 2);
      })
      .catch(err => err);
  }
}

module.exports = Directions;
