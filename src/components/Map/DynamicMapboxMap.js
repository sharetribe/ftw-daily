import React, { Component } from 'react';
import { string, shape, number, object } from 'prop-types';
// This MultiTouch lib is used for 2-finger panning.
// which prevents user to experience map-scroll trap, while scrolling the page.
// https://github.com/mapbox/mapbox-gl-js/issues/2618
// TODO: we should add an overlay with text "use two fingers to pan".
import MultiTouch from 'mapbox-gl-multitouch';
import uniqueId from 'lodash/uniqueId';
import { circlePolyline } from '../../util/maps';
import config from '../../config';

const mapMarker = mapsConfig => {
  const { enabled, url, width, height } = mapsConfig.customMarker;
  if (enabled) {
    const element = document.createElement('div');
    element.style.backgroundImage = `url(${url})`;
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    return new window.mapboxgl.Marker({ element });
  } else {
    return new window.mapboxgl.Marker();
  }
};

const circleLayer = (center, mapsConfig, layerId) => {
  const path = circlePolyline(center, mapsConfig.fuzzy.offset).map(([lat, lng]) => [lng, lat]);
  return {
    id: layerId,
    type: 'fill',
    source: {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [path],
        },
      },
    },
    paint: {
      'fill-color': mapsConfig.fuzzy.circleColor,
      'fill-opacity': 0.2,
    },
  };
};

const generateFuzzyLayerId = () => {
  return uniqueId('fuzzy_layer_');
};

class DynamicMapboxMap extends Component {
  constructor(props) {
    super(props);

    this.mapContainer = null;
    this.map = null;
    this.centerMarker = null;
    this.fuzzyLayerId = generateFuzzyLayerId();

    this.updateFuzzyCirclelayer = this.updateFuzzyCirclelayer.bind(this);
  }
  componentDidMount() {
    const { center, zoom, mapsConfig } = this.props;
    const position = [center.lng, center.lat];

    this.map = new window.mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: position,
      zoom,
      scrollZoom: false,
    });
    this.map.addControl(new window.mapboxgl.NavigationControl({ showCompass: false }), 'top-left');
    this.map.addControl(new MultiTouch());

    if (mapsConfig.fuzzy.enabled) {
      this.map.on('load', () => {
        this.map.addLayer(circleLayer(center, mapsConfig, this.fuzzyLayerId));
      });
    } else {
      this.centerMarker = mapMarker(mapsConfig);
      this.centerMarker.setLngLat(position).addTo(this.map);
    }
  }
  componentWillUnmount() {
    if (this.map) {
      this.centerMarker = null;
      this.map.remove();
      this.map = null;
    }
  }
  componentDidUpdate(prevProps) {
    if (!this.map) {
      return;
    }

    const { center, zoom, mapsConfig } = this.props;
    const { lat, lng } = center;
    const position = [lng, lat];

    // zoom change
    if (zoom !== prevProps.zoom) {
      this.map.setZoom(this.props.zoom);
    }

    const centerChanged = lat !== prevProps.center.lat || lng !== prevProps.center.lng;

    // center marker change
    if (this.centerMarker && centerChanged) {
      this.centerMarker.setLngLat(position);
      this.map.setCenter(position);
    }

    // fuzzy circle change
    if (mapsConfig.fuzzy.enabled && centerChanged) {
      if (this.map.loaded()) {
        this.updateFuzzyCirclelayer();
      } else {
        this.map.on('load', this.updateFuzzyCirclelayer);
      }
    }

    // NOTE: mapsConfig changes are not handled
  }
  updateFuzzyCirclelayer() {
    if (!this.map) {
      // map already removed
      return;
    }
    const { center, mapsConfig } = this.props;
    const { lat, lng } = center;
    const position = [lng, lat];

    this.map.removeLayer(this.fuzzyLayerId);

    // We have to use a different layer id to avoid Mapbox errors
    this.fuzzyLayerId = generateFuzzyLayerId();
    this.map.addLayer(circleLayer(center, mapsConfig, this.fuzzyLayerId));

    this.map.setCenter(position);
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

DynamicMapboxMap.defaultProps = {
  address: '',
  center: null,
  zoom: config.maps.fuzzy.enabled ? config.maps.fuzzy.defaultZoomLevel : 11,
  mapsConfig: config.maps,
};

DynamicMapboxMap.propTypes = {
  address: string, // not used
  center: shape({
    lat: number.isRequired,
    lng: number.isRequired,
  }).isRequired,
  zoom: number,
  mapsConfig: object,
};

export default DynamicMapboxMap;
