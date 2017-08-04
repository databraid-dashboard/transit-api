const { expect } = require('chai');
const { suite, test } = require('mocha');
const sinon = require('sinon')
const request = require('supertest');
const server = require('../index.js');
const Alerts = require('../src/models/Alerts');
const alerts = new Alerts;


suite('alerts route', () => {

  sinon.stub(alerts, 'getAlerts').callsFake(function fakeFn() {
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

test('GET /alerts should return 200 OK', () => {
  alerts.getAlerts()
    expect({ '1':
    { subject: 'Call or visit 511.org for more real-time departures and alert information.',
      description: '' },
   '2':
    { subject: 'Route 393 bus stops downtown Brentwood out of service Saturdays 6am - 1pm',
      description: 'Due to road closures for the Brentwood Farmers’ Market, all bus stops on Second Street in Downtown Brentwood ( #810924, #810768 & #810911) will be out of service Saturdays, March 4 through November 18 from 6:00 am until 1:00 pm. The closest bus stop in service during these hours is located on Brentwood Blvd. at Oak (both eastbound and westbound)' },
   '3':
    { subject: 'Pittsburg (Bliss) Park & Ride to Close for Construction Starting Monday, May 15. No Bus Service Available.',
      description: 'BART will be closing the Pittsburg Park & Ride starting Monday, May 15 for construction of the Pittsburg BART station. Duration of the closure is unknown. \r\n\r\nDuring the closure, Tri Delta Transit buses WILL NOT stop at this location. Buses cannot stop on Bliss Avenue. \r\n\r\nFor details including alternate bus stops near the Park & Ride,visit http://trideltatransit.com/bliss/\r\n' }
    });
});
})
