import React, { Component, PropTypes } from 'react';
import { OverlayView } from 'react-google-maps';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { formatMoney } from '../../util/currency';
import { ensureListing } from '../../util/data';
import config from '../../config';

import css from './SearchMapPriceLabel.css';

// Center label so that caret is pointing to correct pixel.
// (vertical positioning: height + arrow) */
const getPixelPositionOffset = (width, height) => {
  return { x: -1 * (width / 2), y: -1 * (height + 3) };
};

class SearchMapPriceLabel extends Component {
  shouldComponentUpdate(nextProps) {
    const currentListing = ensureListing(this.props.listing);
    const nextListing = ensureListing(nextProps.listing);
    const isSameListing = currentListing.id.uuid === nextListing.id.uuid;
    const hasSamePrice = currentListing.attributes.price === nextListing.attributes.price;
    return !(isSameListing && hasSamePrice);
  }

  render() {
    const { className, rootClassName, intl, listing, onListingClicked } = this.props;
    const currentListing = ensureListing(listing);
    const { geolocation, price } = currentListing.attributes;

    // Create formatted price if currency is known or alternatively show just the unknown currency.
    const formattedPrice = price && price.currency === config.currency
      ? formatMoney(intl, price)
      : price.currency;

    // Explicit type change to object literal for Google OverlayViews (geolocation is SDK type)
    const latLngLiteral = { lat: geolocation.lat, lng: geolocation.lng };
    const classes = classNames(rootClassName || css.root, className);

    return (
      <OverlayView
        position={latLngLiteral}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={getPixelPositionOffset}
      >
        <button className={classes} onClick={() => onListingClicked(currentListing)}>
          <div className={css.caretShadow} />
          <div className={css.priceLabel}>
            {formattedPrice}
          </div>
          <div className={css.caret} />
        </button>
      </OverlayView>
    );
  }
}

SearchMapPriceLabel.defaultProps = {
  className: null,
  rootClassName: null,
};

const { func, string } = PropTypes;

SearchMapPriceLabel.propTypes = {
  className: string,
  rootClassName: string,
  listing: propTypes.listing.isRequired,
  onListingClicked: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default injectIntl(SearchMapPriceLabel);
