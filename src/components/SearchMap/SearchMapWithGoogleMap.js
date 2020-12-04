import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import invariant from 'invariant';
import { arrayOf, func, node, number, oneOfType, shape, string } from 'prop-types';
import isEqual from 'lodash/isEqual';
import { withGoogleMap, GoogleMap, OverlayView } from 'react-google-maps';
import { OVERLAY_VIEW } from 'react-google-maps/lib/constants';
import { types as sdkTypes } from '../../util/sdkLoader';
import { parse } from '../../util/urlHelpers';
import { propTypes } from '../../util/types';
import { ensureListing } from '../../util/data';
import { sdkBoundsToFixedCoordinates, hasSameSDKBounds } from '../../util/maps';
import { SearchMapInfoCard, SearchMapPriceLabel, SearchMapGroupLabel } from '../../components';

import { groupedByCoordinates, reducedToArray } from './SearchMap.helpers.js';

export const LABEL_HANDLE = 'SearchMapLabel';
export const INFO_CARD_HANDLE = 'SearchMapInfoCard';
const BOUNDS_FIXED_PRECISION = 8;

const { LatLng: SDKLatLng, LatLngBounds: SDKLatLngBounds } = sdkTypes;

/**
 * Fit part of map (descriped with bounds) to visible map-viewport
 *
 * @param {Object} map - map that needs to be centered with given bounds
 * @param {SDK.LatLngBounds} bounds - the area that needs to be visible when map loads.
 */
