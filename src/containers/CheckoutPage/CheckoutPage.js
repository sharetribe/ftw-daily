import React from 'react';
import { Link } from 'react-router';
import { Page } from '../../components';

export default ({ params }) => (
  <Page title={`Checkout page: ${params.listingId}`}>
    <Link to={`/order/12345`}><button>Pay</button></Link>
  </Page>
)
