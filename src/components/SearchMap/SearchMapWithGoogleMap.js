import React from 'react';
import { arrayOf, bool, func, number, oneOfType } from 'prop-types';
import { withGoogleMap, GoogleMap, OverlayView } from 'react-google-maps';
import { OVERLAY_VIEW } from 'react-google-maps/lib/constants';
import { types as sdkTypes } from '../../util/sdkLoader';
import { propTypes } from '../../util/types';
import { ensureListing } from '../../util/data';
import { SearchMapInfoCard, SearchMapPriceLabel, SearchMapGroupLabel } from '../../components';

import { groupedByCoordinates, reducedToArray } from './SearchMap.helpers.js';

export const LABEL_HANDLE = 'SearchMapLabel';
export const INFO_CARD_HANDLE = 'SearchMapInfoCard';

/**
 * Fit part of map (descriped with bounds) to visible map-viewport
 *
 * @param {Object} map - map that needs to be centered with given bounds
 * @param {SDK.LatLngBounds} bounds - the area that needs to be visible when map loads.
 */
export const fitMapToBounds = (map, bounds, padding) => {
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
  draw() {
    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapPanes
    const mapPanes = this.state[OVERLAY_VIEW].getPanes();
    // Add conditional to ensure panes and container exist before drawing
    if (mapPanes && this.containerElement) {
      super.draw();
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
        <CustomOverlayView
          key={listing.id.uuid}
          position={latLngLiteral}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={getPixelPositionOffset}
        >
          <SearchMapPriceLabel
            isActive={isActive}
            className={LABEL_HANDLE}
            listing={listing}
            onListingClicked={onListingClicked}
            mapComponentRefreshToken={mapComponentRefreshToken}
          />
        </CustomOverlayView>
      );
    }

    // Explicit type change to object literal for Google OverlayViews (geolocation is SDK type)
    const firstListing = ensureListing(listings[0]);
    const geolocation = firstListing.attributes.geolocation;
    const latLngLiteral = { lat: geolocation.lat, lng: geolocation.lng };

    return (
      <CustomOverlayView
        key={listingArr[0].id.uuid}
        position={latLngLiteral}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={getPixelPositionOffset}
      >
        <SearchMapGroupLabel
          isActive={isActive}
          className={LABEL_HANDLE}
          listings={listingArr}
          onListingClicked={onListingClicked}
          mapComponentRefreshToken={mapComponentRefreshToken}
        />
      </CustomOverlayView>
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
    isOpenOnModal,
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

MapWithGoogleMap.defaultProps = {
  center: new sdkTypes.LatLng(0, 0),
  infoCardOpen: null,
  // priceLabels: [],
  // infoCard: null,
  listings: [],
  activeListingId: null,
  zoom: 11,
};

MapWithGoogleMap.propTypes = {
  center: propTypes.latlng,
  infoCardOpen: oneOfType([propTypes.listing, arrayOf(propTypes.listing)]),
  // priceLabels: arrayOf(node),
  // infoCard: node,
  listings: arrayOf(propTypes.listing),
  activeListingId: propTypes.uuid,

  onIdle: func.isRequired,
  onMapLoad: func.isRequired,
  zoom: number,
};

export default MapWithGoogleMap;
