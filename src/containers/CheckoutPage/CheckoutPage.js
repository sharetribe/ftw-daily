import React, { Component } from 'react';
import { bool, func, instanceOf, object, oneOfType, shape, string } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import { pathByRouteName, findRouteByRouteName } from '../../util/routes';
import { propTypes, LINE_ITEM_NIGHT, LINE_ITEM_DAY } from '../../util/types';
import {
  ensureListing,
  ensureCurrentUser,
  ensureUser,
  ensureTransaction,
  ensureBooking,
} from '../../util/data';
import { dateFromLocalToAPI, minutesBetween } from '../../util/dates';
import { createSlug } from '../../util/urlHelpers';
import {
  isTransactionInitiateAmountTooLowError,
  isTransactionInitiateListingNotFoundError,
  isTransactionInitiateMissingStripeAccountError,
  isTransactionInitiateBookingTimeNotAvailableError,
  isTransactionChargeDisabledError,
  isTransactionZeroPaymentError,
  transactionInitiateOrderStripeErrors,
} from '../../util/errors';
import { formatMoney } from '../../util/currency';
import { TRANSITION_ENQUIRE, txIsPaymentPending, txIsPaymentExpired } from '../../util/transaction';
import {
  AvatarMedium,
  BookingBreakdown,
  Logo,
  NamedLink,
  NamedRedirect,
  Page,
  ResponsiveImage,
} from '../../components';
import { StripePaymentForm } from '../../forms';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { handleCardPayment } from '../../ducks/stripe.duck.js';

import {
  initiateOrder,
  setInitialValues,
  speculateTransaction,
  confirmPayment,
  sendMessage,
} from './CheckoutPage.duck';
import { storeData, storedData, clearData } from './CheckoutPageSessionHelpers';
import css from './CheckoutPage.css';

const STORAGE_KEY = 'CheckoutPage';

const initializeOrderPage = (initialValues, routes, dispatch) => {
  const OrderPage = findRouteByRouteName('OrderDetailsPage', routes);

  // Transaction is already created, but if the initial message
  // sending failed, we tell it to the OrderDetailsPage.
  dispatch(OrderPage.setInitialValues(initialValues));
};

const checkIsPaymentExpired = existingTransaction => {
  return txIsPaymentExpired(existingTransaction)
    ? true
    : txIsPaymentPending(existingTransaction)
    ? minutesBetween(existingTransaction.attributes.lastTransitionedAt, new Date()) >= 15
    : false;
};

