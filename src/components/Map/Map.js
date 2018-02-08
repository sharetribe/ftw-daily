import React, { Component } from 'react';
import { string, number, object } from 'prop-types';
import { withGoogleMap, GoogleMap, Marker, Circle } from 'react-google-maps';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import config from '../../config';

import CustomMarker from './images/marker-32x32.png';
import css from './Map.css';

/**
 * MapWithGoogleMap uses withGoogleMap HOC.
 * It handles some of the google map initialization states.
 */
const MapWithGoogleMap = withGoogleMap(props => {
  const { center, zoom, address, coordinatesConfig } = props;

  const markerIcon = {
    url: CustomMarker,
    // This marker is 32 pixels wide by 32 pixels high.
    size: new window.google.maps.Size(32, 32),
    // The origin for this image is (0, 0).
    origin: new window.google.maps.Point(0, 0),
    // The anchor for the marker is in the bottom center.
    anchor: new window.google.maps.Point(16, 32),
  };

  const marker = <Marker position={center} icon={markerIcon} title={address} />;

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

export class Map extends Component {
  componentDidMount() {
    const mapsLibLoaded = window.google && window.google.maps;
    if (!mapsLibLoaded) {
      throw new Error('Google Maps API must be loaded for the Map component');
    }
  }

  render() {
    const {
      className,
      rootClassName,
      mapRootClassName,
      address,
      center,
      obfuscatedCenter,
      zoom,
      coordinatesConfig,
    } = this.props;
    const classes = classNames(rootClassName || css.root, className);
    const mapClasses = mapRootClassName || css.mapRoot;

    if (coordinatesConfig.fuzzy && !obfuscatedCenter) {
      throw new Error(
        'Map: obfuscatedCenter prop is required when config.coordinates.fuzzy === true'
      );
    }
    if (!coordinatesConfig.fuzzy && !center) {
      throw new Error('Map: center prop is required when config.coordinates.fuzzy === false');
    }

    const location = coordinatesConfig.fuzzy ? obfuscatedCenter : center;
    const centerLocationForGoogleMap = { lat: location.lat, lng: location.lng };

    return (
      <MapWithGoogleMap
        containerElement={<div className={classes} onClick={this.onMapClicked} />}
        mapElement={<div className={mapClasses} />}
        center={centerLocationForGoogleMap}
        zoom={zoom}
        address={address}
        coordinatesConfig={coordinatesConfig}
      />
    );
  }
}

Map.defaultProps = {
  className: null,
  rootClassName: null,
  mapRootClassName: null,
  address: '',
  zoom: config.coordinates.fuzzy ? config.coordinates.fuzzyDefaultZoomLevel : 11,
  coordinatesConfig: config.coordinates,
};

Map.propTypes = {
  className: string,
  rootClassName: string,
  mapRootClassName: string,
  address: string,
  center: propTypes.latlng,
  obfuscatedCenter: propTypes.latlng,
  zoom: number,
  coordinatesConfig: object,
};

export default Map;
