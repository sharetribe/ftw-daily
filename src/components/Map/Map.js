import React, { Component, PropTypes } from 'react';
import * as propTypes from '../../util/propTypes';

import css from './Map.css';

class Map extends Component {
  componentDidMount() {
    const mapsLibLoaded = window.google && window.google.maps;
    if (!mapsLibLoaded) {
      throw new Error('Google Maps API must be loaded for the Map component');
    }
    const { center, zoom, address } = this.props;
    const centerLocation = { lat: center.lat, lng: center.lng };
    const mapOptions = {
      center: centerLocation,
      zoom,

      // Disable zooming by scrolling
      scrollwheel: false,
    };
    const map = new window.google.maps.Map(this.el, mapOptions);
    // eslint-disable-next-line no-new
    new window.google.maps.Marker({
      position: centerLocation,
      map,
      title: address,
    });
  }
  render() {
    const { className } = this.props;
    return (
      <div
        className={`${className} ${css.root}`}
        ref={el => {
          this.el = el;
        }}
      />
    );
  }
}

Map.defaultProps = { className: '', zoom: 11 };

const { string, number } = PropTypes;

Map.propTypes = {
  className: string,
  center: propTypes.latlng.isRequired,
  address: string.isRequired,
  zoom: number,
};

export default Map;