export const fitMapToBounds = (map, bounds, options) => {
  const { padding } = options;

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
 * Convert Google formatted LatLng object to Sharetribe SDK's LatLng coordinate format
 *
 * @param {LatLng} googleLatLng - Google Maps LatLng
 *
 * @return {SDKLatLng} - Converted latLng coordinate
 */
export const googleLatLngToSDKLatLng = googleLatLng => {
  if (!googleLatLng) {
    return null;
  }
  return new SDKLatLng(googleLatLng.lat(), googleLatLng.lng());
};

/**
 * Convert Google formatted bounds object to Sharetribe SDK's bounds format
 *
 * @param {LatLngBounds} googleBounds - Google Maps LatLngBounds
 *
 * @return {SDKLatLngBounds} - Converted bounds
 */
export const googleBoundsToSDKBounds = googleBounds => {
  if (!googleBounds) {
    return null;
  }
  const ne = googleBounds.getNorthEast();
  const sw = googleBounds.getSouthWest();
  return new SDKLatLngBounds(new SDKLatLng(ne.lat(), ne.lng()), new SDKLatLng(sw.lat(), sw.lng()));
};

export const getMapBounds = map => googleBoundsToSDKBounds(map.getBounds());
export const getMapCenter = map => googleLatLngToSDKLatLng(map.getCenter());

/**
 * Check if map library is loaded
 */
export const isMapsLibLoaded = () =>
  typeof window !== 'undefined' && window.google && window.google.maps;

/**
 * FIX "TypeError: Cannot read property 'overlayMouseTarget' of null"
 * Override draw function to catch errors with map panes being undefined to prevent console errors
 * https://github.com/tomchentw/react-google-maps/issues/482
 */
class CustomOverlayView extends OverlayView {
  onRemove() {
    this.containerElement.parentNode.removeChild(this.containerElement);
    //Remove `unmountComponentAtNode` for react version 16
    //I decided to keep the code here incase React decides not to give out warning when `unmountComponentAtNode` in newer version
    if (!React.version.match(/^16/)) {
      ReactDOM.unmountComponentAtNode(this.containerElement);
    }
    this.containerElement = null;
  }

  onAdd() {
    this.containerElement = document.createElement(`div`);
    this.containerElement.style.position = `absolute`;

    const { mapPaneName } = this.props;
    invariant(
      !!mapPaneName,
      `OverlayView requires either props.mapPaneName or props.defaultMapPaneName but got %s`,
      mapPaneName
    );

    const mapPanes = this.state[OVERLAY_VIEW].getPanes();
    mapPanes[mapPaneName].appendChild(this.containerElement);
    this.onPositionElement();
    this.forceUpdate();
  }

  render() {
    if (React.version.match(/^16/) && this.containerElement) {
      return ReactDOM.createPortal(React.Children.only(this.props.children), this.containerElement);
    }
    return false;
  }

  draw() {
    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapPanes
    const mapPanes = this.state[OVERLAY_VIEW].getPanes();
    // Add conditional to ensure panes and container exist before drawing
    if (mapPanes && this.containerElement) {
      this.onPositionElement();
    }
  }
}

/**
 * Center label so that caret is pointing to correct pixel.
 * (vertical positioning: height + arrow)
 */
const getPixelPositionOffset = (width, height) => {
  return { x: -1 * (width / 2), y: -1 * (height + 3) };
};

/**
 * GoogleMaps need to use Google specific OverlayView components and therefore we need to
 * reduce flickering / rerendering of these overlays through 'shouldComponentUpdate'
 */
class SearchMapPriceLabelWithOverlay extends Component {
  shouldComponentUpdate(nextProps) {
    const currentListing = ensureListing(this.props.listing);
    const nextListing = ensureListing(nextProps.listing);
    const isSameListing = currentListing.id.uuid === nextListing.id.uuid;
    const hasSamePrice = currentListing.attributes.price === nextListing.attributes.price;
    const hasSameActiveStatus = this.props.isActive === nextProps.isActive;
    const hasSameRefreshToken =
      this.props.mapComponentRefreshToken === nextProps.mapComponentRefreshToken;

    return !(isSameListing && hasSamePrice && hasSameActiveStatus && hasSameRefreshToken);
  }

  render() {
    const {
      position,
      mapPaneName,
      isActive,
      className,
      listing,
      onListingClicked,
      mapComponentRefreshToken,
    } = this.props;

    return (
      <CustomOverlayView
        position={position}
        mapPaneName={mapPaneName}
        getPixelPositionOffset={getPixelPositionOffset}
      >
        <SearchMapPriceLabel
          isActive={isActive}
          className={className}
          listing={listing}
          onListingClicked={onListingClicked}
          mapComponentRefreshToken={mapComponentRefreshToken}
        />
      </CustomOverlayView>
    );
  }
}

/**
 * GoogleMaps need to use Google specific OverlayView components and therefore we need to
 * reduce flickering / rerendering of these overlays through 'shouldComponentUpdate'
 */
class SearchMapGroupLabelWithOverlay extends Component {
  shouldComponentUpdate(nextProps) {
    const hasSameAmountOfListings = nextProps.listings.length === this.props.listings.length;
    const hasSameActiveStatus = this.props.isActive === nextProps.isActive;
    const hasSameRefreshToken =
      this.props.mapComponentRefreshToken === nextProps.mapComponentRefreshToken;

    return !(hasSameAmountOfListings && hasSameActiveStatus && hasSameRefreshToken);
  }

  render() {
    const {
      position,
      mapPaneName,
      isActive,
      className,
      listings,
      onListingClicked,
      mapComponentRefreshToken,
    } = this.props;
    return (
      <CustomOverlayView
        position={position}
        mapPaneName={mapPaneName}
        getPixelPositionOffset={getPixelPositionOffset}
      >
        <SearchMapGroupLabel
          isActive={isActive}
          className={className}
          listings={listings}
          onListingClicked={onListingClicked}
          mapComponentRefreshToken={mapComponentRefreshToken}
        />
      </CustomOverlayView>
    );
  }
}

const priceLabelsInLocations = (
  listings,
  activeListingId,
  infoCardOpen,
  onListingClicked,
  mapComponentRefreshToken
) => {
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

      // Explicit type change to object literal for Google OverlayViews (geolocation is SDK type)
      const { geolocation } = listing.attributes;
      const latLngLiteral = { lat: geolocation.lat, lng: geolocation.lng };

      return (
        <SearchMapPriceLabelWithOverlay
          key={listing.id.uuid}
          position={latLngLiteral}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          isActive={isActive}
          className={LABEL_HANDLE}
          listing={listing}
          onListingClicked={onListingClicked}
          mapComponentRefreshToken={mapComponentRefreshToken}
        />
      );
    }

    // Explicit type change to object literal for Google OverlayViews (geolocation is SDK type)
    const firstListing = ensureListing(listingArr[0]);
    const geolocation = firstListing.attributes.geolocation;
    const latLngLiteral = { lat: geolocation.lat, lng: geolocation.lng };

    return (
      <SearchMapGroupLabelWithOverlay
        key={listingArr[0].id.uuid}
        position={latLngLiteral}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        isActive={isActive}
        className={LABEL_HANDLE}
        listings={listingArr}
        onListingClicked={onListingClicked}
        mapComponentRefreshToken={mapComponentRefreshToken}
      />
    );
  });
  return priceLabels;
};

const infoCardComponent = (
  infoCardOpen,
  onListingInfoCardClicked,
  createURLToListing,
  mapComponentRefreshToken
) => {
  const listingsArray = Array.isArray(infoCardOpen) ? infoCardOpen : [infoCardOpen];

  if (!infoCardOpen) {
    return null;
  }
  // Explicit type change to object literal for Google OverlayViews (geolocation is SDK type)
  const firstListing = ensureListing(listingsArray[0]);
  const geolocation = firstListing.attributes.geolocation;
  const latLngLiteral = { lat: geolocation.lat, lng: geolocation.lng };

  return (
    <CustomOverlayView
      key={listingsArray[0].id.uuid}
      position={latLngLiteral}
      mapPaneName={OverlayView.FLOAT_PANE}
      getPixelPositionOffset={getPixelPositionOffset}
      styles={{ zIndex: 1 }}
    >
      <SearchMapInfoCard
        mapComponentRefreshToken={mapComponentRefreshToken}
        className={INFO_CARD_HANDLE}
        listings={listingsArray}
        onListingInfoCardClicked={onListingInfoCardClicked}
        createURLToListing={createURLToListing}
      />
    </CustomOverlayView>
  );
};