export class CheckoutPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageData: {},
      dataLoaded: false,
      submitting: false,
    };

    this.loadInitialData = this.loadInitialData.bind(this);
    this.handlePaymentIntent = this.handlePaymentIntent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (window) {
      this.loadInitialData();
    }
  }

  /**
   * Load initial data for the page
   *
   * Since the data for the checkout is not passed in the URL (there
   * might be lots of options in the future), we must pass in the data
   * some other way. Currently the ListingPage sets the initial data
   * for the CheckoutPage's Redux store.
   *
   * For some cases (e.g. a refresh in the CheckoutPage), the Redux
   * store is empty. To handle that case, we store the received data
   * to window.sessionStorage and read it from there if no props from
   * the store exist.
   *
   * This function also sets of fetching the speculative transaction
   * based on this initial data.
   */
  loadInitialData() {
    const {
      bookingData,
      bookingDates,
      listing,
      transaction,
      fetchSpeculatedTransaction,
      history,
    } = this.props;
    // Browser's back navigation should not rewrite data in session store.
    // Action is 'POP' on both history.back() and page refresh cases.
    // Action is 'PUSH' when user has directed through a link
    // Action is 'REPLACE' when user has directed through login/signup process
    const hasNavigatedThroughLink = history.action === 'PUSH' || history.action === 'REPLACE';

    const hasDataInProps = !!(bookingData && bookingDates && listing) && hasNavigatedThroughLink;
    if (hasDataInProps) {
      // Store data only if data is passed through props and user has navigated through a link.
      storeData(bookingData, bookingDates, listing, transaction, STORAGE_KEY);
    }

    // NOTE: stored data can be empty if user has already successfully completed transaction.
    const pageData = hasDataInProps
      ? { bookingData, bookingDates, listing, transaction }
      : storedData(STORAGE_KEY);

    // Check if a booking is already created according to stored data.
    const tx = pageData ? pageData.transaction : null;
    const isBookingCreated = tx && tx.booking && tx.booking.id;

    const shouldFetchSpeculatedTransaction =
      pageData &&
      pageData.listing &&
      pageData.listing.id &&
      pageData.bookingData &&
      pageData.bookingDates &&
      pageData.bookingDates.bookingStart &&
      pageData.bookingDates.bookingEnd &&
      !isBookingCreated;

    if (shouldFetchSpeculatedTransaction) {
      const listingId = pageData.listing.id;
      const { bookingStart, bookingEnd } = pageData.bookingDates;

      // Convert picked date to date that will be converted on the API as
      // a noon of correct year-month-date combo in UTC
      const bookingStartForAPI = dateFromLocalToAPI(bookingStart);
      const bookingEndForAPI = dateFromLocalToAPI(bookingEnd);

      // Fetch speculated transaction for showing price in booking breakdown
      // NOTE: if unit type is line-item/units, quantity needs to be added.
      // The way to pass it to checkout page is through pageData.bookingData
      fetchSpeculatedTransaction({
        listingId,
        bookingStart: bookingStartForAPI,
        bookingEnd: bookingEndForAPI,
      });
    }

    this.setState({ pageData: pageData || {}, dataLoaded: true });
  }

  handlePaymentIntent(handlePaymentParams) {
    const { onInitiateOrder, onHandleCardPayment, onConfirmPayment, onSendMessage } = this.props;
    const { pageData, speculatedTransaction, message } = handlePaymentParams;
    const storedTx = ensureTransaction(pageData.transaction);

    // Step 1: initiate order by requesting payment from Marketplace API
    const fnRequestPayment = fnParams => {
      // fnParams should be { listingId, bookingStart, bookingEnd }
      const hasPaymentIntents =
        storedTx.attributes.protectedData && storedTx.attributes.protectedData.stripePaymentIntents;

      // If paymentIntent exists, order has been initiated previously.
      return hasPaymentIntents ? Promise.resolve(storedTx) : onInitiateOrder(fnParams, storedTx.id);
    };

    // Step 2: pay using Stripe SDK
    const fnHandleCardPayment = fnParams => {
      // fnParams should be returned transaction entity

      const order = ensureTransaction(fnParams);
      if (order.id) {
        // Store order.
        const { bookingData, bookingDates, listing } = pageData;
        storeData(bookingData, bookingDates, listing, order, STORAGE_KEY);
        this.setState({ pageData: { ...pageData, transaction: order } });
      }

      const hasPaymentIntents =
        order.attributes.protectedData && order.attributes.protectedData.stripePaymentIntents;

      if (!hasPaymentIntents) {
        throw new Error(
          `Missing StripePaymentIntents key in transaction's protectedData. Check that your transaction process is configured to use payment intents.`
        );
      }

      const { stripePaymentIntentClientSecret } = hasPaymentIntents
        ? order.attributes.protectedData.stripePaymentIntents.default
        : null;

      const { stripe, card, billingDetails, paymentIntent } = handlePaymentParams;

      const params = {
        stripePaymentIntentClientSecret,
        orderId: order.id,
        stripe,
        card,
        paymentParams: {
          payment_method_data: {
            billing_details: billingDetails,
          },
        },
      };

      // If paymentIntent status is succeeded, handleCardPayment has been called previously.
      const hasPaymentIntentSucceeded = paymentIntent && paymentIntent.status === 'succeeded';
      return hasPaymentIntentSucceeded
        ? Promise.resolve(paymentIntent)
        : onHandleCardPayment(params);
    };

    // Step 3: complete order by confirming payment to Marketplace API
    // Parameter should contain { paymentIntent, transactionId } returned in step 2
    const fnConfirmPayment = onConfirmPayment;

    // Step 4: send initial message
    const fnSendMessage = fnParams => {
      return onSendMessage({ ...fnParams, message });
    };

    // Here we create promise calls in sequence
    // This is pretty much the same as:
    // fnRequestPayment({...initialParams})
    //   .then(result => fnHandleCardPayment({...result}))
    //   .then(result => fnConfirmPayment({...result}))
    const applyAsync = (acc, val) => acc.then(val);
    const composeAsync = (...funcs) => x => funcs.reduce(applyAsync, Promise.resolve(x));
    const handlePaymentIntentCreation = composeAsync(
      fnRequestPayment,
      fnHandleCardPayment,
      fnConfirmPayment,
      fnSendMessage
    );

    // Create order aka transaction
    // NOTE: if unit type is line-item/units, quantity needs to be added.
    // The way to pass it to checkout page is through pageData.bookingData
    const tx = speculatedTransaction ? speculatedTransaction : storedTx;
    const orderParams = {
      listingId: pageData.listing.id,
      bookingStart: tx.booking.attributes.start,
      bookingEnd: tx.booking.attributes.end,
    };

    return handlePaymentIntentCreation(orderParams);
  }

  handleSubmit(values) {
    if (this.state.submitting) {
      return;
    }
    this.setState({ submitting: true });

    const { history, speculatedTransaction, currentUser, paymentIntent, dispatch } = this.props;
    const { stripe, card, message, formValues } = values;
    const { name, addressLine1, addressLine2, postal, city, state, country } = formValues;

    const billingDetails = {
      name,
      address: {
        city: city,
        country: country,
        line1: addressLine1,
        line2: addressLine2,
        postal_code: postal,
        state: state,
      },
      email: ensureCurrentUser(currentUser).attributes.email,
    };

    const requestPaymentParams = {
      pageData: this.state.pageData,
      speculatedTransaction,
      stripe,
      card,
      billingDetails,
      message,
      // TODO
      // how can we know/fetch these after page refresh?
      paymentIntent,
    };

    this.handlePaymentIntent(requestPaymentParams)
      .then(res => {
        const { orderId, messageSuccess } = res;
        this.setState({ submitting: false });

        const routes = routeConfiguration();
        const messageFailedToTransaction = messageSuccess ? null : orderId;
        const orderDetailsPath = pathByRouteName('OrderDetailsPage', routes, { id: orderId.uuid });

        initializeOrderPage({ messageFailedToTransaction }, routes, dispatch);
        clearData(STORAGE_KEY);
        history.push(orderDetailsPath);
      })
      .catch(err => {
        console.error(err);
        this.setState({ submitting: false });
      });
  }

  render() {
    const {
      scrollingDisabled,
      speculateTransactionInProgress,
      speculateTransactionError,
      speculatedTransaction: speculatedTransactionMaybe,
      initiateOrderError,
      confirmPaymentError,
      intl,
      params,
      currentUser,
      handleCardPaymentInProgress,
      handleCardPaymentError,
      paymentIntent,
    } = this.props;

    // Since the listing data is already given from the ListingPage
    // and stored to handle refreshes, it might not have the possible
    // deleted or closed information in it. If the transaction
    // initiate or the speculative initiate fail due to the listing
    // being deleted or closec, we should dig the information from the
    // errors and not the listing data.
    const listingNotFound =
      isTransactionInitiateListingNotFoundError(speculateTransactionError) ||
      isTransactionInitiateListingNotFoundError(initiateOrderError);

    const isLoading = !this.state.dataLoaded || speculateTransactionInProgress;

    const { listing, bookingDates, transaction } = this.state.pageData;
    const existingTransaction = ensureTransaction(transaction);
    const speculatedTransaction = ensureTransaction(speculatedTransactionMaybe, {}, null);
    const currentListing = ensureListing(listing);
    const currentAuthor = ensureUser(currentListing.author);

    const isOwnListing =
      currentUser &&
      currentUser.id &&
      currentAuthor &&
      currentAuthor.id &&
      currentAuthor.id.uuid === currentUser.id.uuid;

    const hasListingAndAuthor = !!(currentListing.id && currentAuthor.id);
    const hasBookingDates = !!(
      bookingDates &&
      bookingDates.bookingStart &&
      bookingDates.bookingEnd
    );
    const hasRequiredData = hasListingAndAuthor && hasBookingDates;
    const canShowPage = hasRequiredData && !isOwnListing;
    const shouldRedirect = !isLoading && !canShowPage;

    // Redirect back to ListingPage if data is missing.
    // Redirection must happen before any data format error is thrown (e.g. wrong currency)
    if (shouldRedirect) {
      // eslint-disable-next-line no-console
      console.error('Missing or invalid data for checkout, redirecting back to listing page.', {
        transaction: speculatedTransaction,
        bookingDates,
        listing,
      });
      return <NamedRedirect name="ListingPage" params={params} />;
    }

    // Show breakdown only when speculated transaction and booking are loaded
    // (i.e. have an id)
    const tx = existingTransaction.booking ? existingTransaction : speculatedTransaction;
    const txBooking = ensureBooking(tx.booking);
    const breakdown =
      tx.id && txBooking.id ? (
        <BookingBreakdown
          className={css.bookingBreakdown}
          userRole="customer"
          unitType={config.bookingUnitType}
          transaction={tx}
          booking={txBooking}
        />
      ) : null;

    const isPaymentExpired = checkIsPaymentExpired(existingTransaction);

    // Allow showing page when currentUser is still being downloaded,
    // but show payment form only when user info is loaded.
    const showPaymentForm = !!(
      currentUser &&
      hasRequiredData &&
      !listingNotFound &&
      !initiateOrderError &&
      !speculateTransactionError &&
      !isPaymentExpired
    );

    const listingTitle = currentListing.attributes.title;
    const title = intl.formatMessage({ id: 'CheckoutPage.title' }, { listingTitle });

    const firstImage =
      currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;

    const listingNotFoundErrorMessage = listingNotFound ? (
      <p className={css.notFoundError}>
        <FormattedMessage id="CheckoutPage.listingNotFoundError" />
      </p>
    ) : null;
    const listingLink = (
      <NamedLink
        name="ListingPage"
        params={{ id: currentListing.id.uuid, slug: createSlug(listingTitle) }}
      >
        <FormattedMessage id="CheckoutPage.errorlistingLinkText" />
      </NamedLink>
    );

    const isAmountTooLowError = isTransactionInitiateAmountTooLowError(initiateOrderError);
    const isChargeDisabledError = isTransactionChargeDisabledError(initiateOrderError);
    const isBookingTimeNotAvailableError = isTransactionInitiateBookingTimeNotAvailableError(
      initiateOrderError
    );
    const stripeErrors = transactionInitiateOrderStripeErrors(initiateOrderError);

    let initiateOrderErrorMessage = null;

    if (!listingNotFound && isAmountTooLowError) {
      initiateOrderErrorMessage = (
        <p className={css.orderError}>
          <FormattedMessage id="CheckoutPage.initiateOrderAmountTooLow" />
        </p>
      );
    } else if (!listingNotFound && isBookingTimeNotAvailableError) {
      initiateOrderErrorMessage = (
        <p className={css.orderError}>
          <FormattedMessage id="CheckoutPage.bookingTimeNotAvailableMessage" />
        </p>
      );
    } else if (!listingNotFound && isChargeDisabledError) {
      initiateOrderErrorMessage = (
        <p className={css.orderError}>
          <FormattedMessage id="CheckoutPage.chargeDisabledMessage" />
        </p>
      );
    } else if (!listingNotFound && stripeErrors && stripeErrors.length > 0) {
      // NOTE: Error messages from Stripes are not part of translations.
      // By default they are in English.
      const stripeErrorsAsString = stripeErrors.join(', ');
      initiateOrderErrorMessage = (
        <p className={css.orderError}>
          <FormattedMessage
            id="CheckoutPage.initiateOrderStripeError"
            values={{ stripeErrors: stripeErrorsAsString }}
          />
        </p>
      );
    } else if (!listingNotFound && initiateOrderError) {
      initiateOrderErrorMessage = (
        <p className={css.orderError}>
          <FormattedMessage id="CheckoutPage.initiateOrderError" values={{ listingLink }} />
        </p>
      );
    }

    const speculateTransactionErrorMessage = speculateTransactionError ? (
      <p className={css.speculateError}>
        <FormattedMessage id="CheckoutPage.speculateTransactionError" />
      </p>
    ) : null;
    let speculateErrorMessage = null;

    if (isTransactionInitiateMissingStripeAccountError(speculateTransactionError)) {
      speculateErrorMessage = (
        <p className={css.orderError}>
          <FormattedMessage id="CheckoutPage.providerStripeAccountMissingError" />
        </p>
      );
    } else if (isTransactionInitiateBookingTimeNotAvailableError(speculateTransactionError)) {
      speculateErrorMessage = (
        <p className={css.orderError}>
          <FormattedMessage id="CheckoutPage.bookingTimeNotAvailableMessage" />
        </p>
      );
    } else if (isTransactionZeroPaymentError(speculateTransactionError)) {
      speculateErrorMessage = (
        <p className={css.orderError}>
          <FormattedMessage id="CheckoutPage.initiateOrderAmountTooLow" />
        </p>
      );
    } else if (speculateTransactionError) {
      speculateErrorMessage = (
        <p className={css.orderError}>
          <FormattedMessage id="CheckoutPage.speculateFailedMessage" />
        </p>
      );
    }

    const topbar = (
      <div className={css.topbar}>
        <NamedLink className={css.home} name="LandingPage">
          <Logo
            className={css.logoMobile}
            title={intl.formatMessage({ id: 'CheckoutPage.goToLandingPage' })}
            format="mobile"
          />
          <Logo
            className={css.logoDesktop}
            alt={intl.formatMessage({ id: 'CheckoutPage.goToLandingPage' })}
            format="desktop"
          />
        </NamedLink>
      </div>
    );

    const unitType = config.bookingUnitType;
    const isNightly = unitType === LINE_ITEM_NIGHT;
    const isDaily = unitType === LINE_ITEM_DAY;

    const unitTranslationKey = isNightly
      ? 'CheckoutPage.perNight'
      : isDaily
      ? 'CheckoutPage.perDay'
      : 'CheckoutPage.perUnit';

    const price = currentListing.attributes.price;
    const formattedPrice = formatMoney(intl, price);
    const detailsSubTitle = `${formattedPrice} ${intl.formatMessage({ id: unitTranslationKey })}`;

    const showInitialMessageInput = !(
      existingTransaction && existingTransaction.attributes.lastTransition === TRANSITION_ENQUIRE
    );

    const pageProps = { title, scrollingDisabled };

    if (isLoading) {
      return (
        <Page {...pageProps}>
          {topbar}
          <div className={css.loading}>
            <FormattedMessage id="CheckoutPage.loadingData" />
          </div>
        </Page>
      );
    }

    // Get first and last name of the current user and use it in the StripePaymentForm to autofill the name field
    const userName =
      currentUser && currentUser.attributes
        ? `${currentUser.attributes.profile.firstName} ${currentUser.attributes.profile.lastName}`
        : null;

    // If your marketplace works mostly in one country you can use initial values to select country automatically
    // e.g. {country: 'FI'}

    const initalValuesForStripePayment = { name: userName };

    return (
      <Page {...pageProps}>
        {topbar}
        <div className={css.contentContainer}>
          <div className={css.aspectWrapper}>
            <ResponsiveImage
              rootClassName={css.rootForImage}
              alt={listingTitle}
              image={firstImage}
              variants={['landscape-crop', 'landscape-crop2x']}
            />
          </div>
          <div className={classNames(css.avatarWrapper, css.avatarMobile)}>
            <AvatarMedium user={currentAuthor} disableProfileLink />
          </div>
          <div className={css.bookListingContainer}>
            <div className={css.heading}>
              <h1 className={css.title}>{title}</h1>
              <div className={css.author}>
                <FormattedMessage
                  id="CheckoutPage.hostedBy"
                  values={{ name: currentAuthor.attributes.profile.displayName }}
                />
              </div>
            </div>

            <div className={css.priceBreakdownContainer}>
              <h3 className={css.priceBreakdownTitle}>
                <FormattedMessage id="CheckoutPage.priceBreakdownTitle" />
              </h3>
              {speculateTransactionErrorMessage}
              {breakdown}
            </div>

            <section className={css.paymentContainer}>
              {initiateOrderErrorMessage}
              {listingNotFoundErrorMessage}
              {speculateErrorMessage}
              {showPaymentForm ? (
                <StripePaymentForm
                  className={css.paymentForm}
                  onSubmit={this.handleSubmit}
                  inProgress={this.state.submitting || handleCardPaymentInProgress}
                  formId="CheckoutPagePaymentForm"
                  paymentInfo={intl.formatMessage({ id: 'CheckoutPage.paymentInfo' })}
                  authorDisplayName={currentAuthor.attributes.profile.displayName}
                  showInitialMessageInput={showInitialMessageInput}
                  initialValues={initalValuesForStripePayment}
                  confirmPaymentError={confirmPaymentError}
                  handleCardPaymentError={handleCardPaymentError}
                  paymentIntent={paymentIntent}
                />
              ) : null}
              {isPaymentExpired ? (
                <p className={css.orderError}>
                  <FormattedMessage id="CheckoutPage.paymentExpiredMessage" />
                </p>
              ) : null}
            </section>
          </div>

          <div className={css.detailsContainerDesktop}>
            <div className={css.detailsAspectWrapper}>
              <ResponsiveImage
                rootClassName={css.rootForImage}
                alt={listingTitle}
                image={firstImage}
                variants={['landscape-crop', 'landscape-crop2x']}
              />
            </div>
            <div className={css.avatarWrapper}>
              <AvatarMedium user={currentAuthor} disableProfileLink />
            </div>
            <div className={css.detailsHeadings}>
              <h2 className={css.detailsTitle}>{listingTitle}</h2>
              <p className={css.detailsSubtitle}>{detailsSubTitle}</p>
            </div>
            <h3 className={css.bookingBreakdownTitle}>
              <FormattedMessage id="CheckoutPage.priceBreakdownTitle" />
            </h3>
            {speculateTransactionErrorMessage}
            {breakdown}
          </div>
        </div>
      </Page>
    );
  }
}

