import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { types } from '../../util/sdkLoader';
import { pathByRouteName } from '../../util/routes';
import * as propTypes from '../../util/propTypes';
import { withFlattenedRoutes } from '../../util/contextHelpers';
import { BookingInfo, PageLayout } from '../../components';
import { StripePaymentForm } from '../../containers';
import { initiateOrder, setInitialValues } from './CheckoutPage.duck';

import css from './CheckoutPage.css';

const { UUID, LatLng } = types;

const currentListing = {
  id: new UUID('927a30a2-3a69-4b0d-9c2e-a41744488703'),
  type: 'listing',
  attributes: {
    title: 'Example listing',
    description: 'Listing description here.',
    address: 'Helsinki, Finland',
    geolocation: new LatLng(60.16985569999999, 24.93837899999994),
  },
};

export class CheckoutPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { submitting: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(cardToken) {
    if (this.state.submitting) {
      return;
    }
    this.setState({ submitting: true });
    const { bookingDates, history, flattenedRoutes, sendOrderRequest } = this.props;
    const params = {
      listingId: currentListing.id,
      cardToken,
      ...bookingDates,
    };
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
    const { bookingDates, initiateOrderError, intl, listing } = this.props;
    const { bookingStart, bookingEnd } = bookingDates;
    const price = listing.attributes.price;

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
        <div className={css.authorContainer}>
          Author avatar and stuff
        </div>
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
          <StripePaymentForm onSubmit={this.handleSubmit} disableSubmit={this.state.submitting} />
        </section>
      </PageLayout>
    );
  }
}

CheckoutPageComponent.defaultProps = { bookingDates: null, initiateOrderError: null, listing: null };

const { arrayOf, func, instanceOf, shape } = PropTypes;

CheckoutPageComponent.propTypes = {
  bookingDates: shape({
    bookingStart: instanceOf(Date).isRequired,
    bookingEnd: instanceOf(Date).isRequired,
  }),
  initiateOrderError: instanceOf(Error),
  listing: propTypes.listing,
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
  return { initiateOrderError, listing, bookingDates };
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

CheckoutPage.setInitialValues = initiallValues => setInitialValues(initiallValues);

CheckoutPage.displayName = 'CheckoutPage';

export default CheckoutPage;
