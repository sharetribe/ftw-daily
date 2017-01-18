import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Page } from '../../components';

const CheckoutPage = ({ params }) => (
  <Page title={`Checkout page: ${params.listingId}`}>
    <Link to={`/order/12345`}><button>Pay</button></Link>
  </Page>
);

const { shape, string } = PropTypes;

CheckoutPage.propTypes = { params: shape({ listingId: string.isRequired }).isRequired };

export default CheckoutPage;