/**
 * MapWithGoogleMap uses withGoogleMap HOC.
 * It handles some of the google map initialization states.
 */
const MapWithGoogleMap = withGoogleMap(props => {
  const {
    center,
    infoCardOpen,
    listings,
    activeListingId,
    createURLToListing,
    onListingClicked,
    onListingInfoCardClicked,
    onIdle,
    onMapLoad,
    zoom,
    mapComponentRefreshToken,
  } = props;

  const controlPosition =
    typeof window !== 'undefined' && typeof window.google !== 'undefined'
      ? window.google.maps.ControlPosition.LEFT_TOP
      : 5;

  const priceLabels = priceLabelsInLocations(
    listings,
    activeListingId,
    infoCardOpen,
    onListingClicked,
    mapComponentRefreshToken
  );
  const infoCard = infoCardComponent(
    infoCardOpen,
    onListingInfoCardClicked,
    createURLToListing,
    mapComponentRefreshToken
  );

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
      {infoCard}
    </GoogleMap>
  );
});

class SearchMapWithGoogleMap extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.viewportBounds = null;

    this.onMapLoad = this.onMapLoad.bind(this);
    this.onIdle = this.onIdle.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.location, this.props.location)) {
      // If no mapSearch url parameter is given, this is original location search
      const { mapSearch } = parse(this.props.location.search, {
        latlng: ['origin'],
        latlngBounds: ['bounds'],
      });
      if (!mapSearch) {
        this.viewportBounds = null;
      }
    }

    if (this.map) {
      const currentBounds = getMapBounds(this.map);

      // Do not call fitMapToBounds if bounds are the same.
      // Our bounds are viewport bounds, and fitBounds will try to add margins around those bounds
      // that would result to zoom-loop (bound change -> fitmap -> bounds change -> ...)
      if (!isEqual(this.props.bounds, currentBounds) && !this.viewportBounds) {
        fitMapToBounds(this.map, this.props.bounds, { padding: 0 });
      }
    }
  }

  onMapLoad(map) {
    this.map = map;
    this.props.onMapLoad(map);
  }

  onIdle(e) {
    if (this.map) {
      // Let's try to find the map container element
      const mapContainer = this.props.containerElement.props.id
        ? document.getElementById(this.props.containerElement.props.id)
        : null;

      // If reusableMapHiddenHandle is given and parent element has that class,
      // we don't listen moveend events.
      // This fixes mobile Chrome bug that sends map events to invisible map components.
      const isHiddenByReusableMap =
        this.props.reusableMapHiddenHandle &&
        mapContainer &&
        mapContainer.parentElement.classList.contains(this.props.reusableMapHiddenHandle);

      if (!isHiddenByReusableMap) {
        const viewportMapBounds = getMapBounds(this.map);
        const viewportMapCenter = getMapCenter(this.map);
        const viewportBounds = viewportMapBounds
          ? sdkBoundsToFixedCoordinates(viewportMapBounds, BOUNDS_FIXED_PRECISION)
          : null;

        // ViewportBounds from (previous) rendering differ from viewportBounds currently set to map
        // I.e. user has changed the map somehow: moved, panned, zoomed, resized
        const viewportBoundsChanged =
          this.viewportBounds &&
          viewportBounds &&
          !hasSameSDKBounds(this.viewportBounds, viewportBounds);

        this.props.onMapMoveEnd(viewportBoundsChanged, { viewportBounds, viewportMapCenter });
        this.viewportBounds = viewportBounds;
      }
    }
  }

  render() {
    const { onMapLoad, onMapMoveEnd, center, bounds, zoom, ...rest } = this.props;
    const zoomAndCenter =
      !bounds && !center ? { zoom: 1, center: { lat: 0, lng: 0 } } : { zoom, center };
    return (
      <MapWithGoogleMap
        onMapLoad={this.onMapLoad}
        onIdle={this.onIdle}
        bounds={bounds}
        {...zoomAndCenter}
        {...rest}
      />
    );
  }
}

SearchMapWithGoogleMap.defaultProps = {
  center: new sdkTypes.LatLng(0, 0),
  infoCardOpen: null,
  listings: [],
  activeListingId: null,
  zoom: 11,
  reusableMapHiddenHandle: null,
};

SearchMapWithGoogleMap.propTypes = {
  containerElement: node.isRequired,
  center: propTypes.latlng,
  location: shape({
    search: string.isRequired,
  }).isRequired,
  infoCardOpen: oneOfType([propTypes.listing, arrayOf(propTypes.listing)]),
  listings: arrayOf(propTypes.listing),
  activeListingId: propTypes.uuid,

  onMapMoveEnd: func.isRequired,
  onMapLoad: func.isRequired,
  zoom: number,
  reusableMapHiddenHandle: string,
};

export default SearchMapWithGoogleMap;
