import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OverlayView } from 'react-google-maps';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { ensureListing } from '../../util/data';

import css from './SearchMapGroupLabel.css';

// Center label so that caret is pointing to correct pixel.
// (vertical positioning: height + arrow) */
const getPixelPositionOffset = (width, height) => {
  return { x: -1 * (width / 2), y: -1 * (height + 3) };
};

class SearchMapGroupLabel extends Component {
  shouldComponentUpdate(nextProps) {
    const hasSameAmountOfListings = nextProps.listings.length === this.props.listings.length;
    const hasSameActiveStatus = this.props.isActive === nextProps.isActive;

    return !(hasSameAmountOfListings && hasSameActiveStatus);
  }

  render() {
    const { className, rootClassName, listings, onListingClicked } = this.props;
    const firstListing = ensureListing(listings[0]);
    const geolocation = firstListing.attributes.geolocation;

    // Explicit type change to object literal for Google OverlayViews (geolocation is SDK type)
    const latLngLiteral = { lat: geolocation.lat, lng: geolocation.lng };
    const classes = classNames(rootClassName || css.root, className);

    return (
      <OverlayView
        position={latLngLiteral}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={getPixelPositionOffset}
      >
        <button className={classes} onClick={() => onListingClicked(listings)}>
          <div className={css.caretShadow} />
          <div className={css.details}>{listings.length}</div>
          <div className={css.caret} />
        </button>
      </OverlayView>
    );
  }
}

SearchMapGroupLabel.defaultProps = {
  className: null,
  rootClassName: null,
};

const { arrayOf, func, string } = PropTypes;

SearchMapGroupLabel.propTypes = {
  className: string,
  rootClassName: string,
  listings: arrayOf(propTypes.listing).isRequired,
  onListingClicked: func.isRequired,
};

export default SearchMapGroupLabel;
