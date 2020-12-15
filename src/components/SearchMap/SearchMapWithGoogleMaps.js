import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import invariant from 'invariant';
import { arrayOf, func, node, number, oneOfType, shape, string } from 'prop-types';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { types as sdkTypes } from '../../util/sdkLoader';
import { parse } from '../../util/urlHelpers';
import { propTypes } from '../../util/types';
import { ensureListing } from '../../util/data';
import { sdkBoundsToFixedCoordinates, hasSameSDKBounds } from '../../util/maps';
import { getOffsetOverride, getLayoutStyles } from '../../util/googleMaps';
import { SearchMapInfoCard, SearchMapPriceLabel, SearchMapGroupLabel } from '../../components';

import { groupedByCoordinates, reducedToArray } from './SearchMap.helpers.js';
import css from './SearchMapWithGoogleMaps.module.css';

export const LABEL_HANDLE = 'SearchMapLabel';
export const INFO_CARD_HANDLE = 'SearchMapInfoCard';
const BOUNDS_FIXED_PRECISION = 8;

// Panes on Google Maps specify the stacking order for different layers on the map.
// https://developers.google.com/maps/documentation/javascript/customoverlays#intitialize
//
// Google Maps uses 5 different panes:
// 'mapPane', 'overlayLayer', 'markerLayer', 'overlayMouseTarget', 'floatPane'
// We only need the last 2:
// - 'overlayMouseTarget': for the SearchMapPriceLabelWithOverlay & SearchMapGroupLabelWithOverlay.
// - 'floatPane': to render InfoCardComponent on top of price and group labels.
const OVERLAY_MOUSE_TARGET = 'overlayMouseTarget'; // Stacking order: 4
const FLOAT_PANE = 'floatPane'; // Stacking order: 5

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
 * To render HTML on top of Google Maps, we need use OverlayView.
 * Note: we don't extend the OverlayView directly, because then
 * the class should be defined inside initializeMap function.
 */
class CustomOverlayView extends Component {
  constructor(props, context) {
    super(props, context);
    const overlayView = new window.google.maps.OverlayView();

    overlayView.onAdd = this.onAdd.bind(this);
    overlayView.draw = this.draw.bind(this);
    overlayView.onRemove = this.onRemove.bind(this);
    this.onPositionElement = this.onPositionElement.bind(this);

    // You must call setMap() with a valid Map object to trigger the call to
    // the onAdd() method and setMap(null) in order to trigger the onRemove() method.
    overlayView.setMap(props.map);
    this.state = { overlayView };
  }

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

    const mapPanes = this.state.overlayView.getPanes();
    mapPanes[mapPaneName].appendChild(this.containerElement);
    this.onPositionElement();
    this.forceUpdate();
  }

  onPositionElement() {
    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapCanvasProjection
    const mapCanvasProjection = this.state.overlayView.getProjection();

    const offset = {
      x: 0,
      y: 0,
      ...getOffsetOverride(this.containerElement, this.props),
    };
    const layoutStyles = getLayoutStyles(mapCanvasProjection, offset, this.props);
    _.assign(this.containerElement.style, layoutStyles);
  }

  draw() {
    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapPanes
    const mapPanes = this.state.overlayView.getPanes();
    // Add conditional to ensure panes and container exist before drawing
    if (mapPanes && this.containerElement) {
      this.onPositionElement();
    }
  }

  render() {
    if (React.version.match(/^16/) && this.containerElement) {
      return ReactDOM.createPortal(React.Children.only(this.props.children), this.containerElement);
    }
    return false;
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
      map,
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
        map={map}
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
      map,
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
        map={map}
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

/**
 * Render price labels or group "markers" based on listings array.
 */
const PriceLabelsAndGroups = props => {
  const {
    map,
    listings,
    activeListingId,
    infoCardOpen,
    onListingClicked,
    mapComponentRefreshToken,
  } = props;
  const listingArraysInLocations = reducedToArray(groupedByCoordinates(listings));
  const priceLabels = listingArraysInLocations.reverse().map(listingArr => {
    const isActive = activeListingId
      ? !!listingArr.find(l => activeListingId.uuid === l.id.uuid)
      : false;
    const classes = classNames(css.labelContainer, LABEL_HANDLE, { [css.activeLabel]: isActive });

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
          map={map}
          mapPaneName={OVERLAY_MOUSE_TARGET}
          isActive={isActive}
          className={classes}
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
        map={map}
        mapPaneName={OVERLAY_MOUSE_TARGET}
        isActive={isActive}
        className={classes}
        listings={listingArr}
        onListingClicked={onListingClicked}
        mapComponentRefreshToken={mapComponentRefreshToken}
      />
    );
  });
  return priceLabels;
};

