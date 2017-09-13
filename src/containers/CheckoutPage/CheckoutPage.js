import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { pathByRouteName } from '../../util/routes';
import * as propTypes from '../../util/propTypes';
import { ensureListing, ensureUser, ensureTransaction, ensureBooking } from '../../util/data';
import { withFlattenedRoutes } from '../../util/contextHelpers';
import {
  AvatarMedium,
  BookingBreakdown,
  NamedLink,
  NamedRedirect,
  PageLayout,
  ResponsiveImage,
} from '../../components';
import { StripePaymentForm } from '../../containers';
import { initiateOrder, setInitialValues, speculateTransaction } from './CheckoutPage.duck';

import { storeData, storedData, clearData } from './CheckoutPageSessionHelpers';
import LogoIcon from './LogoIcon';
import css from './CheckoutPage.css';

const STORAGE_KEY = 'CheckoutPage';

export class CheckoutPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageData: {},
      dataLoaded: false,
      submitting: false,
    };

    this.loadInitialData = this.loadInitialData.bind(this);
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
    const { bookingDates, listing } = this.props;
    const hasDataInProps = !!(bookingDates && listing);
    const pageData = hasDataInProps ? { bookingDates, listing } : storedData(STORAGE_KEY);

    if (hasDataInProps) {
      storeData(bookingDates, listing, STORAGE_KEY);
    }

    const hasData = pageData &&
      pageData.listing &&
      pageData.listing.id &&
      pageData.bookingDates &&
      pageData.bookingDates.bookingStart &&
      pageData.bookingDates.bookingEnd;

    if (hasData) {
      this.props.fetchSpeculatedTransaction(
        pageData.listing.id,
        pageData.bookingDates.bookingStart,
        pageData.bookingDates.bookingEnd
      );
    }

    this.setState({ pageData: pageData || {}, dataLoaded: true });
  }

  handleSubmit(cardToken) {
    if (this.state.submitting) {
      return;
    }
    this.setState({ submitting: true });

    const { flattenedRoutes, history, sendOrderRequest, speculatedTransaction } = this.props;
    const requestParams = {
      listingId: this.state.pageData.listing.id,
      cardToken,
      bookingStart: speculatedTransaction.booking.attributes.start,
      bookingEnd: speculatedTransaction.booking.attributes.end,
    };

    sendOrderRequest(requestParams)
      .then(orderId => {
        this.setState({ submitting: false });
        const orderDetailsPath = pathByRouteName('OrderDetailsPage', flattenedRoutes, {
          id: orderId.uuid,
        });
        clearData(STORAGE_KEY);
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
      speculateTransactionInProgress,
      speculateTransactionError,
      speculatedTransaction,
      initiateOrderError,
      intl,
      params,
      currentUser,
    } = this.props;

    const isLoading = !this.state.dataLoaded || speculateTransactionInProgress;

    const { listing, bookingDates } = this.state.pageData;
    const currentTransaction = ensureTransaction(speculatedTransaction, {}, null);
    const currentBooking = ensureBooking(currentTransaction.booking);
    const currentListing = ensureListing(listing);
    const currentAuthor = ensureUser(currentListing.author);

    const isOwnListing = currentUser &&
      currentUser.id &&
      currentAuthor &&
      currentAuthor.id &&
      currentAuthor.id.uuid === currentUser.id.uuid;
    const listingIsOpen = currentListing.id && currentListing.attributes.open;

    const hasListingAndAuthor = !!(currentListing.id && currentAuthor.id);
    const hasBookingDates = !!(bookingDates &&
      bookingDates.bookingStart &&
      bookingDates.bookingEnd);
    const hasRequiredData = hasListingAndAuthor && hasBookingDates;
    const canShowPage = hasRequiredData && listingIsOpen && !isOwnListing;
    const shouldRedirect = !isLoading && !canShowPage;

    // Redirect back to ListingPage if data is missing.
    // Redirection must happen before any data format error is thrown (e.g. wrong currency)
    if (shouldRedirect) {
      // eslint-disable-next-line no-console
      console.error('Missing or invalid data for checkout, redirecting back to listing page.', {
        transaction: currentTransaction,
        bookingDates,
        listing,
      });
      return <NamedRedirect name="ListingPage" params={params} />;
    }

    // Show breakdown only when transaction and booking are loaded
    // (i.e. have an id)
    const breakdown = currentTransaction.id && currentBooking.id
      ? <BookingBreakdown
          className={css.bookingBreakdown}
          userRole="customer"
          transaction={currentTransaction}
          booking={currentBooking}
        />
      : null;

    // Allow showing page when currentUser is still being downloaded,
    // but show payment form only when user info is loaded.
    const showPaymentForm = !!(currentUser && hasRequiredData);

    const listingTitle = currentListing.attributes.title;
    const title = intl.formatMessage({ id: 'CheckoutPage.title' }, { listingTitle });

    const firstImage = currentListing.images && currentListing.images.length > 0
      ? currentListing.images[0]
      : null;

    const initiateOrderErrorMessage = initiateOrderError
      ? <p className={css.orderError}>
          <FormattedMessage id="CheckoutPage.initiateOrderError" />
        </p>
      : null;
    const speculateTransactionErrorMessage = speculateTransactionError
      ? <p className={css.speculateError}>
          <FormattedMessage id="CheckoutPage.speculateTransactionError" />
        </p>
      : null;

    const topbar = (
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
    );

    const pageLayoutProps = { authInfoError, logoutError, title };

    if (isLoading) {
      return (
        <PageLayout {...pageLayoutProps}>
          {topbar}
          <div className={css.loading}>
            <FormattedMessage id="CheckoutPage.loadingData" />
          </div>
        </PageLayout>
      );
    }

    return (
      <PageLayout {...pageLayoutProps}>
        {topbar}
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
                    values={{ name: currentAuthor.attributes.profile.displayName }}
                  />
                </span>
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
              <h3 className={css.paymentTitle}>
                <FormattedMessage id="CheckoutPage.paymentTitle" />
              </h3>
              {initiateOrderErrorMessage}
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
                <FormattedMessage
                  id="CheckoutPage.hostedBy"
                  values={{ name: currentAuthor.attributes.profile.displayName }}
                />
              </p>
            </div>
            <h3 className={css.bookingBreakdownTitle}>
              <FormattedMessage id="CheckoutPage.priceBreakdownTitle" />
            </h3>
            {speculateTransactionErrorMessage}
            {breakdown}
          </div>

        </div>
      </PageLayout>
    );
  }
}

