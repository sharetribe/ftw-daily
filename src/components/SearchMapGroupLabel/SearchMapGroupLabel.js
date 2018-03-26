import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OverlayView } from 'react-google-maps';
import { OVERLAY_VIEW } from 'react-google-maps/lib/constants';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { ensureListing } from '../../util/data';

import css from './SearchMapGroupLabel.css';

// FIX "TypeError: Cannot read property 'overlayMouseTarget' of null"
// Override draw function to catch errors with map panes being undefined to prevent console errors
// https://github.com/tomchentw/react-google-maps/issues/482
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
    const { className, rootClassName, listings, onListingClicked, isActive } = this.props;
    const firstListing = ensureListing(listings[0]);
    const geolocation = firstListing.attributes.geolocation;

    // Explicit type change to object literal for Google OverlayViews (geolocation is SDK type)
    const latLngLiteral = { lat: geolocation.lat, lng: geolocation.lng };
    const classes = classNames(rootClassName || css.root, className);
    const countLabelClasses = classNames(css.details, { [css.detailsActive]: isActive });
    const caretClasses = classNames(css.caret, { [css.caretActive]: isActive });

    return (
      <CustomOverlayView
        position={latLngLiteral}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={getPixelPositionOffset}
      >
        <button className={classes} onClick={() => onListingClicked(listings)}>
          <div className={css.caretShadow} />
          <div className={countLabelClasses}>{listings.length}</div>
          <div className={caretClasses} />
        </button>
      </CustomOverlayView>
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
