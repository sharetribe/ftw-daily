import React, { Component } from 'react';
import { arrayOf, bool, func, number, string, shape, object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import classNames from 'classnames';
import groupBy from 'lodash/groupBy';
import isEqual from 'lodash/isEqual';
import reduce from 'lodash/reduce';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';
import { createSlug } from '../../util/urlHelpers';
import { types as sdkTypes } from '../../util/sdkLoader';
import { propTypes } from '../../util/types';
import { obfuscatedCoordinates } from '../../util/maps';
import { googleBoundsToSDKBounds } from '../../util/googleMaps';
import { SearchMapInfoCard, SearchMapPriceLabel, SearchMapGroupLabel } from '../../components';
import config from '../../config';

import ReusableMapContainer from './ReusableMapContainer';
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

const withCoordinatesObfuscated = listings => {
  return listings.map(listing => {
    const { id, attributes, ...rest } = listing;
    const geolocation = obfuscatedCoordinates(attributes.geolocation, id ? id.uuid : null);
    return {
      id,
      ...rest,
      attributes: {
        ...attributes,
        geolocation,
      },
    };
  });
};

/**
 * MapWithGoogleMap uses withGoogleMap HOC.
 * It handles some of the google map initialization states.
 */
const MapWithGoogleMap = withGoogleMap(props => {
  const {
    activeListingId,
    center,
    infoCardOpen,
    listings,
    onIdle,
    onListingClicked,
    onListingInfoCardClicked,
    createURLToListing,
    onMapLoad,
    zoom,
    mapComponentRefreshToken,
  } = props;

  const listingArraysInLocations = reducedToArray(groupedByCoordinates(listings));
  const priceLabels = listingArraysInLocations.reverse().map(listingArr => {
    const isActive = activeListingId
      ? !!listingArr.find(l => activeListingId.uuid === l.id.uuid)
      : false;

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
          isActive={isActive}
          key={listing.id.uuid}
          className={LABEL_HANDLE}
          listing={listing}
          onListingClicked={onListingClicked}
          mapComponentRefreshToken={mapComponentRefreshToken}
        />
      );
    }
    return (
      <SearchMapGroupLabel
        isActive={isActive}
        key={listingArr[0].id.uuid}
        className={LABEL_HANDLE}
        listings={listingArr}
        onListingClicked={onListingClicked}
        mapComponentRefreshToken={mapComponentRefreshToken}
      />
    );
  });

  const listingsArray = Array.isArray(infoCardOpen) ? infoCardOpen : [infoCardOpen];
  const openedCard = infoCardOpen ? (
    <SearchMapInfoCard
      key={listingsArray[0].id.uuid}
      mapComponentRefreshToken={mapComponentRefreshToken}
      className={INFO_CARD_HANDLE}
      listings={listingsArray}
      onListingInfoCardClicked={onListingInfoCardClicked}
      createURLToListing={createURLToListing}
    />
  ) : null;

  const controlPosition =
    typeof window !== 'undefined' && typeof window.google !== 'undefined'
      ? window.google.maps.ControlPosition.LEFT_TOP
      : 5;

  return (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={center}
      options={{
        // Disable all controls except zoom
        mapTypeControl: false,
        scrollwheel: false,
        fullscreenControl: false,
        clickableIcons: false,
        streetViewControl: false,

        // When infoCard is open, we can't differentiate double click on top of card vs map.
        disableDoubleClickZoom: !!infoCardOpen,

        zoomControlOptions: {
          position: controlPosition,
        },
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
    this.mapReattachmentCount = 0;
    this.state = { infoCardOpen: null };

    this.createURLToListing = this.createURLToListing.bind(this);
    this.onListingInfoCardClicked = this.onListingInfoCardClicked.bind(this);
    this.onListingClicked = this.onListingClicked.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMapLoadHandler = this.onMapLoadHandler.bind(this);
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

  createURLToListing(listing) {
    const routes = routeConfiguration();

    const id = listing.id.uuid;
    const slug = createSlug(listing.attributes.title);
    const pathParams = { id, slug };

    return createResourceLocatorString('ListingPage', routes, pathParams, {});
  }

  onListingClicked(listings) {
    this.setState({ infoCardOpen: listings });
  }

  onListingInfoCardClicked(listing) {
    if (this.props.onCloseAsModal) {
      this.props.onCloseAsModal();
    }

    // To avoid full page refresh we need to use internal router
    const history = this.props.history;
    history.push(this.createURLToListing(listing));
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
      reusableContainerClassName,
      center,
      listings: originalListings,
      mapRootClassName,
      onCloseAsModal,
      onIdle,
      zoom,
      mapsConfig,
      activeListingId,
    } = this.props;
    const classes = classNames(rootClassName || css.root, className);
    const mapClasses = mapRootClassName || css.mapRoot;

    const listingsWithLocation = originalListings.filter(l => !!l.attributes.geolocation);
    const listings = mapsConfig.fuzzy.enabled
      ? withCoordinatesObfuscated(listingsWithLocation)
      : listingsWithLocation;
    const infoCardOpen = this.state.infoCardOpen;

    const isMapsLibLoaded = typeof window !== 'undefined' && window.google && window.google.maps;

    const forceUpdateHandler = () => {
      this.mapReattachmentCount += 1;
    };

    // container element listens clicks so that opened SearchMapInfoCard can be closed
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return isMapsLibLoaded ? (
      <ReusableMapContainer className={reusableContainerClassName} onReattach={forceUpdateHandler}>
        <MapWithGoogleMap
          containerElement={<div className={classes} onClick={this.onMapClicked} />}
          mapElement={<div className={mapClasses} />}
          center={center}
          listings={listings}
          activeListingId={activeListingId}
          infoCardOpen={infoCardOpen}
          onListingClicked={this.onListingClicked}
          onListingInfoCardClicked={this.onListingInfoCardClicked}
          createURLToListing={this.createURLToListing}
          onMapLoad={this.onMapLoadHandler}
          onIdle={() => {
            if (this.googleMap) {
              onIdle(this.googleMap);
            }
          }}
          onCloseAsModal={() => {
            if (onCloseAsModal) {
              onCloseAsModal();
            }
          }}
          zoom={zoom}
          mapComponentRefreshToken={this.mapReattachmentCount}
        />
      </ReusableMapContainer>
    ) : (
      <div className={classes} />
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

SearchMapComponent.defaultProps = {
  className: null,
  rootClassName: null,
  mapRootClassName: null,
  reusableContainerClassName: null,
  bounds: null,
  center: new sdkTypes.LatLng(0, 0),
  activeListingId: null,
  listings: [],
  onCloseAsModal: null,
  useLocationSearchBounds: true,
  zoom: 11,
  mapsConfig: config.maps,
};

SearchMapComponent.propTypes = {
  className: string,
  rootClassName: string,
  mapRootClassName: string,
  reusableContainerClassName: string,
  bounds: propTypes.latlngBounds,
  center: propTypes.latlng,
  activeListingId: propTypes.uuid,
  listings: arrayOf(propTypes.listing),
  onCloseAsModal: func,
  onIdle: func.isRequired,
  useLocationSearchBounds: bool, // eslint-disable-line react/no-unused-prop-types
  zoom: number,
  mapsConfig: object,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

const SearchMap = withRouter(SearchMapComponent);

export default SearchMap;