CheckoutPageComponent.defaultProps = {
  authInfoError: null,
  initiateOrderError: null,
  listing: null,
  bookingDates: null,
  speculateTransactionError: null,
  speculatedTransaction: null,
  logoutError: null,
  currentUser: null,
};

const { arrayOf, func, instanceOf, shape, string, bool } = PropTypes;

CheckoutPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  listing: propTypes.listing,
  bookingDates: shape({
    bookingStart: instanceOf(Date).isRequired,
    bookingEnd: instanceOf(Date).isRequired,
  }),
  fetchSpeculatedTransaction: func.isRequired,
  speculateTransactionInProgress: bool.isRequired,
  speculateTransactionError: instanceOf(Error),
  speculatedTransaction: propTypes.transaction,
  initiateOrderError: instanceOf(Error),
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
  const {
    listing,
    bookingDates,
    speculateTransactionInProgress,
    speculateTransactionError,
    speculatedTransaction,
    initiateOrderError,
  } = state.CheckoutPage;
  const { currentUser } = state.user;
  const { authInfoError, logoutError } = state.Auth;
  return {
    currentUser,
    authInfoError,
    logoutError,
    bookingDates,
    speculateTransactionInProgress,
    speculateTransactionError,
    speculatedTransaction,
    listing,
    initiateOrderError,
  };
};

const mapDispatchToProps = dispatch => ({
  sendOrderRequest: params => dispatch(initiateOrder(params)),
  fetchSpeculatedTransaction: (listingId, bookingStart, bookingEnd) =>
    dispatch(speculateTransaction(listingId, bookingStart, bookingEnd)),
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
