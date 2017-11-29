import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';

import CustomMarker from './images/marker.png';
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

      // Disable Map Type ie. Satellite etc.
      mapTypeControl: false,

      // Disable zooming by scrolling
      scrollwheel: false,
    };
    const map = new window.google.maps.Map(this.el, mapOptions);

    const customMarker = {
      url: CustomMarker,
      // This marker is 32 pixels wide by 32 pixels high.
      size: new window.google.maps.Size(32, 32),
      // The origin for this image is (0, 0).
      origin: new window.google.maps.Point(0, 0),
      // The anchor for the marker is in the bottom center.
      anchor: new window.google.maps.Point(16, 32),
    };

    new window.google.maps.Marker({
      position: centerLocation,
      map,
      icon: customMarker,
      title: address,
    });
  }

  render() {
    const { className, rootClassName } = this.props;
    const classes = classNames(rootClassName || css.root, className);
    return (
      <div
        className={classes}
        ref={el => {
          this.el = el;
        }}
      />
    );
  }
}

Map.defaultProps = { className: '', rootClassName: null, zoom: 11 };

const { string, number } = PropTypes;

Map.propTypes = {
  address: string.isRequired,
  center: propTypes.latlng.isRequired,
  className: string,
  rootClassName: string,
  zoom: number,
};

export default Map;
