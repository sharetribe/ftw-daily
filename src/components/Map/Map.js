import React, { Component, PropTypes } from 'react';
import * as propTypes from '../../util/propTypes';

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
    const { className, width, height } = this.props;
    const style = { width, height };
    return (
      <div
        className={className}
        style={style}
        ref={el => {
          this.el = el;
        }}
      />
    );
  }
}

Map.defaultProps = { className: '', width: '100%', height: 300, zoom: 11 };

const { string, oneOfType, number } = PropTypes;

Map.propTypes = {
  className: string,
  width: oneOfType([number, string]),
  height: oneOfType([number, string]),
  center: propTypes.latlng.isRequired,
  address: string.isRequired,
  zoom: number,
};

export default Map;
