# Google Maps

The Flex template for web uses the Google Maps API for showing a map and in searching locations in
the search autocompletion. This document describes how to setup the API key for the API requests to
work properly.

## Generate a Google Maps API key

Go to the
[Google Maps JavaScript API V3 Reference](https://developers.google.com/maps/documentation/javascript/reference),
click on the "GET A KEY" button in the top bar, and follow the instructions. You can copy the given
key to your application now.

## Enable Google Places API Web Service

Follow the instructions in the
[Getting started](https://developers.google.com/maps/documentation/javascript/places#GetStarted)
section of the Places library documentation to enable using the Google Places API Web Service.

## Setup the application to use the API key

The application uses the `REACT_APP_GOOGLE_MAPS_API_KEY` environment variable for the key value. For
local development, you can add the variable in the Gitignored `.env` file in the project root:

```
REACT_APP_GOOGLE_MAPS_API_KEY=my-key-here
```
