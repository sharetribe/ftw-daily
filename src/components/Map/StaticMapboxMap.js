import React, { Component } from 'react';
import { string, shape, number, object } from 'prop-types';
import polyline from '@mapbox/polyline';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import { circlePolyline } from '../../util/maps';
import config from '../../config';

const formatColor = color => {
  return color.replace(/^#/, '');
};

const fuzzyCircleOverlay = (center, coordinatesConfig) => {
  const {
    strokeWeight,
    strokeColor,
    strokeOpacity,
    fillColor,
    fillOpacity,
  } = coordinatesConfig.circleOptions;
  const path = circlePolyline(center, coordinatesConfig.coordinateOffset);
  const styles = `-${strokeWeight}+${formatColor(strokeColor)}-${strokeOpacity}+${formatColor(
    fillColor
  )}-${fillOpacity}`;
  return `path${styles}(${encodeURIComponent(polyline.encode(path))})`;
};

const customMarkerOverlay = (center, coordinatesConfig) => {
  const { markerURI } = coordinatesConfig.customMarker;
  return `url-${encodeURIComponent(markerURI)}(${center.lng},${center.lat})`;
};

const markerOverlay = center => {
  return `pin-s(${center.lng},${center.lat})`;
};

const mapOverlay = (center, coordinatesConfig) => {
  if (coordinatesConfig.fuzzy) {
    return fuzzyCircleOverlay(center, coordinatesConfig);
  }
  if (coordinatesConfig.customMarker) {
    return customMarkerOverlay(center, coordinatesConfig);
  }
  return markerOverlay(center);
};

class StaticMapboxMap extends Component {
  render() {
    const { address, center, zoom, coordinatesConfig, dimensions } = this.props;
    const { width, height } = dimensions;

    const libLoaded = typeof window !== 'undefined' && window.mapboxgl;
    if (!libLoaded) {
      return null;
    }

    const overlay = mapOverlay(center, coordinatesConfig);
    const src =
      'https://api.mapbox.com/styles/v1/mapbox/streets-v10/static' +
      (overlay ? `/${overlay}` : '') +
      `/${center.lng},${center.lat},${zoom}` +
      `/${width}x${height}` +
      `?access_token=${window.mapboxgl.accessToken}`;

    return <img src={src} alt={address} />;
  }
}
StaticMapboxMap.defaultProps = {
  address: '',
  center: null,
  zoom: config.coordinates.fuzzy ? config.coordinates.fuzzyDefaultZoomLevel : 11,
  coordinatesConfig: config.coordinates,
};

StaticMapboxMap.propTypes = {
  address: string,
  center: shape({
    lat: number.isRequired,
    lng: number.isRequired,
  }).isRequired,
  zoom: number,
  coordinatesConfig: object,

  // from withDimensions
  dimensions: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,
};

export default lazyLoadWithDimensions(StaticMapboxMap, { maxWidth: '640px' });
