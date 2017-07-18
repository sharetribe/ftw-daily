import React, { Component, PropTypes } from 'react';
import { isEqualWith, sortBy } from 'lodash';
import classNames from 'classnames';
import { types as sdkTypes } from '../../util/sdkLoader';
import * as propTypes from '../../util/propTypes';
import { MapPriceMarker } from '../../components';

import css from './SearchMap.css';

const fitMapToBounds = (map, bounds) => {
  const { ne, sw } = bounds || {};
  // map bounds as string literal for google.maps
  const mapBounds = bounds ? { north: ne.lat, east: ne.lng, south: sw.lat, west: sw.lng } : null;

  if (mapBounds) {
    map.fitBounds(mapBounds);
  }
};

// Compare listing arrays (if listings are the same, there's no need to rerender google maps).
const hasSameListings = (prevListings, nextListings) => {
  return isEqualWith(sortBy(prevListings, l => l.id.uuid), sortBy(nextListings, l => l.id.uuid));
};

class SearchMap extends Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.state = { overlays: [] };
    this.addOverlay = this.addOverlay.bind(this);
  }

  componentDidMount() {
    const mapsLibLoaded = window.google && window.google.maps;
    if (!mapsLibLoaded) {
      throw new Error('Google Maps API must be loaded for the SearchMap component');
    }

    const { bounds, center, zoom } = this.props;
    const centerLocation = { lat: center.lat, lng: center.lng };
    const mapOptions = {
      center: centerLocation,
      zoom,

      // Disable map type (ie. Satellite etc.)
      mapTypeControl: false,

      // Disable zooming by scrolling
      scrollwheel: false,
    };
    this.map = new window.google.maps.Map(this.el, mapOptions);

    // If bounds are given, use it (defaults to center & zoom).
    fitMapToBounds(this.map, bounds);
  }

  componentWillReceiveProps(nextProps) {
    const { bounds, listings } = nextProps;

    fitMapToBounds(this.map, bounds);

    if (!hasSameListings(listings, nextProps.listings)) {
      // Clear markers from map
      this.state.overlays.forEach(o => o.setMap(null));
    }
  }

  addOverlay(overlay) {
    this.setState(prevState => {
      // Track map overlays, in case we need to clear them from map
      const overlays = prevState.overlays.concat([overlay]);
      return { overlays };
    });
  }

  render() {
    const { className, rootClassName, listings } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    // Add listing markers to map if listings prop is passed
    // By reversing the order, we can show the nearest price labels on top of more distant ones.
    const currentMarkers = listings
      .map(l => {
        return (
          <MapPriceMarker
            key={l.id.uuid}
            map={this.map}
            listing={l}
            onAddOverlay={this.addOverlay}
          />
        );
      })
      .reverse();

    return (
      <div
        className={classes}
        ref={el => {
          this.el = el;
        }}
      >
        {currentMarkers}
      </div>
    );
  }
}

SearchMap.defaultProps = {
  className: '',
  rootClassName: null,
  bounds: null,
  center: new sdkTypes.LatLng(0, 0),
  listings: [],
  zoom: 11,
};

const { arrayOf, number, string } = PropTypes;

SearchMap.propTypes = {
  bounds: propTypes.latlngBounds,
  center: propTypes.latlng,
  className: string,
  listings: arrayOf(propTypes.listing),
  rootClassName: string,
  zoom: number,
};

export default SearchMap;
