import React, { Component } from 'react';
import { number, object, shape, string } from 'prop-types';
import classNames from 'classnames';
import { circlePolyline } from '../../util/maps';
import config from '../../config';

/**
 * DynamicGoogleMap uses Google Maps API.
 */
class DynamicGoogleMap extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.mapContainer = null;

    this.initializeMap = this.initializeMap.bind(this);
  }

  componentDidMount(prevProps) {
    if (!this.map && this.mapContainer) {
      this.initializeMap();
    }
  }

  initializeMap() {
    const { offsetHeight, offsetWidth } = this.mapContainer;
    const hasDimensions = offsetHeight > 0 && offsetWidth > 0;

    if (hasDimensions) {
      const { center, zoom, address, mapsConfig } = this.props;
      const { enabled, url, anchorX, anchorY, width, height } = mapsConfig.customMarker;
      const maps = window.google.maps;
      const controlPosition = window.google.maps.ControlPosition.LEFT_TOP;

      const mapConfig = {
        center,
        zoom,
        // Disable all controls except zoom
        // https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions

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
      };

      this.map = new maps.Map(this.mapContainer, mapConfig);

      if (mapsConfig.fuzzy.enabled) {
        const GoogleLatLng = window.google.maps.LatLng;
        // Origin as object literal (LatLngLiteral)
        const origin = { lat: center.lat, lng: center.lng };
        const radius = mapsConfig.fuzzy.offset;
        const path = circlePolyline(origin, radius).map(c => new GoogleLatLng(c[0], c[1]));

        const circleProps = {
          options: {
            fillColor: mapsConfig.fuzzy.circleColor,
            fillOpacity: 0.2,
            strokeColor: mapsConfig.fuzzy.circleColor,
            strokeOpacity: 0.5,
            strokeWeight: 1,
            clickable: false,
          },
          path,
          map: this.map,
        };

        // Add a circle. We use Polygon because the default Circle class is not round enough.
        const Polygon = window.google.maps.Polygon;
        new Polygon(circleProps);
      } else {
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

        const marker = new window.google.maps.Marker({
          position: center,
          map: this.map,
          title: address,
          ...markerIcon,
        });
      }
    }
  }

  render() {
    const { containerClassName, mapClassName } = this.props;
    return (
      <div className={containerClassName}>
        <div className={mapClassName} ref={el => (this.mapContainer = el)} />
      </div>
    );
  }
}

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
