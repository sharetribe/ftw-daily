import React, { Component } from 'react';
import { number, object, shape, string } from 'prop-types';
import pick from 'lodash/pick';
import isEqual from 'lodash/isEqual';
import polyline from '@mapbox/polyline';
import { encodeLatLng, stringify } from '../../util/urlHelpers';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import { circlePolyline } from '../../util/maps';
import config from '../../config';

const DEFAULT_COLOR = 'FF0000';
const DEFAULT_STROKE_OPACITY = 0.3;
const DEFAULT_FILL_OPACITY = 0.2;

// Extract color from string. Given value should be either with '#' (e.g. #FFFFFF') or without it.
const formatColorFromString = color => {
  if (typeof color === 'string' && /^#[0-9A-F]{6}$/i.test(color)) {
    return color.substring(1).toUpperCase();
  } else if (typeof color === 'string' && /^[0-9A-F]{6}$/i) {
    return color.toUpperCase();
  } else {
    return DEFAULT_COLOR;
  }
};

// Convert opacity from floating point value (0.0 -> 1.0) to a hexadecimal format
const convertOpacity = opacity => {
  if (typeof opacity === 'number' && !isNaN(opacity) && opacity >= 0 && opacity <= 1) {
    // 0.2 => 20
    return Math.floor(opacity * 255)
      .toString(16)
      .toUpperCase();
  }
};

// Draw a circle polyline for fuzzy location.
const drawFuzzyCircle = (mapsConfig, center) => {
  if (!(mapsConfig && typeof mapsConfig === 'object' && center && typeof center === 'object')) {
    return '';
  }

  const fillColor = mapsConfig.fuzzy.circleColor;
  const fillOpacity = 0.2;
  const strokeColor = mapsConfig.fuzzy.circleColor;
  const strokeWeight = 1;

  const circleRadius = mapsConfig.fuzzy.offset || 500;
  const circleStrokeWeight = strokeWeight || 1;
  const circleStrokeColor = formatColorFromString(strokeColor);
  const circleStrokeOpacity = convertOpacity(DEFAULT_STROKE_OPACITY);
  const circleFill = formatColorFromString(fillColor);
  const circleFillOpacity = convertOpacity(fillOpacity || DEFAULT_FILL_OPACITY);

  // Encoded polyline string
  const encodedPolyline = polyline.encode(circlePolyline(center, circleRadius));

  const polylineGraphicTokens = [
    `color:0x${circleStrokeColor}${circleStrokeOpacity}`,
    `fillcolor:0x${circleFill}${circleFillOpacity}`,
    `weight:${circleStrokeWeight}`,
    `enc:${encodedPolyline}`,
  ];

  return polylineGraphicTokens.join('|');
};

// Get custom marker data for static map URI
const customMarker = (options, lat, lng) => {
  const { anchorX, anchorY, url } = options;
  return [`anchor:${anchorX},${anchorY}`, `icon:${url}`, `${lat},${lng}`].join('|');
};

class StaticGoogleMap extends Component {
  shouldComponentUpdate(nextProps, prevState) {
    // Do not draw the map unless center, zoom or dimensions change
    // We want to prevent unnecessary calls to Google Maps APIs due
    const currentData = pick(this.props, ['center', 'zoom', 'dimensions']);
    const nextData = pick(nextProps, ['center', 'zoom', 'dimensions']);
    return !isEqual(currentData, nextData);
  }

  render() {
    const { center, zoom, address, mapsConfig, dimensions } = this.props;
    const { lat, lng } = center || {};
    const { width, height } = dimensions;

    // Extra graphics for the static map image
    // 1. if fuzzy coordinates are used, return circle path
    // 2. if customMarker is defined in config.js, use that
    // 3. else return default marker
    const targetMaybe = mapsConfig.fuzzy.enabled
      ? { path: drawFuzzyCircle(mapsConfig, center) }
      : mapsConfig.customMarker.enabled
      ? { markers: customMarker(mapsConfig.customMarker, lat, lng) }
      : { markers: `${lat},${lng}` };

    const srcParams = stringify({
      center: encodeLatLng(center),
      zoom,
      size: `${width}x${height}`,
      maptype: 'roadmap',
      key: config.maps.googleMapsAPIKey,
      ...targetMaybe,
    });

    return (
      <img src={`https://maps.googleapis.com/maps/api/staticmap?${srcParams}`} alt={address} />
    );
  }
}

StaticGoogleMap.defaultProps = {
  className: null,
  rootClassName: null,
  address: '',
  center: null,
  zoom: config.maps.fuzzy.enabled ? config.maps.fuzzy.defaultZoomLevel : 11,
  mapsConfig: config.maps,
};

StaticGoogleMap.propTypes = {
  className: string,
  rootClassName: string,
  address: string,
  center: shape({
    lat: number.isRequired,
    lng: number.isRequired,
  }).isRequired,
  zoom: number,
  mapsConfig: object,

  // from withDimensions
  dimensions: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,
};

export default lazyLoadWithDimensions(StaticGoogleMap, { maxWidth: '640px' });
