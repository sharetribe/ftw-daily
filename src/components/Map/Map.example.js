import React from 'react';
import Map from './Map';
import { types as sdkTypes } from '../../util/sdkLoader';
import { obfuscatedCoordinates } from '../../util/maps';
import config from '../../config';

const { LatLng } = sdkTypes;

export const WithMarker = {
  component: props => (
    <div style={{ height: 400 }}>
      <Map {...props} />
    </div>
  ),
  props: {
    center: new LatLng(60.16502999999999, 24.940064399999983),
    obfuscatedCenter: new LatLng(60.16502999999999, 24.940064399999983),
    address: 'Sharetribe',
    zoom: 22,
  },
};

export const WithObfuscatedLocation = {
  component: props => (
    <div style={{ height: 400 }}>
      <Map {...props} />
    </div>
  ),
  props: {
    center: new LatLng(60.16502999999999, 24.940064399999983),
    obfuscatedCenter: new LatLng(60.16502999999999, 24.940064399999983),
    address: 'Sharetribe',
    zoom: 14,
    mapsConfig: {
      ...config.maps,
      fuzzy: {
        ...config.maps.fuzzy,
        enabled: true,
      },
    },
  },
};

export const WithCircleLocation = {
  component: props => (
    <div style={{ height: 400 }}>
      <Map {...props} />
    </div>
  ),
  props: {
    center: new LatLng(60.16502999999999, 24.940064399999983),
    obfuscatedCenter: obfuscatedCoordinates(new LatLng(60.16502999999999, 24.940064399999983)),
    address: 'Sharetribe',
    mapsConfig: {
      ...config.maps,
      fuzzy: {
        ...config.maps.fuzzy,
        enabled: true,
      },
    },
  },
};
