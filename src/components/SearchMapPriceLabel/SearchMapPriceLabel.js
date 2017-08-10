import React, { PropTypes } from 'react';
import { OverlayView } from 'react-google-maps';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';

import css from './SearchMapPriceLabel.css';

// Center label so that caret is pointing to correct pixel.
// (vertical positioning: height + arrow) */
const getPixelPositionOffset = (width, height) => {
  return { x: -1 * (width / 2), y: -1 * (height + 3) };
};

const SearchMapPriceLabel = props => {
  const { className, rootClassName, price, listing } = props;
  const geolocation = listing.attributes.geolocation;

  // Explicit type change to object literal for Google OverlayViews (geolocation is SDK type)
  const latLngLiteral = { lat: geolocation.lat, lng: geolocation.lng };
  const classes = classNames(rootClassName || css.root, className);

  return (
    <OverlayView
      position={latLngLiteral}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <div className={classes}>
        <div className={css.caretShadow} />
        <div className={css.priceLabel}>
          {price}
        </div>
        <div className={css.caret} />
      </div>
    </OverlayView>
  );
};

SearchMapPriceLabel.defaultProps = {
  className: null,
  rootClassName: null,
};

const { string } = PropTypes;

SearchMapPriceLabel.propTypes = {
  className: string,
  rootClassName: string,
  listing: propTypes.listing.isRequired,
  price: string.isRequired,
};

export default SearchMapPriceLabel;
