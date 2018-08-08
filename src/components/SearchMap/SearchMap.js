import React, { Component } from 'react';
import { arrayOf, bool, func, number, string, shape, object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';
import { createSlug } from '../../util/urlHelpers';
import { propTypes } from '../../util/types';
import { obfuscatedCoordinates } from '../../util/maps';
import config from '../../config';

import { hasParentWithClassName } from './SearchMap.helpers.js';
import SearchMapWithMapbox, {
  LABEL_HANDLE,
  INFO_CARD_HANDLE,
  getMapBounds,
  getMapCenter,
  fitMapToBounds,
  isMapsLibLoaded,
} from './SearchMapWithMapbox';
import ReusableMapContainer from './ReusableMapContainer';
import css from './SearchMap.css';

const withCoordinatesObfuscated = listings => {
  return listings.map(listing => {
    const { id, attributes, ...rest } = listing;
    const origGeolocation = attributes.geolocation;
    const cacheKey = id ? `${id.uuid}_${origGeolocation.lat}_${origGeolocation.lng}` : null;
    const geolocation = obfuscatedCoordinates(origGeolocation, cacheKey);
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

export class SearchMapComponent extends Component {
  constructor(props) {
    super(props);

    this.listings = [];
    this.mapRef = null;
    this.mapReattachmentCount = 0;
    this.state = { infoCardOpen: null };

    this.createURLToListing = this.createURLToListing.bind(this);
    this.onListingInfoCardClicked = this.onListingInfoCardClicked.bind(this);
    this.onListingClicked = this.onListingClicked.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMapLoadHandler = this.onMapLoadHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.mapRef) {
      const currentBounds = getMapBounds(this.mapRef);

      // Do not call fitMapToBounds if bounds are the same.
      // Our bounds are viewport bounds, and fitBounds will try to add margins around those bounds
      // that would result to zoom-loop (bound change -> fitmap -> bounds change -> ...)
      if (!isEqual(nextProps.bounds, currentBounds) && nextProps.useLocationSearchBounds) {
        fitMapToBounds(this.mapRef, nextProps.bounds, 0);
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
    this.mapRef = map;

    if (this.mapRef) {
      // map is ready, let's fit search area's bounds to map's viewport
      fitMapToBounds(this.mapRef, this.props.bounds, 0);
    }
  }

  render() {
    const {
      className,
      rootClassName,
      reusableContainerClassName,
      center,
      listings: originalListings,
      onIdle,
      zoom,
      mapsConfig,
      activeListingId,
    } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    const listingsWithLocation = originalListings.filter(l => !!l.attributes.geolocation);
    const listings = mapsConfig.fuzzy.enabled
      ? withCoordinatesObfuscated(listingsWithLocation)
      : listingsWithLocation;
    const infoCardOpen = this.state.infoCardOpen;

    const forceUpdateHandler = () => {
      this.mapReattachmentCount += 1;
    };

    // Using Google Maps as map provider should use following component
    // instead of SearchMapWithMapbox:
    //
    // <SearchMapWithGoogleMap
    //   containerElement={<div className={classes} onClick={this.onMapClicked} />}
    //   mapElement={<div className={mapRootClassName || css.mapRoot} />}
    //   center={center}
    //   infoCardOpen={infoCardOpen}
    //   listings={listings}
    //   activeListingId={activeListingId}
    //   mapComponentRefreshToken={this.state.mapReattachmentCount}
    //   createURLToListing={this.createURLToListing}
    //   onListingClicked={this.onListingClicked}
    //   onListingInfoCardClicked={this.onListingInfoCardClicked}
    //   onMapLoad={this.onMapLoadHandler}
    //   onIdle={() => {
    //     if (this.mapRef) {
    //       onIdle(this.mapRef);
    //     }
    //   }}
    //   zoom={zoom}
    // />

    return isMapsLibLoaded() ? (
      <ReusableMapContainer className={reusableContainerClassName} onReattach={forceUpdateHandler}>
        <SearchMapWithMapbox
          className={classes}
          center={center}
          infoCardOpen={infoCardOpen}
          listings={listings}
          activeListingId={activeListingId}
          mapComponentRefreshToken={this.state.mapReattachmentCount}
          createURLToListing={this.createURLToListing}
          onListingClicked={this.onListingClicked}
          onListingInfoCardClicked={this.onListingInfoCardClicked}
          onMapLoad={this.onMapLoadHandler}
          onClick={this.onMapClicked}
          onIdle={() => {
            if (this.mapRef) {
              onIdle(this.mapRef);
            }
          }}
          zoom={zoom}
        />
      </ReusableMapContainer>
    ) : (
      <div className={classes} />
    );
  }
}

SearchMapComponent.defaultProps = {
  className: null,
  rootClassName: null,
  mapRootClassName: null,
  reusableContainerClassName: null,
  bounds: null,
  center: null,
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

SearchMap.getMapBounds = getMapBounds;
SearchMap.getMapCenter = getMapCenter;

export default SearchMap;
