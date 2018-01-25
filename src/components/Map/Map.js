import React, { Component } from 'react';
import { string, number } from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import CustomMarker from './images/marker-32x32.png';
import css from './Map.css';

/**
 * MapWithGoogleMap uses withGoogleMap HOC.
 * It handles some of the google map initialization states.
 */
const MapWithGoogleMap = withGoogleMap(props => {
  const { center, zoom, address } = props;

  const customMarker = {
    url: CustomMarker,
    // This marker is 32 pixels wide by 32 pixels high.
    size: new window.google.maps.Size(32, 32),
    // The origin for this image is (0, 0).
    origin: new window.google.maps.Point(0, 0),
    // The anchor for the marker is in the bottom center.
    anchor: new window.google.maps.Point(16, 32),
  };

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
      <Marker position={center} icon={customMarker} title={address} />
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
    const { className, rootClassName, mapRootClassName, address, center, zoom } = this.props;
    const classes = classNames(rootClassName || css.root, className);
    const mapClasses = mapRootClassName || css.mapRoot;
    const centerLocationForGoogleMap = { lat: center.lat, lng: center.lng };

    return (
      <MapWithGoogleMap
        containerElement={<div className={classes} onClick={this.onMapClicked} />}
        mapElement={<div className={mapClasses} />}
        center={centerLocationForGoogleMap}
        zoom={zoom}
        address={address}
      />
    );
  }
}

Map.defaultProps = {
  className: '',
  rootClassName: null,
  mapRootClassName: null,
  zoom: 11,
};

Map.propTypes = {
  className: string,
  rootClassName: string,
  mapRootClassName: string,
  address: string.isRequired,
  center: propTypes.latlng.isRequired,
  zoom: number,
};

export default Map;
