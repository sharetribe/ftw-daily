import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { reduce } from 'lodash';
import moment from 'moment';
import Decimal from 'decimal.js';
import config from '../../config';
import { types } from '../../util/sdkLoader';
import { pathByRouteName } from '../../util/routes';
import * as propTypes from '../../util/propTypes';
import { ensureListing, ensureUser } from '../../util/data';
import { withFlattenedRoutes } from '../../util/contextHelpers';
import { nightsBetween } from '../../util/dates';
import { convertMoneyToNumber, convertUnitToSubUnit } from '../../util/currency';
import { BookingBreakdown, NamedLink, NamedRedirect, PageLayout } from '../../components';
import { StripePaymentForm } from '../../containers';
import { initiateOrder, setInitialValues } from './CheckoutPage.duck';

import LogoIcon from './LogoIcon';
import css from './CheckoutPage.css';

const STORAGE_KEY = 'CheckoutPage';

// TODO: This is a temporary function to calculate the booking
// price. This should be removed when the API supports dry-runs and we
// can take the total price from the transaction itself.
const estimatedTotalPrice = (startDate, endDate, unitPrice) => {
  const { subUnitDivisor } = config.currencyConfig;
  const numericPrice = convertMoneyToNumber(unitPrice, subUnitDivisor);
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
  return (
    <BookingBreakdown
      className={css.receipt}
      bookingStart={bookingStart}
      bookingEnd={bookingEnd}
      unitPrice={unitPrice}
      totalPrice={totalPrice}
    />
  );
};

// Validate that given 'obj' has all the keys of defined by validPropTypes parameter
// and values must pass related test-value-format function.
const validateProperties = (obj, validPropTypes) => {
  return reduce(
    Object.entries(validPropTypes),
    (acc, [prop, fn]) => {
      if (Object.prototype.hasOwnProperty.call(obj, prop) && fn(obj[prop])) {
        return acc;
      }
      return false;
    },
    true
  );
};

// Validate content of booking dates object received from SessionStore
const isValidBookingDates = bookingDates => {
  const props = {
    bookingStart: d => d instanceof Date,
    bookingEnd: d => d instanceof Date,
  };
  return validateProperties(bookingDates, props);
};

// Validate content of listing object received from SessionStore.
// Currently only id & attributes.price are needed.
const isValidListing = listing => {
  const props = {
    id: id => id instanceof types.UUID,
    attributes: v => {
      return typeof v === 'object' && v.price instanceof types.Money;
    },
  };
  return validateProperties(listing, props);
};

// Stores given bookingDates and listing to sessionStorage
const storeData = (bookingDates, listing) => {
  if (window && window.sessionStorage && listing && bookingDates) {
    // TODO: How should we deal with Dates when data is serialized?
    // Hard coded serializable date objects atm.
    /* eslint-disable no-underscore-dangle */
    const data = {
      bookingDates: {
        bookingStart: { date: bookingDates.bookingStart, _serializedType: 'SerializableDate' },
        bookingEnd: { date: bookingDates.bookingEnd, _serializedType: 'SerializableDate' },
      },
      listing,
      storedAt: { date: new Date(), _serializedType: 'SerializableDate' },
    };
    /* eslint-enable no-underscore-dangle */

    const storableData = JSON.stringify(data, types.replacer);
    window.sessionStorage.setItem(STORAGE_KEY, storableData);
  }
};

// Get stored data
const storedData = () => {
  if (window && window.sessionStorage) {
    const checkoutPageData = window.sessionStorage.getItem(STORAGE_KEY);

    // TODO How should we deal with Dates when data is serialized?
    // Dates are expected to be in format: { date: new Date(), _serializedType: 'SerializableDate' }
    const reviver = (k, v) => {
      // eslint-disable-next-line no-underscore-dangle
      if (typeof v === 'object' && v._serializedType === 'SerializableDate') {
        return new Date(v.date);
      }
      return types.reviver(k, v);
    };

    const { bookingDates, listing, storedAt } = checkoutPageData
      ? JSON.parse(checkoutPageData, reviver)
      : {};

    // If sessionStore contains freshly saved data (max 1 day old), use it
    const isFreshlySaved = storedAt
      ? moment(storedAt).isAfter(moment().subtract(1, 'days'))
      : false;

    if (isFreshlySaved && isValidBookingDates(bookingDates) && isValidListing(listing)) {
      return { bookingDates, listing };
    }
  }
  return {};
};

export class CheckoutPageComponent extends Component {
  constructor(props) {
    super(props);
    const { bookingDates, listing } = props;

    // Store received data
    storeData(bookingDates, listing);

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
    const pageData = bookingDates && listing ? { bookingDates, listing } : storedData();
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
    const { bookingDates, initiateOrderError, intl, listing, params, currentUser } = this.props;

    // Get page data from passed-in props or from storage
    const pageData = bookingDates && listing ? { bookingDates, listing } : storedData();
    const { bookingStart, bookingEnd } = pageData.bookingDates || {};
    const currentListing = ensureListing(pageData.listing);
    const currentAuthor = ensureUser(currentListing.author);

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
    const authorFirstName = currentAuthor.attributes.profile.firstName;

    const priceBreakdown = (
      <div className={css.priceBreakdownContainer}>
        <h3 className={css.priceBreakdownTitle}>
          <FormattedMessage id="CheckoutPage.priceBreakdownTitle" />
        </h3>
        {breakdown(bookingStart, bookingEnd, unitPrice)}
      </div>
    );

    const errorMessage = initiateOrderError
      ? <p className={css.orderError}>
          <FormattedMessage id="CheckoutPage.initiateOrderError" />
        </p>
      : null;

    const topbar = (
      <div className={css.topbar}>
        <NamedLink className={css.home} name="LandingPage">
          <LogoIcon title={intl.formatMessage({ id: 'CheckoutPage.goToLandingPage' })} />
        </NamedLink>
      </div>
    );

    return (
      <PageLayout title={title} topbar={topbar}>
        <div className={css.heading}>
          <h1 className={css.title}>{title}</h1>
          <div className={css.author}>
            <span className={css.authorName}>
              <FormattedMessage id="ListingPage.hostedBy" values={{ name: authorFirstName }} />
            </span>
          </div>
        </div>

        {priceBreakdown}

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
      </PageLayout>
    );
  }
}

CheckoutPageComponent.defaultProps = {
  bookingDates: null,
  initiateOrderError: null,
  listing: null,
  currentUser: null,
};

const { arrayOf, func, instanceOf, shape, string } = PropTypes;

CheckoutPageComponent.propTypes = {
  bookingDates: shape({
    bookingStart: instanceOf(Date).isRequired,
    bookingEnd: instanceOf(Date).isRequired,
  }),
  initiateOrderError: instanceOf(Error),
  listing: propTypes.listing,
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
  return { initiateOrderError, listing, bookingDates, currentUser };
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
