import React, { Component, PropTypes } from 'react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { union, without } from 'lodash';
import classNames from 'classnames';
import config from '../../config';
import * as propTypes from '../../util/propTypes';
import { types } from '../../util/sdkLoader';
import { createSlug } from '../../util/urlHelpers';
import { convertMoneyToNumber } from '../../util/currency';
import { createResourceLocatorString, findRouteByRouteName } from '../../util/routes';
import { Avatar, Button, Map, ModalInMobile, PageLayout } from '../../components';
import { BookingDatesForm } from '../../containers';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import { showListing } from './ListingPage.duck';

import css from './ListingPage.css';
import noImageIcon from './images/noImageIcon.svg';

// This defines when ModalInMobile shows content as Modal
const MODAL_BREAKPOINT = 2500;

const { UUID } = types;

const priceData = (price, currencyConfig, intl) => {
  if (price && price.currency === currencyConfig.currency) {
    const priceAsNumber = convertMoneyToNumber(price, currencyConfig.subUnitDivisor);
    const formattedPrice = intl.formatNumber(priceAsNumber, currencyConfig);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: `(${price.currency})`,
      priceTitle: `Unsupported currency (${price.currency})`,
    };
  }
  return {};
};

// TODO: price unit (per x), custom fields, contact, reviews
// N.B. All the presentational content needs to be extracted to their own components
export class ListingPageComponent extends Component {
  constructor(props) {
    super(props);
    const tab = props.tab;
    this.state = {
      isBookingModalOpenOnMobile: tab && tab === 'book',
      pageClassNames: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.togglePageClassNames = this.togglePageClassNames.bind(this);
  }

  onSubmit(values) {
    const { dispatch, flattenedRoutes, history, getListing, params } = this.props;
    const listing = getListing(new UUID(params.id));

    this.setState({ isBookingModalOpenOnMobile: false });

    // Customize checkout page state with current listing and selected bookingDates
    const { setInitialValues } = findRouteByRouteName('CheckoutPage', flattenedRoutes);
    dispatch(setInitialValues({ listing, bookingDates: values, initiateOrderError: null }));

    // Redirect to CheckoutPage
    history.push(
      createResourceLocatorString(
        'CheckoutPage',
        flattenedRoutes,
        { id: listing.id.uuid, slug: createSlug(listing.attributes.title) },
        {}
      )
    );
  }

  togglePageClassNames(className, addClass = true) {
    this.setState(prevState => {
      const prevPageClassNames = prevState.pageClassNames.split(' ');
      const pageClassNames = addClass
        ? union(prevPageClassNames, [className]).join(' ')
        : without(prevPageClassNames, className).join(' ');

      return { pageClassNames };
    });
  }

  render() {
    const { params, showListingError, intl, currentUser, getListing } = this.props;
    const currencyConfig = config.currencyConfig;
    const currentListing = getListing(new UUID(params.id));

    const attributes = currentListing ? currentListing.attributes : {};
    const {
      address = '',
      description = '',
      geolocation = null,
      price = null,
      title = '',
    } = attributes;

    // TODO location address is currently serialized inside address field (API will change later)
    // Content is something like { locationAddress: 'Street, Province, Country', building: 'A 42' };
    let locationAddress = '';
    try {
      const deserializedAddress = JSON.parse(address || '{}');
      locationAddress = deserializedAddress.locationAddress;
    } catch (e) {
      locationAddress = address;
    }

    const bookBtnMessage = intl.formatMessage({ id: 'ListingPage.ctaButtonMessage' });
    const { formattedPrice, priceTitle } = priceData(price, currencyConfig, intl);
    const map = geolocation ? <Map center={geolocation} address={locationAddress} /> : null;

    // TODO Responsive image-objects need to be thought through when final image sizes are known
    const images = currentListing && currentListing.images
      ? currentListing.images.map(i => ({ id: i.id, sizes: i.attributes.sizes }))
      : [];

    // TODO: svg should have own loading strategy
    // Now noImageIcon is imported with default configuration (gives url)
    // This should be handled by ResponsiveImage or separate ImagePlaceholder component
    const noListingImage = (
      <div className={css.mainImage}>
        <div className={css.aspectWrapper}>
          <div className={css.noImageContainer}>
            <div className={css.noImageWrapper}>
              <img className={css.noImageIcon} src={noImageIcon} alt="No images added" />
              <div className={css.noImageText}>No image</div>
            </div>
          </div>
        </div>
      </div>
    );

    // TODO componentize
    const imageCarousel = images.length > 0
      ? <div className={css.imageContainer}>
          <img
            className={css.mainImage}
            alt={title}
            src={images[0].sizes.find(i => i.name === 'landscape-crop').url}
          />
          <div className={css.thumbnailContainer}>
            {images.slice(1).map(image => (
              <div key={image.id.uuid} className={css.thumbnailWrapper}>
                <div className={css.aspectWrapper}>
                  <img
                    className={css.thumbnail}
                    alt={`${title} thumbnail`}
                    src={image.sizes.find(i => i.name === 'landscape-crop').url}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      : noListingImage;

    const userAndListingAuthorAvailable = currentUser && currentListing && currentListing.author;
    const isOwnListing = userAndListingAuthorAvailable &&
      currentListing.author.id.uuid === currentUser.id.uuid;
    const showBookButton = !isOwnListing;

    const authorAvailable = currentListing && currentListing.author;
    const authorProfile = authorAvailable && currentListing.author.attributes.profile;
    const authorName = authorAvailable
      ? `${authorProfile.firstName} ${authorProfile.lastName}`
      : '';
    const authorInfo = authorAvailable
      ? <div className={css.author}>
          <div className={css.avatarWrapper}>
            <Avatar name={authorName} />
          </div>
          <div className={css.authorDetails}>
            <span className={css.authorName}>{authorName}</span>
          </div>
        </div>
      : null;

    const listingClasses = classNames(css.listing, { [css.bookable]: showBookButton });

    const pageContent = (
      <PageLayout title={`${title} ${formattedPrice}`} className={this.state.pageClassNames}>
        <div className={listingClasses}>
          <div className={css.header}>
            <h1 className={css.title}>{title}</h1>
            <div className={css.price}>
              <div className={css.priceValue} title={priceTitle}>
                {formattedPrice}
              </div>
              <div className={css.perNight}>
                <FormattedMessage id="ListingPage.perNight" />
              </div>
            </div>

          </div>
          {imageCarousel}
          {/* eslint-disable react/no-danger */}
          <div className={css.description} dangerouslySetInnerHTML={{ __html: description }} />
          {/* eslint-enable react/no-danger */}
          {authorInfo}
          <ModalInMobile
            isModalOpenOnMobile={this.state.isBookingModalOpenOnMobile}
            onClose={() => this.setState({ isBookingModalOpenOnMobile: false })}
            showAsModalMaxWidth={MODAL_BREAKPOINT}
            title={bookBtnMessage}
            togglePageClassNames={this.togglePageClassNames}
          >
            <BookingDatesForm className={css.bookingForm} onSubmit={this.onSubmit} price={price} />
          </ModalInMobile>
          {map ? <div className={css.map}>{map}</div> : null}
          {showBookButton
            ? <div className={css.openBookingForm}>
                <Button onClick={() => this.setState({ isBookingModalOpenOnMobile: true })}>
                  {bookBtnMessage}
                </Button>
              </div>
            : null}
        </div>
      </PageLayout>
    );

    const loadingPageMsg = { id: 'ListingPage.loadingListingData' };
    const loadingContent = <PageLayout title={intl.formatMessage(loadingPageMsg)} />;

    const noDataMsg = { id: 'ListingPage.noListingData' };
    const noDataError = <PageLayout title={intl.formatMessage(noDataMsg)} />;
    const loadingOrError = showListingError ? noDataError : loadingContent;

    return currentListing ? pageContent : loadingOrError;
  }
}

ListingPageComponent.defaultProps = {
  showListingError: null,
  tab: 'listing',
  currentUser: null,
};

const { arrayOf, func, instanceOf, oneOf, shape, string } = PropTypes;

ListingPageComponent.propTypes = {
  // from connect
  dispatch: func.isRequired,
  flattenedRoutes: arrayOf(propTypes.route).isRequired,
  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  // from injectIntl
  intl: intlShape.isRequired,
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
  }).isRequired,
  showListingError: instanceOf(Error),
  currentUser: propTypes.currentUser,
  getListing: func.isRequired,
  tab: oneOf(['book', 'listing']),
};

const mapStateToProps = state => {
  const { showListingError } = state.ListingPage;
  const { currentUser } = state.user;

  const getListing = id => {
    const listings = getListingsById(state, [id]);
    return listings.length === 1 ? listings[0] : null;
  };

  return { showListingError, currentUser, getListing };
};

const ListingPage = connect(mapStateToProps)(withRouter(injectIntl(ListingPageComponent)));

ListingPage.loadData = params => {
  const id = new UUID(params.id);
  return showListing(id);
};

export default ListingPage;
