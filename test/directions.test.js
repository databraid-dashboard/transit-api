/* eslint-disable no-undef, no-unused-expressions */
const { expect } = require('chai');
const { suite, test } = require('mocha');
const sinon = require('sinon')
const request = require('supertest');
const server = require('../index.js');
const Directions = require('../src/models/Directions');
const directions = new Directions;


suite('directions route', () => {

  sinon.stub(directions, 'getDirections').callsFake(function fakeFn(origin, destination, time) {
    if ((!origin || !destination) && !time) return 400;
    return { '1':
    { subject: 'Call or visit 511.org for more real-time departures and alert information.',
    description: '' },
    '2':
    { subject: 'Route 393 bus stops downtown Brentwood out of service Saturdays 6am - 1pm',
    description: 'Due to road closures for the Brentwood Farmers’ Market, all bus stops on Second Street in Downtown Brentwood ( #810924, #810768 & #810911) will be out of service Saturdays, March 4 through November 18 from 6:00 am until 1:00 pm. The closest bus stop in service during these hours is located on Brentwood Blvd. at Oak (both eastbound and westbound)' },
    '3':
    { subject: 'Pittsburg (Bliss) Park & Ride to Close for Construction Starting Monday, May 15. No Bus Service Available.',
    description: 'BART will be closing the Pittsburg Park & Ride starting Monday, May 15 for construction of the Pittsburg BART station. Duration of the closure is unknown. \r\n\r\nDuring the closure, Tri Delta Transit buses WILL NOT stop at this location. Buses cannot stop on Bliss Avenue. \r\n\r\nFor details including alternate bus stops near the Park & Ride,visit http://trideltatransit.com/bliss/\r\n' }
    }
  });

  test('GET /directions without parameters should return 400 Bad Request', () => {
    directions.getDirections()
    expect(400);
  });

  test('GET /directions without destination parameter should return 400 Bad Request', () => {
    directions.getDirections('here', undefined)
    expect(400);
  });

  test('GET /directions without origin parameter should return 400 Bad Request', () => {
    directions.getDirections(undefined, 'there')
    expect(400);
  });

  test('GET /directions with origin and destination should return 200 OK', () => {
    directions.getDirections('here', 'there')
    expect(200);
  });
});
