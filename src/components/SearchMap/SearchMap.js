import React, { Component } from 'react';
import { arrayOf, func, number, string, shape, object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
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
import css from './SearchMap.module.css';

const REUSABLE_MAP_HIDDEN_HANDLE = 'reusableMapHidden';

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

    let mapReattachmentCount = 0;

    if (typeof window !== 'undefined') {
      if (window.mapReattachmentCount) {
        mapReattachmentCount = window.mapReattachmentCount;
      } else {
        window.mapReattachmentCount = 0;
      }
    }

    this.state = { infoCardOpen: null, mapReattachmentCount };

    this.createURLToListing = this.createURLToListing.bind(this);
    this.onListingInfoCardClicked = this.onListingInfoCardClicked.bind(this);
    this.onListingClicked = this.onListingClicked.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMapLoadHandler = this.onMapLoadHandler.bind(this);
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

    if (this.mapRef && this.state.mapReattachmentCount === 0) {
      // map is ready, let's fit search area's bounds to map's viewport
      fitMapToBounds(this.mapRef, this.props.bounds, { padding: 0, isAutocompleteSearch: true });
    }
  }

  render() {
    const {
      id,
      className,
      rootClassName,
      reusableContainerClassName,
      bounds,
      center,
      location,
      listings: originalListings,
      onMapMoveEnd,
      zoom,
      mapsConfig,
      activeListingId,
      messages,
    } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    const listingsWithLocation = originalListings.filter(l => !!l.attributes.geolocation);
    const listings = mapsConfig.fuzzy.enabled
      ? withCoordinatesObfuscated(listingsWithLocation)
      : listingsWithLocation;
    const infoCardOpen = this.state.infoCardOpen;

    const forceUpdateHandler = () => {
      // Update global reattachement count
      window.mapReattachmentCount += 1;
      // Initiate rerendering
      this.setState({ mapReattachmentCount: window.mapReattachmentCount });
    };

    // When changing from default map provider to Google Maps, you should use the following
    // component instead of SearchMapWithMapbox:
    //
    // <SearchMapWithGoogleMaps
    //   id={id}
    //   className={classes}
    //   bounds={bounds}
    //   center={center}
    //   location={location}
    //   infoCardOpen={infoCardOpen}
    //   listings={listings}
    //   activeListingId={activeListingId}
    //   mapComponentRefreshToken={this.state.mapReattachmentCount}
    //   createURLToListing={this.createURLToListing}
    //   onClick={this.onMapClicked}
    //   onListingClicked={this.onListingClicked}
    //   onListingInfoCardClicked={this.onListingInfoCardClicked}
    //   onMapLoad={this.onMapLoadHandler}
    //   onMapMoveEnd={onMapMoveEnd}
    //   reusableMapHiddenHandle={REUSABLE_MAP_HIDDEN_HANDLE}
    //   zoom={zoom}
    // />

    return isMapsLibLoaded() ? (
      <ReusableMapContainer
        className={reusableContainerClassName}
        reusableMapHiddenHandle={REUSABLE_MAP_HIDDEN_HANDLE}
        onReattach={forceUpdateHandler}
        messages={messages}
      >
        <SearchMapWithMapbox
          id={id}
          className={classes}
          bounds={bounds}
          center={center}
          location={location}
          infoCardOpen={infoCardOpen}
          listings={listings}
          activeListingId={activeListingId}
          mapComponentRefreshToken={this.state.mapReattachmentCount}
          createURLToListing={this.createURLToListing}
          onClick={this.onMapClicked}
          onListingClicked={this.onListingClicked}
          onListingInfoCardClicked={this.onListingInfoCardClicked}
          onMapLoad={this.onMapLoadHandler}
          onMapMoveEnd={onMapMoveEnd}
          reusableMapHiddenHandle={REUSABLE_MAP_HIDDEN_HANDLE}
          zoom={zoom}
        />
      </ReusableMapContainer>
    ) : (
      <div className={classes} />
    );
  }
}

SearchMapComponent.defaultProps = {
  id: 'searchMap',
  className: null,
  rootClassName: null,
  mapRootClassName: null,
  reusableContainerClassName: null,
  bounds: null,
  center: null,
  activeListingId: null,
  listings: [],
  onCloseAsModal: null,
  zoom: 11,
  mapsConfig: config.maps,
};

SearchMapComponent.propTypes = {
  id: string,
  className: string,
  rootClassName: string,
  mapRootClassName: string,
  reusableContainerClassName: string,
  bounds: propTypes.latlngBounds,
  center: propTypes.latlng,
  location: shape({
    search: string.isRequired,
  }).isRequired,
  activeListingId: propTypes.uuid,
  listings: arrayOf(propTypes.listing),
  onCloseAsModal: func,
  onMapMoveEnd: func.isRequired,
  zoom: number,
  mapsConfig: object,
  messages: object.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

const SearchMap = withRouter(SearchMapComponent);

SearchMap.getMapBounds = getMapBounds;
SearchMap.getMapCenter = getMapCenter;

export default SearchMap;
