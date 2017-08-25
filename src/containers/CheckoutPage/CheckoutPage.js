import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';
import Decimal from 'decimal.js';
import classNames from 'classnames';
import config from '../../config';
import { types } from '../../util/sdkLoader';
import { pathByRouteName } from '../../util/routes';
import * as propTypes from '../../util/propTypes';
import { ensureListing, ensureUser } from '../../util/data';
import { withFlattenedRoutes } from '../../util/contextHelpers';
import { nightsBetween } from '../../util/dates';
import { convertMoneyToNumber, convertUnitToSubUnit } from '../../util/currency';
import {
  AvatarMedium,
  BookingBreakdown,
  NamedLink,
  NamedRedirect,
  PageLayout,
  ResponsiveImage,
} from '../../components';
import { StripePaymentForm } from '../../containers';
import { initiateOrder, setInitialValues } from './CheckoutPage.duck';

import { storeData, storedData } from './CheckoutPageSessionHelpers';
import LogoIcon from './LogoIcon';
import css from './CheckoutPage.css';

const STORAGE_KEY = 'CheckoutPage';

// TODO: This is a temporary function to calculate the booking
// price. This should be removed when the API supports dry-runs and we
// can take the total price from the transaction itself.
const estimatedTotalPrice = (startDate, endDate, unitPrice) => {
  const { subUnitDivisor } = config.currencyConfig;
  const numericPrice = convertMoneyToNumber(unitPrice);
  const nightCount = nightsBetween(startDate, endDate);
  const numericTotalPrice = new Decimal(numericPrice).times(nightCount).toNumber();
  return new types.Money(
    convertUnitToSubUnit(numericTotalPrice, subUnitDivisor),
    unitPrice.currency
  );
};

const breakdown = (bookingStart, bookingEnd, unitPrice) => {
  if (!bookingStart || !bookingEnd || !unitPrice) {
    return null;
  }
  const totalPrice = estimatedTotalPrice(bookingStart, bookingEnd, unitPrice);
  const nightCount = nightsBetween(bookingStart, bookingEnd);

  return (
    <BookingBreakdown
      className={css.bookingBreakdown}
      bookingStart={bookingStart}
      bookingEnd={bookingEnd}
      userRole="customer"
      lineItems={[
        {
          code: 'line-item/night',
          quantity: new Decimal(nightCount),
          unitPrice: unitPrice,
          lineTotal: totalPrice,
        },
      ]}
      payinTotal={totalPrice}
    />
  );
};

