[ ![Codeship Status for databraid-dashboard/transit-api](https://app.codeship.com/projects/459d8c80-5ead-0135-6b43-16bdadfc7181/status?branch=master)](https://app.codeship.com/projects/238758)

# Databraid Transit API

## Description

An API that uses Express to give realtime public transit directions from a starting point to a destination and public transit alerts for the San Francisco Bay Area. This API uses the Google Directions API to retrieve multiple routes and travel information between an origin and a destination for respective routes by public transit. This API uses uses the 511.org API to retrieve alerts information for the bay area and parse the alerts for information on which bus lines are affected.

## Usage
Before beginning:
  1. Make a `.env` file containing a Google Maps API key for the `GOOGLE_MAPS_API_KEY` variable and a 511.org API key for the `FIVE_ONE_ONE_API_KEY` variable. Also set what port the API is running on with the `PORT` variable. A Google Maps API key can be requested from Google [here](https://developers.google.com/maps/documentation/embed/get-api-key). A 511.org API key can be requested [here](https://511.org/developers/list/tokens/create).
  2. Make sure you have [Docker](https://www.docker.com/) installed and running, then run the following commands from termnial:

```
npm i
npm run up
```

