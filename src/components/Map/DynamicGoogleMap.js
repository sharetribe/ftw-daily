import React from 'react';
import { number, object, shape, string } from 'prop-types';
import { withGoogleMap, GoogleMap, Marker, Circle } from 'react-google-maps';
import config from '../../config';

/**
 * DynamicGoogleMap uses withGoogleMap HOC.
 * It handles some of the google map initialization states.
 */
const DynamicGoogleMap = withGoogleMap(props => {
  const { center, zoom, address, mapsConfig } = props;

  const { enabled, url, anchorX, anchorY, width, height } = mapsConfig.customMarker;
  const markerIcon = enabled
    ? {
        icon: {
          url,

          // The origin for this image is (0, 0).
          origin: new window.google.maps.Point(0, 0),
          size: new window.google.maps.Size(width, height),
          anchor: new window.google.maps.Point(anchorX, anchorY),
        },
      }
    : {};

  const marker = <Marker position={center} {...markerIcon} title={address} />;

  const circleProps = {
    options: {
      fillColor: mapsConfig.fuzzy.circleColor,
      fillOpacity: 0.2,
      strokeColor: mapsConfig.fuzzy.circleColor,
      strokeOpacity: 0.5,
      strokeWeight: 1,
      clickable: false,
    },
    radius: mapsConfig.fuzzy.offset,
    center,
  };

  const circle = <Circle {...circleProps} />;

  const controlPosition =
    typeof window !== 'undefined' && typeof window.google !== 'undefined'
      ? window.google.maps.ControlPosition.LEFT_TOP
      : 5;

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
        fullscreenControl: false,
        // Street View control
        streetViewControl: false,
        // Zoom control position
        zoomControlOptions: {
          position: controlPosition,
        },
      }}
    >
      {mapsConfig.fuzzy.enabled ? circle : marker}
    </GoogleMap>
  );
});

DynamicGoogleMap.defaultProps = {
  address: '',
  center: null,
  zoom: config.maps.fuzzy.enabled ? config.maps.fuzzy.defaultZoomLevel : 11,
  mapsConfig: config.maps,
};

DynamicGoogleMap.propTypes = {
  address: string,
  center: shape({
    lat: number.isRequired,
    lng: number.isRequired,
  }).isRequired,
  zoom: number,
  mapsConfig: object,
};

export default DynamicGoogleMap;
