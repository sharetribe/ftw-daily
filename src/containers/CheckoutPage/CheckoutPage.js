import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { types } from '../../util/sdkLoader';
import { pathByRouteName } from '../../util/routes';
import * as propTypes from '../../util/propTypes';
import { withFlattenedRoutes } from '../../util/contextHelpers';
import { PageLayout } from '../../components';
import { StripePaymentForm } from '../../containers';
import { initiateOrder } from './CheckoutPage.duck';

import css from './CheckoutPage.css';

const { UUID, LatLng } = types;

const bookingStart = new Date(2017, 4, 18);
const bookingEnd = new Date(2017, 4, 19);

const listing = {
  id: new UUID('927a30a2-3a69-4b0d-9c2e-a41744488703'),
  type: 'listing',
  attributes: {
    title: 'Example listing',
    description: 'Listing description here.',
    address: 'Helsinki, Finland',
    geolocation: new LatLng(60.16985569999999, 24.93837899999994),
  },
};
const imageUrl = 'https://placehold.it/750x470';

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
    const { dispatch, history, flattenedRoutes } = this.props;
    const params = {
      listingId: listing.id,
      bookingStart,
      bookingEnd,
      cardToken,
    };
    dispatch(initiateOrder(params))
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
    const { initiateOrderError, intl } = this.props;

    const title = intl.formatMessage(
      {
        id: 'CheckoutPage.title',
      },
      {
        listingTitle: listing.attributes.title,
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
        <img alt={listing.attributes.title} src={imageUrl} style={{ width: '100%' }} />
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

CheckoutPageComponent.defaultProps = { initiateOrderError: null };

const { func, shape, arrayOf, instanceOf } = PropTypes;

CheckoutPageComponent.propTypes = {
  initiateOrderError: instanceOf(Error),

  // from injectIntl
  intl: intlShape.isRequired,

  // from connect
  dispatch: func.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,

  // from withFlattenedRoutes
  flattenedRoutes: arrayOf(propTypes.route).isRequired,
};

const mapStateToProps = state => ({
  initiateOrderError: state.CheckoutPage.initiateOrderError,
});

const CheckoutPage = compose(withRouter, connect(mapStateToProps), withFlattenedRoutes, injectIntl)(
  CheckoutPageComponent
);

export default CheckoutPage;
