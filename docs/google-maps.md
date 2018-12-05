# Google Maps

Flex Template for Web (FTW) offers out of the box support for Google Maps API for showing a map and
searching locations with search autocompletion. This document describes how to set up the API key
for the API requests to work properly.

> Note: before making the change to Google Maps, you should consider if you are OK with their
> current pricing. There's a pricing calculator available in their
> [pricing page](https://cloud.google.com/maps-platform/pricing/). FTW's default map provider is
> Mapbox, which is often cheaper.
> [Learn more about how to use Mapbox or some other map provider instead of Google Maps](https://github.com/sharetribe/flex-template-web/blob/e6034c7690c095553f44092b032689cd6b6f7546/docs/map-providers.md).

## Generate a Google Maps API key

Go to the
[Google Maps JavaScript API V3 Reference](https://developers.google.com/maps/documentation/javascript/reference),
click on the "GET A KEY" button in the top bar, and follow the instructions. You can copy the given
key to your application now.

## Enable Google Places API Web Service

Follow the instructions in the
[Getting started](https://developers.google.com/maps/documentation/javascript/places#GetStarted)
section of the Places library documentation to enable using the Google Places API Web Service. Also
Maps Static API and Maps Javascript API need to be enabled.

## Setup the application to use the API key

The application uses the `REACT_APP_GOOGLE_MAPS_API_KEY` environment variable for the key value. For
local development, you can add the variable in the Gitignored `.env` file in the project root:

```
REACT_APP_GOOGLE_MAPS_API_KEY=my-key-here
```

## Setup common locations to reduce typing

The location autocomplete-input in the landing page and the topbar can be configured to have
specific locations shown by default when the user focuses on the input and hasn't yet typed in any
searches. This reduces the typing required for common searches and also reduces the need to use
Google Map Places API that much.

To use default searches, another environment variable needs to be set:

```
REACT_APP_DEFAULT_SEARCHES_ENABLED=true
```

The default locations have been described in file:
[src/default-location-searches.js](../src/default-location-searches.js).

The same environment variable also shows "current location" suggestion, which will make the browser
to ask user's current location. This is a fast way to search listings nearby. You can specify
whether to use the current location from [config.js](../src/config.js). Search for variables:
`suggestCurrentLocation` and `currentLocationBoundsDistance`.

## Change components: use Google Map versions instead of Mapbox

If you wish to use Google Maps instead of Mapbox, you need to make some changes to FTW default
setup.

### 1. Include Google Map script instead of Mapbox scripts

Mapbox related scripts can be removed from index.html and instead use Google Map script described in
comments.

_public/index.html:_

```html
<script src="%PUBLIC_URL%/static/scripts/mapbox/mapbox-sdk.min.js"></script>
<link href="https://api.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.css" rel="stylesheet" />
<script src="https://api.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.js"></script>
<script>
  window.mapboxgl.accessToken = '%REACT_APP_MAPBOX_ACCESS_TOKEN%';
</script>
<!--
  If Google Maps is used instead of Mapbox, you need to include Google's script instead:
  <script src="https://maps.googleapis.com/maps/api/js?key=%REACT_APP_GOOGLE_MAPS_API_KEY%&libraries=places"></script>
-->
```

### 2. Searching with Google's geocoding API

Location search aka LocationAutocompleteInput should use Google Map specific geocoder. The correct
import is written to the comments of LocationAutocompleteInput component.

_src/components/LocationAutocompleteInput/LocationAutocompleteInputImpl.js:_

```js
import Geocoder, { GeocoderAttribution, CURRENT_LOCATION_ID } from './GeocoderMapbox';
// import Geocoder, { GeocoderAttribution, CURRENT_LOCATION_ID } from './GeocoderGoogleMaps';
```

Furthermore, Google Map states in their terms of service that Google logo needs to be visible when
using their geocoding service. It is available as a background image below the autocomplete
predictions. However, there needs to be enough padding for that logo. You can change the padding
through `marketplace.css`.

_src/marketplace.css:_

```js
/* Google Maps needs 72px bottom padding to accommodate logo, Mapbox doesn't have one */
--locationAutocompleteBottomPadding: 8px;
```

### 3. Show correct map on ListingPage (Map component)

Google Map version (containing both static and dynamic maps) can be taken into use by importing
correct map subcomponent.

_src/components/Map/Map.js:_

```js
import { StaticMap, DynamicMap, isMapsLibLoaded } from './MapboxMap';
// import { StaticMap, DynamicMap, isMapsLibLoaded } from './GoogleMap';
```

### 4. SearchMap.js

The most complex change is happening in SearchPage. First, you need to import `SearchMapWithMapbox`
instead of `SearchMapWithGoogleMap`.

_src/components/SearchMap/SearchMap.js:_

Remove this:

```js
import SearchMapWithMapbox, {
  LABEL_HANDLE,
  INFO_CARD_HANDLE,
  getMapBounds,
  getMapCenter,
  fitMapToBounds,
  isMapsLibLoaded,
} from './SearchMapWithMapbox';
```

And add this instead:

```js
import SearchMapWithGoogleMap, {
  LABEL_HANDLE,
  INFO_CARD_HANDLE,
  getMapBounds,
  getMapCenter,
  fitMapToBounds,
  isMapsLibLoaded,
} from './SearchMapWithGoogleMap';
```

Then, in `render` method, you need to put `SearchMapWithGoogleMap` component into use by replacing
`SearchMapWithMapbox` which is defined inside `ReusableMapContainer`. The component with correct
props is already there in the comments:

```js
// When changing from default map provider to Google Maps, you should use the following
// component instead of SearchMapWithMapbox:
//
// <SearchMapWithGoogleMap
//   containerElement={
//     <div id="search-map-container" className={classes} onClick={this.onMapClicked} />
//   }
//   mapElement={<div className={mapRootClassName || css.mapRoot} />}
//   bounds={bounds}
//   center={center}
//   location={location}
//   infoCardOpen={infoCardOpen}
//   listings={listings}
//   activeListingId={activeListingId}
//   mapComponentRefreshToken={this.state.mapReattachmentCount}
//   createURLToListing={this.createURLToListing}
//   onListingClicked={this.onListingClicked}
//   onListingInfoCardClicked={this.onListingInfoCardClicked}
//   onMapLoad={this.onMapLoadHandler}
//   onMapMoveEnd={onMapMoveEnd}
//   zoom={zoom}
// />
```

The only extra step is to make `mapRootClassName` property available from `this.props` at the
beginning of the `render` method.
