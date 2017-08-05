const express = require('express');
const Directions = require('../models/Directions');

const router = express.Router();
const directions = new Directions();

// only expose these Google Directions API query parameters for now
const validQueryParameters = ['origin', 'destination', 'mode', 'alternatives',
  'arrival_time', 'departure_time', 'transit_mode'];

const validTransportationModes = ['driving', 'walking', 'bicycling', 'transit'];

const validTransitModes = ['bus', 'subway', 'train', 'tram', 'rail'];

router.get('/directions', (req, res) => {
  const request = req.query;

  // remove invalid and empty query parameters
  Object.keys(request).forEach((parameter) => {
    if (!validQueryParameters.includes(parameter) || request[parameter] === '') {
      delete request[parameter];
    }
  });

  if (request.origin === undefined || request.destination === undefined) {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('The origin and desination parameters are required');
  }

  if (request.mode) {
    if (!validTransportationModes.includes(request.mode)) {
      return res
        .status(400)
        .set('Content-Type', 'text/plain')
        .send('Invalid transportation mode');
    }
  }

  if (request.transit_mode) {
    if (!validTransitModes.includes(request.transit_mode)) {
      return res
        .status(400)
        .set('Content-Type', 'text/plain')
        .send('Invalid transit mode');
    }
  }

  if (request.arrival_time && request.departure_time) {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('Only arrival time OR departure time can be specified, not both');
  }

  const apiQuery = {
    origin: request.origin,
    destination: request.destination,
    mode: request.mode || 'transit',
    alternatives: request.alternatives === 'true' || false,
    transit_mode: request.transit_mode || null,
  };

  if (request.arrival_time === undefined) {
    if (request.departure_time) {
      apiQuery.departure_time = request.departure_time;
    } else {
      apiQuery.departure_time = 'now';
    }
  } else {
    apiQuery.arrival_time = request.arrival_time;
  }

  return directions.getDirections(apiQuery)
    .then(routes => res.json(routes))
    .catch((err) => {
      res.status(500).send(`server error: ${err}`);
    });
});


module.exports = router;
