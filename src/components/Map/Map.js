import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';

import CustomMarker from './images/customMarker.png';
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
      // This marker is 21 pixels wide by 25 pixels high.
      size: new window.google.maps.Size(21, 25),
      // The origin for this image is (0, 0).
      origin: new window.google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (10, 25).
      anchor: new window.google.maps.Point(10, 25),
    };

    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    const shape = {
      coords: [1, 1, 1, 21, 25, 21, 25, 1],
      type: 'poly',
    };

    // eslint-disable-next-line no-new
    new window.google.maps.Marker({
      position: centerLocation,
      map,
      icon: customMarker,
      shape,
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