/**
 * Render info-card overlay if the card is open.
 */
const InfoCardComponent = props => {
  const {
    map,
    infoCardOpen,
    onListingInfoCardClicked,
    createURLToListing,
    mapComponentRefreshToken,
  } = props;
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
      map={map}
      mapPaneName={FLOAT_PANE}
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
 * Render GoogleMaps and add price labels, group "markers" and infocard using OverlayView.
 */
class SearchMapWithGoogleMaps extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.viewportBounds = null;
    this.idleListener = null;
    this.state = { mapContainer: null, isMapReady: false };

    this.initializeMap = this.initializeMap.bind(this);
    this.onMount = this.onMount.bind(this);
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

      if (prevProps.infoCardOpen !== this.props.infoCardOpen) {
        this.map.setOptions({ disableDoubleClickZoom: !!this.props.infoCardOpen });
      }
    }

    if (!this.map && this.state.mapContainer) {
      this.initializeMap();

      /* Notify parent component that the map is loaded */
      this.props.onMapLoad(this.map);
    } else if (prevProps.mapComponentRefreshToken !== this.props.mapComponentRefreshToken) {
      /* Notify parent component that the map is loaded */
      this.props.onMapLoad(this.map);
    }
  }

  componentWillUnmount() {
    this.idleListener.remove();
  }

  initializeMap() {
    const { offsetHeight, offsetWidth } = this.state.mapContainer;
    const hasDimensions = offsetHeight > 0 && offsetWidth > 0;

    if (hasDimensions) {
      const { bounds, center, zoom } = this.props;
      const maps = window.google.maps;
      const controlPosition = maps.ControlPosition.LEFT_TOP;
      const zoomOutToShowEarth = { zoom: 1, center: { lat: 0, lng: 0 } };
      const zoomAndCenter = !bounds && !center ? zoomOutToShowEarth : { zoom, center };

      const mapConfig = {
        // Disable all controls except zoom
        // https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
        mapTypeControl: false,
        scrollwheel: false,
        fullscreenControl: false,
        clickableIcons: false,
        streetViewControl: false,

        zoomControlOptions: {
          position: controlPosition,
        },

        // Add default viewport (the whole world)
        ...zoomAndCenter,
      };

      this.map = new maps.Map(this.state.mapContainer, mapConfig);
      this.idleListener = maps.event.addListener(this.map, 'idle', this.onIdle);
      this.setState({
        isMapReady: true,
      });
    }
  }

  onMount(element) {
    this.setState({ mapContainer: element });
  }

  onIdle(e) {
    if (this.map) {
      // If reusableMapHiddenHandle is given and parent element has that class,
      // we don't listen moveend events.
      // This fixes mobile Chrome bug that sends map events to invisible map components.
      const isHiddenByReusableMap =
        this.props.reusableMapHiddenHandle &&
        this.state.mapContainer.parentElement.classList.contains(
          this.props.reusableMapHiddenHandle
        );
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
    const {
      id,
      className,
      onMapLoad,
      onMapMoveEnd,
      center,
      bounds,
      zoom,
      listings,
      activeListingId,
      infoCardOpen,
      onListingClicked,
      mapComponentRefreshToken,
      onListingInfoCardClicked,
      createURLToListing,
      ...rest
    } = this.props;
    return (
      <div
        id={id}
        ref={this.onMount}
        className={classNames(className, css.fullArea)}
        onClick={this.props.onClick}
      >
        {this.map ? (
          <PriceLabelsAndGroups
            map={this.map}
            listings={listings}
            activeListingId={activeListingId}
            infoCardOpen={infoCardOpen}
            onListingClicked={onListingClicked}
            mapComponentRefreshToken={mapComponentRefreshToken}
          />
        ) : null}
        {this.map ? (
          <InfoCardComponent
            map={this.map}
            infoCardOpen={infoCardOpen}
            onListingInfoCardClicked={onListingInfoCardClicked}
            createURLToListing={createURLToListing}
            mapComponentRefreshToken={mapComponentRefreshToken}
          />
        ) : null}
      </div>
    );
  }
}

SearchMapWithGoogleMaps.defaultProps = {
  id: 'map',
  center: new sdkTypes.LatLng(0, 0),
  infoCardOpen: null,
  listings: [],
  activeListingId: null,
  zoom: 11,
  reusableMapHiddenHandle: null,
};

SearchMapWithGoogleMaps.propTypes = {
  id: string,
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

export default SearchMapWithGoogleMaps;
