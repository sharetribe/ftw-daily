import React, { Component, PropTypes } from 'react'; // eslint-disable-line react/no-deprecated
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import classNames from 'classnames';
import { groupBy, isEqual, reduce } from 'lodash';
import { types as sdkTypes } from '../../util/sdkLoader';
import * as propTypes from '../../util/propTypes';
import { googleBoundsToSDKBounds } from '../../util/googleMaps';
import { SearchMapInfoCard, SearchMapPriceLabel, SearchMapGroupLabel } from '../../components';

import css from './SearchMap.css';

const LABEL_HANDLE = 'SearchMapLabel';
const INFO_CARD_HANDLE = 'SearchMapInfoCard';

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
 * Listings array grouped by geolocation
 * @param {Array} mapListings - listings to be grouped on map
 * @return {Object} - Object where coordinate pair is the key to different listings
 */
const groupedByCoordinates = mapListings => {
  return groupBy(mapListings, l => {
    const g = l.attributes.geolocation;
    return `${g.lat}-${g.lng}`;
  });
};

/**
 * Listings (in location based object literal) is mapped to array
 * @param {Object} mapListings - listings to be grouped on map
 * @return {Array} - An array where items are arrays of listings
 *   (They are arrays containing all the listings in that location)
 */
const reducedToArray = mapListings => {
  return reduce(mapListings, (acc, listing) => acc.concat([listing]), []);
};

/**
 * MapWithGoogleMap uses withGoogleMap HOC.
 * It handles some of the google map initialization states.
 */
const MapWithGoogleMap = withGoogleMap(props => {
  const {
    center,
    infoCardOpen,
    isOpenOnModal,
    listings,
    onCloseAsModal,
    onIdle,
    onListingClicked,
    onMapLoad,
    zoom,
  } = props;

  const listingArraysInLocations = reducedToArray(groupedByCoordinates(listings));
  const priceLabels = listingArraysInLocations.reverse().map(listingArr => {
    // If location contains only one listing, print price label
    if (listingArr.length === 1) {
      const listing = listingArr[0];
      const infoCardOpenIds = Array.isArray(infoCardOpen) ? infoCardOpen.map(l => l.id.uuid) : [];

      // if the listing is open, don't print price label
      if (infoCardOpen != null && infoCardOpenIds.includes(listing.id.uuid)) {
        return null;
      }
      return (
        <SearchMapPriceLabel
          key={listing.id.uuid}
          className={LABEL_HANDLE}
          listing={listing}
          onListingClicked={onListingClicked}
        />
      );
    }
    return (
      <SearchMapGroupLabel
        key={listingArr[0].id.uuid}
        className={LABEL_HANDLE}
        listings={listingArr}
        onListingClicked={onListingClicked}
      />
    );
  });

  const listingsArray = Array.isArray(infoCardOpen) ? infoCardOpen : [infoCardOpen];
  const openedCard = infoCardOpen
    ? <SearchMapInfoCard
        key={listingsArray[0].id.uuid}
        className={INFO_CARD_HANDLE}
        listings={listingsArray}
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
        // When infoCard is open, we can't differentiate double click on top of card vs map.
        disableDoubleClickZoom: !!infoCardOpen,
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
    this.state = { infoCardOpen: null };
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
        fitMapToBounds(this.googleMap, nextProps.bounds, 0);
      }
    }
  }

  componentWillUnmount() {
    this.listings = [];
  }

  onListingClicked(listings) {
    this.setState({ infoCardOpen: listings });
  }

  onMapClicked(e) {
    // Close open listing popup / infobox, unless the click is attached to a price label
    const labelClicked = hasParentWithClassName(e.nativeEvent.target, LABEL_HANDLE);
    const infoCardClicked = hasParentWithClassName(e.nativeEvent.target, INFO_CARD_HANDLE);
    if (this.state.infoCardOpen != null && !labelClicked && !infoCardClicked) {
      this.setState({ infoCardOpen: null });
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
      center,
      isOpenOnModal,
      listings,
      mapRootClassName,
      onCloseAsModal,
      onIdle,
      zoom,
    } = this.props;
    const classes = classNames(rootClassName || css.root, className);
    const mapClasses = mapRootClassName || css.mapRoot;

    // container element listens clicks so that opened SearchMapInfoCard can be closed
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <MapWithGoogleMap
        containerElement={<div className={classes} onClick={this.onMapClicked} />}
        mapElement={<div className={mapClasses} />}
        center={center}
        isOpenOnModal={isOpenOnModal}
        listings={listings}
        infoCardOpen={this.state.infoCardOpen}
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
  bounds: null,
  center: new sdkTypes.LatLng(0, 0),
  className: null,
  isOpenOnModal: false,
  listings: [],
  mapRootClassName: null,
  onCloseAsModal: null,
  rootClassName: null,
  useLocationSearchBounds: true,
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
  onCloseAsModal: func,
  onIdle: func.isRequired,
  rootClassName: string,
  useLocationSearchBounds: bool, // eslint-disable-line react/no-unused-prop-types
  zoom: number,
};

const SearchMap = SearchMapComponent;

export default SearchMap;
