# Integrating to map providers

Choice of map provider can significantly impact your costs. Flex Template for Web (FTW) originally supported only [Google Maps](./google-maps.md) out of the box, but after Google increased the pricing of its APIs a lot, the default provider was changed to Mapbox. The template now supports both Mapbox and Google Maps, and the map library used by Mapbox is used also by several other map providers, so integrating new providers that support this is rather easy (see instructions at the end of this doc).

## Setting up the Mapbox integration (the default map provider)

### 1. Generate a Mapbox access key

Sign up for a Mapbox and go to [account page](https://www.mapbox.com/account/). Then click
`Create access token`.

> Read more about
> [access tokens and consider rotating them](https://www.mapbox.com/help/how-access-tokens-work/).

### 2. Setup the application to use the access key

The application uses the `REACT_APP_MAPBOX_ACCESS_TOKEN` environment variable for the key value. For
local development, you can add the variable in the Gitignored `.env` file in the project root:

```
REACT_APP_MAPBOX_ACCESS_TOKEN=my-access-token-here
```

### 3. Setup common locations to reduce typing

The location autocomplete input in the landing page and the topbar can be configured to have
specific locations shown by default when the user focuses on the input and hasn't yet typed in any
searches. This reduces the typing required for common searches and also reduces the need to use
Mapbox geolocation API that much.

To use default searches, another environment variable needs to be set:

```
REACT_APP_DEFAULT_SEARCHES_ENABLED=true
```

The default locations are described in
[src/default-location-searches.js](../src/default-location-searches.js).

The same environment variable also shows "current location" suggestion, which will make the browser
to ask user's current location. This is a fast way to search listings nearby. You can specify
whether to use the current location from [config.js](../src/config.js). Search for variables:
`suggestCurrentLocation` and `currentLocationBoundsDistance`.

### 4. Check rare default configurations

Mapbox geocoding API doesn't always return bounding boxes for locations. Without bounding box
SearchMap component can't adjust zoom level right for that particular place. Therefore there are
default bounding boxes defined to different place types in
[Mapbox specific geocoder](../src/components/LocationAutocompleteInput/GeocoderMapbox.js).

## Changing the map providers

### How to change from Mapbox to Google Maps

It is possible to use Google Map instead of the default map provider. Read more from
[Google Map setup guide](./google-maps.md)

### How to use other map providers

The default map setup of FTW uses library called `mapbox-gl-js`. It is supported by quite many other map
providers too. Thus, if you wish to use a map provider other than Google Maps or Mapbox, first check if the map provider you are considering is supporting this library. If they are, the change might be quite easy. Note: if you change the map tile provider you should also change geocoding API too (i.e. the API endpoint for `LocationAutocompleteInput` component).
