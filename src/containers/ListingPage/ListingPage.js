import React, { Component, PropTypes } from 'react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import config from '../../config';
import * as propTypes from '../../util/propTypes';
import { types } from '../../util/sdkLoader';
import { createSlug } from '../../util/urlHelpers';
import { convertMoneyToNumber } from '../../util/currency';
import { createResourceLocatorString, findRouteByRouteName } from '../../util/routes';
import { ensureListing, ensureUser } from '../../util/data';
import { Avatar, Button, Map, ModalInMobile, PageLayout, ResponsiveImage } from '../../components';
import { BookingDatesForm, Topbar } from '../../containers';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { showListing } from './ListingPage.duck';

import css from './ListingPage.css';

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
      pageClassNames: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    const { flattenedRoutes, history, getListing, params, useInitialValues } = this.props;
    const listing = getListing(new UUID(params.id));

    this.setState({ isBookingModalOpenOnMobile: false });

    // Customize checkout page state with current listing and selected bookingDates
    const { setInitialValues } = findRouteByRouteName('CheckoutPage', flattenedRoutes);
    const { startDate: bookingStart, endDate: bookingEnd } = values.bookingDates;
    const bookingDates = { bookingStart, bookingEnd };
    useInitialValues(setInitialValues, { listing, bookingDates, initiateOrderError: null });

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

  render() {
    const {
      history,
      location,
      params,
      showListingError,
      intl,
      currentUser,
      getListing,
      onManageDisableScrolling,
      scrollingDisabled,
    } = this.props;
    const currencyConfig = config.currencyConfig;
    const currentListing = ensureListing(getListing(new UUID(params.id)));
    const {
      address = '',
      description = '',
      geolocation = null,
      price = null,
      title = '',
    } = currentListing.attributes;

    if (!currentListing.id && showListingError) {
      const noDataMsg = { id: 'ListingPage.noListingData' };
      return <PageLayout title={intl.formatMessage(noDataMsg)} />;
    } else if (!currentListing.id) {
      const loadingPageMsg = { id: 'ListingPage.loadingListingData' };
      return <PageLayout title={intl.formatMessage(loadingPageMsg)} />;
    }

    const firstImage = currentListing.images && currentListing.images.length > 0
      ? currentListing.images[0]
      : null;

    const authorAvailable = currentListing && currentListing.author;
    const userAndListingAuthorAvailable = currentUser && authorAvailable;
    const isOwnListing = userAndListingAuthorAvailable &&
      currentListing.author.id.uuid === currentUser.id.uuid;
    const showBookButton = !isOwnListing;

    const { firstName: authorFirstName, lastName: authorLastName } = authorAvailable
      ? ensureUser(currentListing.author).attributes.profile
      : { firstName: '', lastName: '' };

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
    const map = geolocation
      ? <div className={css.locationContainer}>
          <h3 className={css.locationTitle}>
            <FormattedMessage id="ListingPage.locationTitle" />
          </h3>
          <div className={css.map}><Map center={geolocation} address={locationAddress} /></div>
        </div>
      : null;

    const listingClasses = classNames(css.listing, { [css.bookable]: showBookButton });

    return (
      <PageLayout title={`${title} ${formattedPrice}`} scrollingDisabled={scrollingDisabled}>
        <Topbar history={history} location={location} />
        <div className={listingClasses}>
          <div className={css.threeToTwoWrapper}>
            <div className={css.aspectWrapper}>
              <ResponsiveImage
                rootClassName={css.rootForImage}
                alt={title}
                image={firstImage}
                nameSet={[
                  { name: 'landscape-crop', size: '400w' },
                  { name: 'landscape-crop2x', size: '800w' },
                ]}
                sizes="100vw"
              />
            </div>
          </div>

          <div className={css.avatarWrapper}>
            <Avatar
              rootClassName={css.avatar}
              firstName={authorFirstName}
              lastName={authorLastName}
            />
          </div>

          <div className={css.heading}>
            <h1 className={css.title}>{title}</h1>
            <div className={css.author}>
              <span className={css.authorName}>
                <FormattedMessage id="ListingPage.hostedBy" values={{ name: authorFirstName }} />
              </span>
            </div>
          </div>

          <div className={css.descriptionContainer}>
            <h3 className={css.descriptionTitle}>
              <FormattedMessage id="ListingPage.descriptionTitle" />
            </h3>
            <p className={css.description}>{description}</p>
          </div>

          {map}

          <ModalInMobile
            id="BookingDatesFormInModal"
            isModalOpenOnMobile={this.state.isBookingModalOpenOnMobile}
            onClose={() => this.setState({ isBookingModalOpenOnMobile: false })}
            showAsModalMaxWidth={MODAL_BREAKPOINT}
            onManageDisableScrolling={onManageDisableScrolling}
          >
            <div className={css.modalHeading}>
              <h1 className={css.title}>{title}</h1>
              <div className={css.author}>
                <span className={css.authorName}>
                  <FormattedMessage id="ListingPage.hostedBy" values={{ name: authorFirstName }} />
                </span>
              </div>
            </div>
            <BookingDatesForm className={css.bookingForm} onSubmit={this.onSubmit} price={price} />
          </ModalInMobile>
          {showBookButton
            ? <div className={css.openBookingForm}>
                <div className={css.priceContainer}>
                  <div className={css.priceValue} title={priceTitle}>
                    {formattedPrice}
                  </div>
                  <div className={css.perNight}>
                    <FormattedMessage id="ListingPage.perNight" />
                  </div>
                </div>

                <Button
                  rootClassName={css.bookButton}
                  onClick={() => this.setState({ isBookingModalOpenOnMobile: true })}
                >
                  {bookBtnMessage}
                </Button>
              </div>
            : null}
        </div>
      </PageLayout>
    );
  }
}

ListingPageComponent.defaultProps = {
  showListingError: null,
  tab: 'listing',
  currentUser: null,
};

const { arrayOf, bool, func, instanceOf, object, oneOf, shape, string } = PropTypes;

ListingPageComponent.propTypes = {
  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: object.isRequired,
  flattenedRoutes: arrayOf(propTypes.route).isRequired,
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
  scrollingDisabled: bool.isRequired,
  onManageDisableScrolling: func.isRequired,
  useInitialValues: func.isRequired,
};

const mapStateToProps = state => {
  const { showListingError } = state.ListingPage;
  const { currentUser } = state.user;

  const getListing = id => {
    const listings = getListingsById(state, [id]);
    return listings.length === 1 ? listings[0] : null;
  };

  return {
    showListingError,
    currentUser,
    getListing,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  useInitialValues: (setInitialValues, { listing, bookingDates, initiateOrderError }) =>
    dispatch(setInitialValues({ listing, bookingDates, initiateOrderError })),
});

const ListingPage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter, injectIntl)(
  ListingPageComponent
);

ListingPage.loadData = params => {
  const id = new UUID(params.id);
  return showListing(id);
};

export default ListingPage;
