import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import classNames from 'classnames';
import { types as sdkTypes } from '../../util/sdkLoader';
import * as propTypes from '../../util/propTypes';
import { formatMoney } from '../../util/currency';
import config from '../../config';
import { SearchMapPriceLabel } from '../../components';

import css from './SearchMap.css';

const fitMapToBounds = (map, bounds) => {
  const { ne, sw } = bounds || {};
  // map bounds as string literal for google.maps
  const mapBounds = bounds ? { north: ne.lat, east: ne.lng, south: sw.lat, west: sw.lng } : null;

  // If bounds are given, use it (defaults to center & zoom).
  if (mapBounds) {
    map.fitBounds(mapBounds);
  }
};

// withGoogleMap HOC handles some of the google map initialization states.
const MapWithGoogleMap = withGoogleMap(props => {
  const { center, intl, listings, mapRef, zoom } = props;

  const priceLabels = listings.reverse().map(listing => {
    // Create formatted price if currency is known or alternatively show just the unknown currency.
    const price = listing.attributes.price;
    const formattedPrice = price && price.currency === config.currencyConfig.currency
      ? formatMoney(intl, config.currencyConfig, price)
      : price.currency;
    return <SearchMapPriceLabel key={listing.id.uuid} price={formattedPrice} listing={listing} />;
  });

  return (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={center}
      options={{
        // Disable map type (ie. Satellite etc.)
        mapTypeControl: false,
        // Disable zooming by scrolling
        scrollwheel: false,
      }}
      ref={mapRef}
    >
      {priceLabels}
    </GoogleMap>
  );
});

export class SearchMapComponent extends Component {
  constructor(props) {
    super(props);
    this.googleMap = null;
  }

  componentDidMount() {
    const mapsLibLoaded = window.google && window.google.maps;
    if (!mapsLibLoaded) {
      throw new Error('Google Maps API must be loaded for the SearchMap component');
    }
  }

  render() {
    const {
      className,
      rootClassName,
      mapRootClassName,
      bounds,
      center,
      intl,
      listings,
      zoom,
    } = this.props;
    const classes = classNames(rootClassName || css.root, className);
    const mapClasses = mapRootClassName || css.mapRoot;

    // Fit map to bounds if given
    if (this.googleMap) {
      fitMapToBounds(this.googleMap, bounds);
    }

    return (
      <MapWithGoogleMap
        containerElement={<div className={classes} />}
        mapElement={<div className={mapClasses} />}
        center={center}
        intl={intl}
        listings={listings}
        mapRef={map => {
          this.googleMap = map;
        }}
        zoom={zoom}
      />
    );
  }
}

SearchMapComponent.defaultProps = {
  className: '',
  rootClassName: null,
  mapRootClassName: null,
  bounds: null,
  center: new sdkTypes.LatLng(0, 0),
  listings: [],
  zoom: 11,
};

const { arrayOf, number, string } = PropTypes;

SearchMapComponent.propTypes = {
  bounds: propTypes.latlngBounds,
  center: propTypes.latlng,
  className: string,
  listings: arrayOf(propTypes.listing),
  mapRootClassName: string,
  rootClassName: string,
  zoom: number,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SearchMap = injectIntl(SearchMapComponent);

export default SearchMap;
