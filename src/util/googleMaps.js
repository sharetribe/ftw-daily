import { types as sdkTypes } from '../util/sdkLoader';

const { LatLng: SDKLatLng, LatLngBounds: SDKLatLngBounds } = sdkTypes;

const placeOrigin = place => {
  if (place && place.geometry && place.geometry.location) {
    return new SDKLatLng(place.geometry.location.lat(), place.geometry.location.lng());
  }
  return null;
};

const placeBounds = place => {
  if (place && place.geometry && place.geometry.viewport) {
    const ne = place.geometry.viewport.getNorthEast();
    const sw = place.geometry.viewport.getSouthWest();
    return new SDKLatLngBounds(
      new SDKLatLng(ne.lat(), ne.lng()),
      new SDKLatLng(sw.lat(), sw.lng())
    );
  }
  return null;
};

/**
 * Get a detailed place object
 *
 * @param {String} placeId - ID for a place received from the
 * autocomplete service
 * @param {String} sessionToken - token to tie different autocomplete character searches together
 * with getPlaceDetails call
 *
 * @return {Promise<util.propTypes.place>} Promise that
 * resolves to the detailed place, rejects if the request failed
 */
export const getPlaceDetails = (placeId, sessionToken) =>
  new Promise((resolve, reject) => {
    const serviceStatus = window.google.maps.places.PlacesServiceStatus;
    const el = document.createElement('div');
    const service = new window.google.maps.places.PlacesService(el);
    const fields = ['address_component', 'formatted_address', 'geometry', 'place_id'];
    const sessionTokenMaybe = sessionToken ? { sessionToken } : {};

    service.getDetails({ placeId, fields, ...sessionTokenMaybe }, (place, status) => {
      if (status !== serviceStatus.OK) {
        reject(
          new Error(`Could not get details for place id "${placeId}", error status was "${status}"`)
        );
      } else {
        resolve({
          address: place.formatted_address,
          origin: placeOrigin(place),
          bounds: placeBounds(place),
        });
      }
    });
  });

const predictionSuccessful = status => {
  const { OK, ZERO_RESULTS } = window.google.maps.places.PlacesServiceStatus;
  return status === OK || status === ZERO_RESULTS;
};

/**
 * Get place predictions for the given search
 *
 * @param {String} search - place name or address to search
 * @param {String} sessionToken - token to tie different autocomplete character searches together
 * with getPlaceDetails call
 * @param {Object} searchConfigurations - defines the search configurations that can be used with
 * the autocomplete service. Used to restrict search to specific country (or countries).
 *
 * @return {Promise<{ search, predictions[] }>} - Promise of an object
 * with the original search query and an array of
 * `google.maps.places.AutocompletePrediction` objects
 */
export const getPlacePredictions = (search, sessionToken, searchConfigurations) =>
  new Promise((resolve, reject) => {
    const service = new window.google.maps.places.AutocompleteService();
    const sessionTokenMaybe = sessionToken ? { sessionToken } : {};

    service.getPlacePredictions(
      { input: search, ...sessionTokenMaybe, ...searchConfigurations },
      (predictions, status) => {
        if (!predictionSuccessful(status)) {
          reject(new Error(`Prediction service status not OK: ${status}`));
        } else {
          const results = {
            search,
            predictions: predictions || [],
          };
          resolve(results);
        }
      }
    );
  });

/**
 * Deprecation: use function from src/util/maps.js
 * Cut some precision from bounds coordinates to tackle subtle map movements
 * when map is moved manually
 *
 * @param {LatLngBounds} sdkBounds - bounds to be changed to fixed precision
 * @param {Number} fixedPrecision - integer to be used on tofixed() change.
 *
 * @return {SDKLatLngBounds} - bounds cut to given fixed precision
 */
export const sdkBoundsToFixedCoordinates = (sdkBounds, fixedPrecision) => {
  const fixed = n => Number.parseFloat(n.toFixed(fixedPrecision));
  const ne = new SDKLatLng(fixed(sdkBounds.ne.lat), fixed(sdkBounds.ne.lng));
  const sw = new SDKLatLng(fixed(sdkBounds.sw.lat), fixed(sdkBounds.sw.lng));

  return new SDKLatLngBounds(ne, sw);
};

/**
 * Deprecation: use function from src/util/maps.js
 * Check if given bounds object have the same coordinates
 *
 * @param {LatLngBounds} sdkBounds1 - bounds #1 to be compared
 * @param {LatLngBounds} sdkBounds2 - bounds #2 to be compared
 *
 * @return {boolean} - true if bounds are the same
 */
export const hasSameSDKBounds = (sdkBounds1, sdkBounds2) => {
  if (!(sdkBounds1 instanceof SDKLatLngBounds) || !(sdkBounds2 instanceof SDKLatLngBounds)) {
    return false;
  }
  return (
    sdkBounds1.ne.lat === sdkBounds2.ne.lat &&
    sdkBounds1.ne.lng === sdkBounds2.ne.lng &&
    sdkBounds1.sw.lat === sdkBounds2.sw.lat &&
    sdkBounds1.sw.lng === sdkBounds2.sw.lng
  );
};

