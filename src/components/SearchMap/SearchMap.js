import React, { Component, PropTypes } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import classNames from 'classnames';
import { isEqual } from 'lodash';
import { types as sdkTypes } from '../../util/sdkLoader';
import * as propTypes from '../../util/propTypes';
import { googleBoundsToSDKBounds } from '../../util/googleMaps';
import { SearchMapListingCard, SearchMapPriceLabel } from '../../components';

import css from './SearchMap.css';

const PRICE_LABEL_HANDLE = 'SearchMapPriceLabel';

/**
 * Fit part of map (descriped with bounds) to visible map-viewport
 *
 * @param {Object} map - map that needs to be centered with given bounds
 * @param {SDK.LatLngBounds} bounds - the area that needs to be visible when map loads.
 */
const fitMapToBounds = (map, bounds, padding) => {
  const { ne, sw } = bounds || {};
  // map bounds as string literal for google.maps
  const mapBounds = bounds ? { north: ne.lat, east: ne.lng, south: sw.lat, west: sw.lng } : null;

  // If bounds are given, use it (defaults to center & zoom).
  if (map && mapBounds) {
    if (padding == null) {
      map.fitBounds(mapBounds);
    } else {
      map.fitBounds(mapBounds, padding);
    }
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
  const {
    center,
    isOpenOnModal,
    listings,
    listingOpen,
    onIdle,
    onCloseAsModal,
    onListingClicked,
    onMapLoad,
    zoom,
  } = props;

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
    ? <SearchMapListingCard
        key={listingOpen.id.uuid}
        listing={listingOpen}
        onClickCallback={onCloseAsModal}
      />
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
        // Disable fullscreen control: this won't work with mobile close-modal button
        // since they are on top of each others.
        fullscreenControl: !isOpenOnModal,
        // Click disabled for point-of-interests
        clickableIcons: false,
      }}
      ref={onMapLoad}
      onIdle={onIdle}
    >
      {priceLabels}
      {openedCard}
    </GoogleMap>
  );
});

export class SearchMapComponent extends Component {
  constructor(props) {
    super(props);

    this.listings = [];
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

  componentWillReceiveProps(nextProps) {
    if (this.googleMap) {
      const currentBounds = googleBoundsToSDKBounds(this.googleMap.getBounds());

      // Do not call fitMapToBounds if bounds are the same.
      // Our bounds are viewport bounds, and fitBounds will try to add margins around those bounds
      // that would result to zoom-loop (bound change -> fitmap -> bounds change -> ...)
      if (!isEqual(nextProps.bounds, currentBounds) && nextProps.useLocationSearchBounds) {
        fitMapToBounds(this.googleMap, nextProps.bounds);
      }
    }
  }

  componentWillUnmount() {
    this.listings = [];
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

    if (this.googleMap) {
      // map is ready, let's fit search area's bounds to map's viewport
      fitMapToBounds(this.googleMap, this.props.bounds, 0);
    }
  }

  render() {
    const {
      className,
      rootClassName,
      mapRootClassName,
      center,
      isOpenOnModal,
      listings,
      onIdle,
      onCloseAsModal,
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
        isOpenOnModal={isOpenOnModal}
        listings={listings}
        listingOpen={this.state.listingOpen}
        onListingClicked={this.onListingClicked}
        onMapLoad={this.onMapLoadHandler}
        onIdle={() => {
          onIdle(this.googleMap);
        }}
        onCloseAsModal={() => {
          if (onCloseAsModal) {
            onCloseAsModal();
          }
        }}
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
  useLocationSearchBounds: true,
  bounds: null,
  center: new sdkTypes.LatLng(0, 0),
  isOpenOnModal: false,
  onCloseAsModal: null,
  listings: [],
  zoom: 11,
};

const { arrayOf, bool, func, number, string } = PropTypes;

SearchMapComponent.propTypes = {
  bounds: propTypes.latlngBounds,
  center: propTypes.latlng,
  className: string,
  isOpenOnModal: bool,
  listings: arrayOf(propTypes.listing),
  mapRootClassName: string,
  useLocationSearchBounds: bool, // eslint-disable-line react/no-unused-prop-types
  onIdle: func.isRequired,
  onCloseAsModal: func,
  rootClassName: string,
  zoom: number,
};

const SearchMap = SearchMapComponent;

export default SearchMap;
