import React from 'react';
import { number, object, shape, string } from 'prop-types';
import { withGoogleMap, GoogleMap, Marker, Circle } from 'react-google-maps';
import config from '../../config';

/**
 * DynamicMap uses withGoogleMap HOC.
 * It handles some of the google map initialization states.
 */
const DynamicMap = withGoogleMap(props => {
  const { center, zoom, address, coordinatesConfig } = props;

  const { markerURI, anchorX, anchorY, width, height } = coordinatesConfig.customMarker || {};
  const markerIcon = coordinatesConfig.customMarker
    ? {
        icon: {
          url: markerURI,

          // The origin for this image is (0, 0).
          origin: new window.google.maps.Point(0, 0),
          size: new window.google.maps.Size(width, height),
          anchor: new window.google.maps.Point(anchorX, anchorY),
        },
      }
    : {};

  const marker = <Marker position={center} {...markerIcon} title={address} />;

  const circleProps = {
    options: coordinatesConfig.circleOptions,
    radius: coordinatesConfig.coordinateOffset,
    center,
  };

  const circle = <Circle {...circleProps} />;

  return (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={center}
      center={center}
      options={{
        // Disable map type (ie. Satellite etc.)
        mapTypeControl: false,
        // Disable zooming by scrolling
        scrollwheel: false,
        // Fullscreen control toggle
        fullscreenControl: true,
      }}
    >
      {coordinatesConfig.fuzzy ? circle : marker}
    </GoogleMap>
  );
});

DynamicMap.defaultProps = {
  address: '',
  center: null,
  zoom: config.coordinates.fuzzy ? config.coordinates.fuzzyDefaultZoomLevel : 11,
  coordinatesConfig: config.coordinates,
};

DynamicMap.propTypes = {
  address: string,
  center: shape({
    lat: number.isRequired,
    lng: number.isRequired,
  }).isRequired,
  zoom: number,
  coordinatesConfig: object,
};

export default DynamicMap;
