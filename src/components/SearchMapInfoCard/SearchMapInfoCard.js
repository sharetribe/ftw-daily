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

import css from './SearchMapInfoCard.css';

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

// ListingCard is the listing info without overlayview or carousel controls
const ListingCard = props => {
  const { className, clickHandler, flattenedRoutes, history, intl, isInCarousel, listing } = props;

  const { title, price } = listing.attributes;
  const formattedPrice = price && price.currency === config.currency
    ? formatMoney(intl, price)
    : price.currency;
  const firstImage = listing.images && listing.images.length > 0 ? listing.images[0] : null;
  const urlToListing = createURL(flattenedRoutes, history, listing);

  // listing card anchor needs sometimes inherited border radius.
  const classes = classNames(
    css.anchor,
    css.borderRadiusInheritTop,
    { [css.borderRadiusInheritBottom]: !isInCarousel },
    className
  );

  return (
    <a
      alt={title}
      className={classes}
      href={urlToListing}
      onClick={e => {
        e.preventDefault();
        // Handle click callbacks and use internal router
        clickHandler(urlToListing);
      }}
    >
      <div
        className={classNames(css.card, css.borderRadiusInheritTop, {
          [css.borderRadiusInheritBottom]: !isInCarousel,
        })}
      >
        <div className={classNames(css.threeToTwoWrapper, css.borderRadiusInheritTop)}>
          <div className={classNames(css.aspectWrapper, css.borderRadiusInheritTop)}>
            <ResponsiveImage
              rootClassName={classNames(css.rootForImage, css.borderRadiusInheritTop)}
              alt={title}
              noImageMessage={intl.formatMessage({ id: 'SearchMapInfoCard.noImage' })}
              image={firstImage}
              nameSet={[
                { name: 'landscape-crop', size: '1x' },
                { name: 'landscape-crop2x', size: '2x' },
              ]}
            />
          </div>
        </div>
        <div className={classNames(css.info, { [css.borderRadiusInheritBottom]: !isInCarousel })}>
          <div className={css.price}>
            {formattedPrice}
          </div>
          <div className={css.name}>
            {title}
          </div>
        </div>
      </div>
    </a>
  );
};

ListingCard.defaultProps = {
  className: null,
};

const { arrayOf, bool, func, shape, string } = PropTypes;

ListingCard.propTypes = {
  className: string,
  listing: propTypes.listing.isRequired,
  clickHandler: func.isRequired,
  flattenedRoutes: arrayOf(propTypes.route).isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
  isInCarousel: bool.isRequired,
};

class SearchMapInfoCard extends Component {
  constructor(props) {
    super(props);

    this.state = { currentListingIndex: 0 };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(urlToListing) {
    if (this.props.onClickCallback) {
      this.props.onClickCallback();
    }

    // To avoid full page refresh we need to use internal router
    const history = this.props.history;
    history.push(urlToListing);
  }

  render() {
    const { className, rootClassName, intl, flattenedRoutes, history, listings } = this.props;
    const currentListing = ensureListing(listings[this.state.currentListingIndex]);
    const geolocation = currentListing.attributes.geolocation;

    // Explicit type change to object literal for Google OverlayViews (geolocation is SDK type)
    const latLngLiteral = { lat: geolocation.lat, lng: geolocation.lng };
    const hasCarousel = listings.length > 1;
    const pagination = hasCarousel
      ? <div className={classNames(css.paginationInfo, css.borderRadiusInheritBottom)}>
          <button
            className={css.paginationPrev}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              this.setState(prevState => ({
                currentListingIndex: (prevState.currentListingIndex + listings.length - 1) %
                  listings.length,
              }));
            }}
          />
          <div className={css.paginationPage}>
            {`${this.state.currentListingIndex + 1}/${listings.length}`}
          </div>
          <button
            className={css.paginationNext}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              this.setState(prevState => ({
                currentListingIndex: (prevState.currentListingIndex + listings.length + 1) %
                  listings.length,
              }));
            }}
          />
        </div>
      : null;

    const classes = classNames(rootClassName || css.root, className);
    const caretClass = classNames(css.caret, { [css.caretWithCarousel]: hasCarousel });

    return (
      <OverlayView
        position={latLngLiteral}
        mapPaneName={OverlayView.FLOAT_PANE}
        getPixelPositionOffset={getPixelPositionOffset}
        styles={{ zIndex: 1 }}
      >
        <div className={classes}>
          <div className={css.caretShadow} />
          <ListingCard
            clickHandler={this.clickHandler}
            listing={currentListing}
            flattenedRoutes={flattenedRoutes}
            history={history}
            intl={intl}
            isInCarousel={hasCarousel}
          />
          {pagination}
          <div className={caretClass} />
        </div>
      </OverlayView>
    );
  }
}

SearchMapInfoCard.defaultProps = {
  className: null,
  rootClassName: null,
  onClickCallback: null,
};

SearchMapInfoCard.propTypes = {
  className: string,
  rootClassName: string,
  listings: arrayOf(propTypes.listing).isRequired,
  onClickCallback: func,

  // from withFlattenedRoutes
  flattenedRoutes: arrayOf(propTypes.route).isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default compose(withRouter, withFlattenedRoutes, injectIntl)(SearchMapInfoCard);