/**
 * Calculate a bounding box in the given location
 *
 * @param {latlng} center - center of the bounding box
 * @param {distance} distance - distance in meters from the center to
 * the sides of the bounding box
 *
 * @return {LatLngBounds} bounding box around the given location
 *
 */
export const locationBounds = (latlng, distance) => {
  const bounds = new window.google.maps.Circle({
    center: new window.google.maps.LatLng(latlng.lat, latlng.lng),
    radius: distance,
  }).getBounds();

  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();

  return new SDKLatLngBounds(new SDKLatLng(ne.lat(), ne.lng()), new SDKLatLng(sw.lat(), sw.lng()));
};

/**
 * Helper functions for handling Google OverlayView.
 * Based on https://github.com/tomchentw/react-google-maps/blob/v9.4.5/src/utils/OverlayViewHelper.js
 *
 * @param {element} containerElement - map container
 * @param {object} props - map props
 * @return position offset to allow custom position for the OverlayView
 */
export const getOffsetOverride = (containerElement, props) => {
  const { getPixelPositionOffset } = props;
  //
  // Allows the component to control the visual position of the OverlayView
  // relative to the LatLng pixel position.
  //
  if (typeof getPixelPositionOffset === 'function') {
    return getPixelPositionOffset(containerElement.offsetWidth, containerElement.offsetHeight);
  } else {
    return {};
  }
};

/**
 * Helper functions for handling Google OverlayView
 * Based on https://github.com/tomchentw/react-google-maps/blob/v9.4.5/src/utils/OverlayViewHelper.js
 *
 * @param {MapCanvasProjection} mapCanvasProjection - map projection.
 * @param {object} offset - position offset on map canvas.
 * @param {LatLngBounds} bounds - map bounds.
 *
 * @return styles to render the overlay within the projection.
 */
const getLayoutStylesByBounds = (mapCanvasProjection, offset, bounds) => {
  const ne = mapCanvasProjection.fromLatLngToDivPixel(bounds.getNorthEast());
  const sw = mapCanvasProjection.fromLatLngToDivPixel(bounds.getSouthWest());
  if (ne && sw) {
    return {
      left: `${sw.x + offset.x}px`,
      top: `${ne.y + offset.y}px`,
      width: `${ne.x - sw.x - offset.x}px`,
      height: `${sw.y - ne.y - offset.y}px`,
    };
  }
  return {
    left: `-9999px`,
    top: `-9999px`,
  };
};

/**
 * Helper functions for handling Google OverlayView
 * Based on https://github.com/tomchentw/react-google-maps/blob/v9.4.5/src/utils/OverlayViewHelper.js
 *
 * @param {MapCanvasProjection} mapCanvasProjection - map projection.
 * @param {object} offset - position offset on map canvas.
 * @param {LatLng} position - map position/location.
 *
 * @return  styles to render single coordinate pair within the projection.
 */
const getLayoutStylesByPosition = (mapCanvasProjection, offset, position) => {
  const point = mapCanvasProjection.fromLatLngToDivPixel(position);
  if (point) {
    const { x, y } = point;
    return {
      left: `${x + offset.x}px`,
      top: `${y + offset.y}px`,
    };
  }
  return {
    left: `-9999px`,
    top: `-9999px`,
  };
};

/**
 * Helper functions for handling Google OverlayView
 * Based on https://github.com/tomchentw/react-google-maps/blob/v9.4.5/src/utils/OverlayViewHelper.js
 *
 * @param {MapCanvasProjection} mapCanvasProjection - map projection.
 * @param {object} offset - position offset on map canvas.
 * @param {object} props - map props.
 *
 * @return styles to render an area or a single coordinate pair within the projection.
 */
export const getLayoutStyles = (mapCanvasProjection, offset, props) => {
  const createLatLng = (inst, Type) => {
    return new Type(inst.lat, inst.lng);
  };

  const createLatLngBounds = (inst, Type) => {
    return new Type(
      new window.google.maps.LatLng(inst.ne.lat, inst.ne.lng),
      new window.google.maps.LatLng(inst.sw.lat, inst.sw.lng)
    );
  };

  const ensureOfType = (inst, type, factory) => {
    if (inst instanceof type) {
      return inst;
    } else {
      return factory(inst, type);
    }
  };

  if (props.bounds) {
    const bounds = ensureOfType(props.bounds, google.maps.LatLngBounds, createLatLngBounds);
    return getLayoutStylesByBounds(mapCanvasProjection, offset, bounds);
  } else {
    const position = ensureOfType(props.position, google.maps.LatLng, createLatLng);
    return getLayoutStylesByPosition(mapCanvasProjection, offset, position);
  }
};
