import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { reduce } from 'lodash';
import moment from 'moment';
import { types } from '../../util/sdkLoader';
import { pathByRouteName } from '../../util/routes';
import * as propTypes from '../../util/propTypes';
import { withFlattenedRoutes } from '../../util/contextHelpers';
import { AuthorInfo, BookingInfo, NamedRedirect, PageLayout } from '../../components';
import { StripePaymentForm } from '../../containers';
import { initiateOrder, setInitialValues, loadData } from './CheckoutPage.duck';

import css from './CheckoutPage.css';

const ensureListingProperties = listing => {
  const empty = { id: null, type: 'listing', attributes: {}, author: {}, images: [] };
  // assume own properties: id, type, attributes etc.
  return { ...empty, ...listing };
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
    window.sessionStorage.setItem('CheckoutPage', storableData);
  }
};

// Get stored data
const storedData = () => {
  if (window && window.sessionStorage) {
    const checkoutPageData = window.sessionStorage.getItem('CheckoutPage');

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
    const params = { listingId: listing.id, cardToken, ...bookingDates };

    sendOrderRequest(params)
      .then(orderId => {
        this.setState({ submitting: false });
        const orderDetailsPath = pathByRouteName('OrderDetailsPage', flattenedRoutes, {
          id: orderId.uuid,
        });
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
    const currentListing = ensureListingProperties(pageData.listing);
    const price = currentListing.attributes.price;

    const isOwnListing = currentListing &&
      currentUser &&
      currentListing.author &&
      currentListing.author.id.uuid === currentUser.id.uuid;

    // Allow showing page when currentUser is still being downloaded,
    // but show payment form only when user info is loaded.
    const showPaymentForm = currentUser && !isOwnListing;

    if (!currentListing.id || !price || isOwnListing) {
      // eslint-disable-next-line no-console
      console.error(
        'Listing, price, or user invalid for checkout, redirecting back to listing page.'
      );
      return <NamedRedirect name="ListingPage" params={params} />;
    }

    const title = intl.formatMessage(
      {
        id: 'CheckoutPage.title',
      },
      {
        listingTitle: currentListing.attributes.title,
      }
    );

    const errorMessage = initiateOrderError
      ? <p style={{ color: 'red' }}>
          <FormattedMessage id="CheckoutPage.initiateOrderError" />
        </p>
      : null;

    return (
      <PageLayout title={title}>
        <h1 className={css.title}>{title}</h1>
        <AuthorInfo author={currentListing.author} className={css.authorContainer} />
        <BookingInfo
          className={css.receipt}
          bookingStart={bookingStart}
          bookingEnd={bookingEnd}
          unitPrice={price}
        />
        <section className={css.payment}>
          {errorMessage}
          <h2 className={css.paymentTitle}>
            <FormattedMessage id="CheckoutPage.paymentTitle" />
          </h2>
          <p>
            <FormattedMessage id="CheckoutPage.paymentInfo" />
          </p>
          {showPaymentForm
            ? <StripePaymentForm
                onSubmit={this.handleSubmit}
                disableSubmit={this.state.submitting}
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

CheckoutPage.loadData = loadData;

export default CheckoutPage;