export class CheckoutPageComponent extends Component {
  constructor(props) {
    super(props);
    const { bookingDates, listing } = props;

    // Store received data
    storeData(bookingDates, listing, STORAGE_KEY);

    this.state = { submitting: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(cardToken) {
    if (this.state.submitting) {
      return;
    }
    this.setState({ submitting: true });
    const { bookingDates, flattenedRoutes, history, sendOrderRequest, listing } = this.props;
    // Get page data from passed-in props or from storage
    const pageData = bookingDates && listing ? { bookingDates, listing } : storedData(STORAGE_KEY);
    const { bookingStart, bookingEnd } = pageData.bookingDates || {};
    const requestParams = { listingId: pageData.listing.id, cardToken, bookingStart, bookingEnd };

    sendOrderRequest(requestParams)
      .then(orderId => {
        this.setState({ submitting: false });
        const orderDetailsPath = pathByRouteName('OrderDetailsPage', flattenedRoutes, {
          id: orderId.uuid,
        });
        window.sessionStorage.removeItem(STORAGE_KEY);
        history.push(orderDetailsPath);
      })
      .catch(() => {
        this.setState({ submitting: false });
      });
  }

  render() {
    const {
      authInfoError,
      logoutError,
      bookingDates,
      initiateOrderError,
      intl,
      listing,
      params,
      currentUser,
    } = this.props;

    // Get page data from passed-in props or from storage
    const pageData = bookingDates && listing ? { bookingDates, listing } : storedData(STORAGE_KEY);
    const { bookingStart, bookingEnd } = pageData.bookingDates || {};
    const currentListing = ensureListing(pageData.listing);
    const currentAuthor = ensureUser(currentListing.author);
    const authorDisplayName = currentAuthor.attributes.profile.displayName;

    const isOwnListing = currentListing.id &&
      currentUser &&
      currentAuthor.id &&
      currentListing.author.id.uuid === currentUser.id.uuid;

    const hasBookingInfo = bookingStart && bookingEnd;

    // Redirect back to ListingPage if data is missing.
    // Redirection must happen before any data format error is thrown (e.g. wrong currency)
    if (!currentListing.id || isOwnListing || !hasBookingInfo) {
      // eslint-disable-next-line no-console
      console.error(
        'Listing, user, or dates invalid for checkout, redirecting back to listing page.',
        { currentListing, isOwnListing, hasBookingInfo, bookingStart, bookingEnd }
      );
      return <NamedRedirect name="ListingPage" params={params} />;
    }

    // Estimate total price. NOTE: this will change when we can do a
    // dry-run to the API and get a proper breakdown of the price.
    const { currency: marketplaceCurrency } = config.currencyConfig;
    const unitPrice = currentListing.attributes.price;

    if (!unitPrice) {
      throw new Error('Listing has no price');
    }
    if (unitPrice.currency !== marketplaceCurrency) {
      throw new Error(
        `Listing currency different from marketplace currency: ${unitPrice.currency}`
      );
    }

    // Allow showing page when currentUser is still being downloaded,
    // but show payment form only when user info is loaded.
    const showPaymentForm = currentUser && !isOwnListing;

    const listingTitle = currentListing.attributes.title;
    const title = intl.formatMessage({ id: 'CheckoutPage.title' }, { listingTitle });

    const firstImage = currentListing.images && currentListing.images.length > 0
      ? currentListing.images[0]
      : null;

    const errorMessage = initiateOrderError
      ? <p className={css.orderError}>
          <FormattedMessage id="CheckoutPage.initiateOrderError" />
        </p>
      : null;

    return (
      <PageLayout authInfoError={authInfoError} logoutError={logoutError} title={title}>
        <div className={css.topbar}>
          <NamedLink className={css.home} name="LandingPage">
            <LogoIcon
              className={css.logoMobile}
              title={intl.formatMessage({ id: 'CheckoutPage.goToLandingPage' })}
            />
            <LogoIcon
              className={css.logoDesktop}
              alt={intl.formatMessage({ id: 'CheckoutPage.goToLandingPage' })}
              isMobile={false}
            />
          </NamedLink>
        </div>

        <div className={css.contentContainer}>
          <div className={css.aspectWrapper}>
            <ResponsiveImage
              rootClassName={css.rootForImage}
              alt={listingTitle}
              image={firstImage}
              nameSet={[
                { name: 'landscape-crop', size: '400w' },
                { name: 'landscape-crop2x', size: '800w' },
              ]}
              sizes="100vw"
            />
          </div>
          <div className={classNames(css.avatarWrapper, css.avatarMobile)}>
            <AvatarMedium user={currentAuthor} />
          </div>
          <div className={css.bookListingContainer}>
            <div className={css.heading}>
              <h1 className={css.title}>{title}</h1>
              <div className={css.author}>
                <span className={css.authorName}>
                  <FormattedMessage
                    id="ListingPage.hostedBy"
                    values={{ name: authorDisplayName }}
                  />
                </span>
              </div>
            </div>

            <div className={css.priceBreakdownContainer}>
              <h3 className={css.priceBreakdownTitle}>
                <FormattedMessage id="CheckoutPage.priceBreakdownTitle" />
              </h3>
              {breakdown(bookingStart, bookingEnd, unitPrice)}
            </div>

            <section className={css.paymentContainer}>
              <h3 className={css.paymentTitle}>
                <FormattedMessage id="CheckoutPage.paymentTitle" />
              </h3>
              {errorMessage}
              {showPaymentForm
                ? <StripePaymentForm
                    className={css.paymentForm}
                    onSubmit={this.handleSubmit}
                    disableSubmit={this.state.submitting}
                    formId="CheckoutPagePaymentForm"
                    paymentInfo={intl.formatMessage({ id: 'CheckoutPage.paymentInfo' })}
                  />
                : null}
            </section>
          </div>

          <div className={css.detailsContainerDesktop}>
            <div className={css.detailsAspectWrapper}>
              <ResponsiveImage
                rootClassName={css.rootForImage}
                alt={listingTitle}
                image={firstImage}
                nameSet={[
                  { name: 'landscape-crop', size: '400w' },
                  { name: 'landscape-crop2x', size: '800w' },
                ]}
                sizes="100%"
              />
            </div>
            <div className={css.avatarWrapper}>
              <AvatarMedium user={currentAuthor} />
            </div>
            <div className={css.detailsHeadings}>
              <h2 className={css.detailsTitle}>{listingTitle}</h2>
              <p className={css.detailsSubtitle}>
                <FormattedMessage id="CheckoutPage.hostedBy" values={{ name: authorDisplayName }} />
              </p>
            </div>
            <h3 className={css.bookingBreakdownTitle}>
              <FormattedMessage id="CheckoutPage.priceBreakdownTitle" />
            </h3>
            {breakdown(bookingStart, bookingEnd, unitPrice)}
          </div>

        </div>
      </PageLayout>
    );
  }
}

CheckoutPageComponent.defaultProps = {
  authInfoError: null,
  bookingDates: null,
  initiateOrderError: null,
  listing: null,
  logoutError: null,
  currentUser: null,
};

const { arrayOf, func, instanceOf, shape, string } = PropTypes;

CheckoutPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  bookingDates: shape({
    bookingStart: instanceOf(Date).isRequired,
    bookingEnd: instanceOf(Date).isRequired,
  }),
  initiateOrderError: instanceOf(Error),
  listing: propTypes.listing,
  logoutError: instanceOf(Error),
  currentUser: propTypes.currentUser,
  params: shape({
    id: string,
    slug: string,
  }).isRequired,
  sendOrderRequest: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,

  // from withFlattenedRoutes
  flattenedRoutes: arrayOf(propTypes.route).isRequired,
};

const mapStateToProps = state => {
  const { initiateOrderError, listing, bookingDates } = state.CheckoutPage;
  const { currentUser } = state.user;
  const { authInfoError, logoutError } = state.Auth;
  return { authInfoError, initiateOrderError, listing, logoutError, bookingDates, currentUser };
};

const mapDispatchToProps = dispatch => ({
  sendOrderRequest: params => dispatch(initiateOrder(params)),
});

const CheckoutPage = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withFlattenedRoutes,
  injectIntl
)(CheckoutPageComponent);

CheckoutPage.setInitialValues = initialValues => setInitialValues(initialValues);

CheckoutPage.displayName = 'CheckoutPage';

export default CheckoutPage;
