import React, { Component, PropTypes } from 'react';
import { OverlayView } from 'react-google-maps';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import config from '../../config';
import * as propTypes from '../../util/propTypes';
import { formatMoney } from '../../util/currency';
import { ensureListing } from '../../util/data';
import { withFlattenedRoutes } from '../../util/contextHelpers';
import { createResourceLocatorString } from '../../util/routes';
import { createSlug } from '../../util/urlHelpers';
import { ResponsiveImage } from '../../components';

import css from './SearchMapListingCard.css';

// Center label so that caret is pointing to correct pixel.
// (vertical positioning: height + arrow) */
const getPixelPositionOffset = (width, height) => {
  return { x: -1 * (width / 2), y: -1 * (height + 3) };
};

const createURL = (flattenedRoutes, history, listing) => {
  const id = listing.id.uuid;
  const slug = createSlug(listing.attributes.title);
  const pathParams = { id, slug };
  return createResourceLocatorString('ListingPage', flattenedRoutes, pathParams, {});
};

class SearchMapListingCard extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    e.preventDefault();

    // To avoid full page refresh we need to use internal router
    const { flattenedRoutes, history, listing } = this.props;
    history.push(createURL(flattenedRoutes, history, ensureListing(listing)));
  }

  render() {
    const { className, rootClassName, intl, flattenedRoutes, history, listing } = this.props;
    const currentListing = ensureListing(listing);
    const { geolocation, title, price } = currentListing.attributes;
    const formattedPrice = price && price.currency === config.currencyConfig.currency
      ? formatMoney(intl, config.currencyConfig, price)
      : price.currency;
    const firstImage = currentListing.images && currentListing.images.length > 0
      ? currentListing.images[0]
      : null;
    const urlToListing = createURL(flattenedRoutes, history, currentListing);

    // Explicit type change to object literal for Google OverlayViews (geolocation is SDK type)
    const latLngLiteral = { lat: geolocation.lat, lng: geolocation.lng };
    const classes = classNames(rootClassName || css.root, className);

    return (
      <OverlayView
        position={latLngLiteral}
        mapPaneName={OverlayView.FLOAT_PANE}
        getPixelPositionOffset={getPixelPositionOffset}
        styles={{ zIndex: 1 }}
      >
        <div className={classes}>
          <a alt={title} className={css.anchor} href={urlToListing} onClick={this.clickHandler}>
            <div className={css.caretShadow} />
            <div className={css.card}>
              <div className={css.threeToTwoWrapper}>
                <div className={css.aspectWrapper}>
                  <ResponsiveImage
                    rootClassName={css.rootForImage}
                    alt={title}
                    noImageMessage={intl.formatMessage({ id: 'SearchMapListingCard.noImage' })}
                    image={firstImage}
                    nameSet={[
                      { name: 'landscape-crop', size: '1x' },
                      { name: 'landscape-crop2x', size: '2x' },
                    ]}
                  />
                </div>
              </div>
              <div className={css.info}>
                <div className={css.price}>
                  {formattedPrice}
                </div>
                <div className={css.name}>
                  {title}
                </div>
              </div>
            </div>
            <div className={css.caret} />
          </a>
        </div>
      </OverlayView>
    );
  }
}

SearchMapListingCard.defaultProps = {
  className: null,
  rootClassName: null,
};

const { arrayOf, func, shape, string } = PropTypes;

SearchMapListingCard.propTypes = {
  className: string,
  rootClassName: string,
  listing: propTypes.listing.isRequired,

  // from withFlattenedRoutes
  flattenedRoutes: arrayOf(propTypes.route).isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default compose(withRouter, withFlattenedRoutes, injectIntl)(SearchMapListingCard);
