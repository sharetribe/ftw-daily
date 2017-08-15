import React, { Component, PropTypes } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import classNames from 'classnames';
import { types as sdkTypes } from '../../util/sdkLoader';
import * as propTypes from '../../util/propTypes';
import { SearchMapListingCard, SearchMapPriceLabel } from '../../components';

import css from './SearchMap.css';

const PRICE_LABEL_HANDLE = 'SearchMapPriceLabel';

/**
 * Fit part of map (descriped with bounds) to visible map-viewport
 *
 * @param {Object} map - map that needs to be centered with given bounds
 * @param {SDK.LatLngBounds} bounds - the area that needs to be visible when map loads.
 */
const fitMapToBounds = (map, bounds) => {
  const { ne, sw } = bounds || {};
  // map bounds as string literal for google.maps
  const mapBounds = bounds ? { north: ne.lat, east: ne.lng, south: sw.lat, west: sw.lng } : null;

  // If bounds are given, use it (defaults to center & zoom).
  if (map && mapBounds) {
    map.fitBounds(mapBounds);
  }
};

/**
 * hasParentWithClassName searches class name from parent elements of given target
 * @param {Node} target - element whose parent might contain given class.
 * @param {String} className - class name string to be found
 */
const hasParentWithClassName = (target, className) => {
  return [...document.querySelectorAll(`.${className}`)].some(
    el => el !== target && el.contains(target)
  );
};

/**
 * MapWithGoogleMap uses withGoogleMap HOC.
 * It handles some of the google map initialization states.
 */
const MapWithGoogleMap = withGoogleMap(props => {
  const { center, listings, listingOpen, onListingClicked, onMapLoad, zoom } = props;

  const priceLabels = listings.reverse().map(listing => {

    // if the listing is open, don't print price label
    if (listingOpen && listingOpen.id.uuid === listing.id.uuid) {
      return null;
    }
    return (
      <SearchMapPriceLabel
        key={listing.id.uuid}
        className={PRICE_LABEL_HANDLE}
        listing={listing}
        onListingClicked={onListingClicked}
      />
    );
  });

  const openedCard = listingOpen
    ? <SearchMapListingCard key={listingOpen.id.uuid} listing={listingOpen} />
    : null;

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
      ref={onMapLoad}
    >
      {priceLabels}
      {openedCard}
    </GoogleMap>
  );
});

export class SearchMapComponent extends Component {
  constructor(props) {
    super(props);

    this.googleMap = null;
    this.state = { listingOpen: null };
    this.onListingClicked = this.onListingClicked.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMapLoadHandler = this.onMapLoadHandler.bind(this);
  }

  componentDidMount() {
    const mapsLibLoaded = window.google && window.google.maps;
    if (!mapsLibLoaded) {
      throw new Error('Google Maps API must be loaded for the SearchMap component');
    }
  }

  onListingClicked(listing) {
    this.setState({ listingOpen: listing });
  }

  onMapClicked(e) {

    // Close open listing popup / infobox, unless the click is attached to a price label
    const labelClicked = hasParentWithClassName(e.nativeEvent.target, PRICE_LABEL_HANDLE);
    if (this.state.listingOpen != null && !labelClicked) {
      this.setState({ listingOpen: null });
    }
  }

  onMapLoadHandler(map) {
    this.googleMap = map;
    fitMapToBounds(this.googleMap, this.props.bounds);
  }

  render() {
    const {
      className,
      rootClassName,
      mapRootClassName,
      center,
      listings,
      zoom,
    } = this.props;
    const classes = classNames(rootClassName || css.root, className);
    const mapClasses = mapRootClassName || css.mapRoot;

    // container element listens clicks so that opened SearchMapListingCards can be closed
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <MapWithGoogleMap
        containerElement={<div className={classes} onClick={this.onMapClicked} />}
        mapElement={<div className={mapClasses} />}
        center={center}
        listings={listings}
        listingOpen={this.state.listingOpen}
        onListingClicked={this.onListingClicked}
        onMapLoad={this.onMapLoadHandler}
        zoom={zoom}
      />
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
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
};

const SearchMap = SearchMapComponent;

export default SearchMap;
