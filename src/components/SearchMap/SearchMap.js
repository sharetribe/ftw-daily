import React, { Component, PropTypes } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { injectIntl, intlShape } from 'react-intl';
import { isEqualWith } from 'lodash';
import classNames from 'classnames';
import { types as sdkTypes } from '../../util/sdkLoader';
import * as propTypes from '../../util/propTypes';
import { formatMoney } from '../../util/currency';
import config from '../../config';

import css from './SearchMap.css';

const fitMapToBounds = (map, bounds) => {
  const { ne, sw } = bounds || {};
  // map bounds as string literal for google.maps
  const mapBounds = bounds ? { north: ne.lat, east: ne.lng, south: sw.lat, west: sw.lng } : null;

  if (mapBounds) {
    map.fitBounds(mapBounds);
  }
};

const createDiv = (className, text) => {
  const d = document.createElement(`div`);
  d.className = className;
  if (text) {
    d.appendChild(document.createTextNode(text));
  }
  return d;
};

class SearchMapComponent extends Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.priceLabelOverlays = [];
  }

  componentDidMount() {
    const mapsLibLoaded = window.google && window.google.maps;
    if (!mapsLibLoaded) {
      throw new Error('Google Maps API must be loaded for the SearchMap component');
    }

    const { intl, bounds, center, zoom } = this.props;
    const centerLocation = { lat: center.lat, lng: center.lng };
    const mapOptions = {
      center: centerLocation,
      zoom,

      // Disable map type (ie. Satellite etc.)
      mapTypeControl: false,

      // Disable zooming by scrolling
      scrollwheel: false,
    };

    // Create map
    this.map = new window.google.maps.Map(this.el, mapOptions);

    // If bounds are given, use it (defaults to center & zoom).
    fitMapToBounds(this.map, bounds);

    // This is now done according to Google Maps examples
    // https://developers.google.com/maps/documentation/javascript/examples/overlay-simple
    // TODO It should be possible to do this more React way, but that enhancement must be done later
    this.MapPriceOverlayMarker = class extends window.google.maps.OverlayView {
      constructor(listing, origin, map) {
        super();

        // Initialize all properties.
        this.listing = listing;
        this.origin = origin;
        this.map = map;

        // Define a property to hold the price label.
        // This happens in onAdd method
        this.overlayContainer = null;

        // Explicitly call setMap on this overlay.
        // This will trigger calls to onAdd and draw methods
        this.setMap(map);
      }

      /**
       * onAdd is called when the map's panes are ready and the overlay has been
       * added to the map.
       */
      onAdd() {
        const overlayDiv = document.createElement(`div`);
        overlayDiv.style.position = `absolute`;
        overlayDiv.dataset.overlayId = this.listing.id.uuid;
        this.overlayContainer = overlayDiv;

        const price = formatMoney(intl, config.currencyConfig, this.listing.attributes.price);

        // Create price label
        // TODO this should be possible with React too,
        // but life-cycle management needs some some extra research
        const root = createDiv(css.labelRoot);
        root.appendChild(createDiv(css.caretShadow));
        root.appendChild(createDiv(css.priceLabel, price));
        root.appendChild(createDiv(css.caret));
        this.overlayContainer.appendChild(root);

        // Add the element to the "overlayMouseTarget" pane.
        // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapPanes
        const panes = this.getPanes();
        panes.overlayMouseTarget.appendChild(overlayDiv);
      }

      draw() {
        // We need to retrieve the projection from the overlay, to map pixels to coordinates
        // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapCanvasProjection
        const overlayProjection = this.getProjection();
        const point = overlayProjection.fromLatLngToDivPixel(this.origin);

        if (point) {
          this.overlayContainer.style.left = `${point.x}px`;
          this.overlayContainer.style.top = `${point.y}px`;
          this.overlayContainer.style.height = `0`;
        }

        window.google.maps.event.addDomListener(this.overlayContainer, 'click', event => {
          // TODO: Click handler needs to open info window at some point
          // eslint-disable-next-line no-console
          console.log(
            `OverlayLayer (${event.target.closest('[data-overlay-id]').dataset.overlayId}) clicked.`
          );
          window.google.maps.event.trigger(self, 'click');
        });
      }

      /**
       * The onRemove() method will be called automatically from the API if
       * we ever set the overlay's map property to 'null'.
       */
      onRemove() {
        // Remove container from parent node and tell React about it too
        this.overlayContainer.parentNode.removeChild(this.overlayContainer);
        unmountComponentAtNode(this.overlayContainer);
        this.overlayContainer = null;
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    const { bounds, listings } = nextProps;

    fitMapToBounds(this.map, bounds);

    const hasSameListings = isEqualWith(listings, this.props.listings);
    const hasOverlaysOnMap = this.map && this.priceLabelOverlays.length > 0;
    if (!(hasSameListings && hasOverlaysOnMap)) {
      // Clear markers from map
      this.priceLabelOverlays.forEach(o => o.setMap(null));
      this.priceLabelOverlays = [];

      this.priceLabelOverlays = listings.reverse().map(listing => {
        const geolocation = listing.attributes.geolocation;
        const googleLatLng = new window.google.maps.LatLng({
          lat: geolocation.lat,
          lng: geolocation.lng,
        });

        return new this.MapPriceOverlayMarker(listing, googleLatLng, this.map);
      });
    }
  }

  render() {
    const { className, rootClassName } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    return (
      <div
        className={classes}
        ref={el => {
          this.el = el;
        }}
      />
    );
  }
}

SearchMapComponent.defaultProps = {
  className: '',
  rootClassName: null,
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
  rootClassName: string,
  zoom: number,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SearchMap = injectIntl(SearchMapComponent);

export default SearchMap;