CheckoutPageComponent.defaultProps = {
  initiateOrderError: null,
  confirmPaymentError: null,
  listing: null,
  bookingData: {},
  bookingDates: null,
  speculateTransactionError: null,
  speculatedTransaction: null,
  transaction: null,
  currentUser: null,
  paymentIntent: null,
};

CheckoutPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
  listing: propTypes.listing,
  bookingData: object,
  bookingDates: shape({
    bookingStart: instanceOf(Date).isRequired,
    bookingEnd: instanceOf(Date).isRequired,
  }),
  fetchSpeculatedTransaction: func.isRequired,
  speculateTransactionInProgress: bool.isRequired,
  speculateTransactionError: propTypes.error,
  speculatedTransaction: propTypes.transaction,
  transaction: propTypes.transaction,
  initiateOrderError: propTypes.error,
  currentUser: propTypes.currentUser,
  params: shape({
    id: string,
    slug: string,
  }).isRequired,
  onInitiateOrder: func.isRequired,
  onHandleCardPayment: func.isRequired,
  handleCardPaymentInProgress: bool.isRequired,
  // handleCardPaymentError comes from Stripe so that's why we can't expect it to be in a specific form
  handleCardPaymentError: oneOfType([propTypes.error, object]),
  paymentIntent: object,

  // from connect
  dispatch: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => {
  const {
    listing,
    bookingData,
    bookingDates,
    speculateTransactionInProgress,
    speculateTransactionError,
    speculatedTransaction,
    transaction,
    initiateOrderError,
    confirmPaymentError,
  } = state.CheckoutPage;
  const { currentUser } = state.user;
  const { handleCardPaymentInProgress, handleCardPaymentError, paymentIntent } = state.stripe;
  return {
    scrollingDisabled: isScrollingDisabled(state),
    currentUser,
    bookingData,
    bookingDates,
    speculateTransactionInProgress,
    speculateTransactionError,
    speculatedTransaction,
    transaction,
    listing,
    initiateOrderError,
    confirmPaymentError,
    handleCardPaymentInProgress,
    handleCardPaymentError,
    paymentIntent,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  onInitiateOrder: (params, transactionId) => dispatch(initiateOrder(params, transactionId)),
  fetchSpeculatedTransaction: params => dispatch(speculateTransaction(params)),
  onHandleCardPayment: params => dispatch(handleCardPayment(params)),
  onConfirmPayment: params => dispatch(confirmPayment(params)),
  onSendMessage: params => dispatch(sendMessage(params)),
});

const CheckoutPage = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(CheckoutPageComponent);

CheckoutPage.setInitialValues = initialValues => setInitialValues(initialValues);

CheckoutPage.displayName = 'CheckoutPage';

export default CheckoutPage;
