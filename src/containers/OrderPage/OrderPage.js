/* eslint-disable react/no-unescaped-entities */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { PageLayout } from '../../components';

const OrderPage = props => {
  const { params } = props;
  return (
    <PageLayout title="Order page">
      <p>Order id: {params.id}</p>
      <Link to={`/order/${params.id}/discussion`}>Discussion tab</Link>
      <br />
      <Link to={`/order/${params.id}/details`}>Details tab</Link>
      <p>Mobile layout needs different views for discussion and details.</p>
      <p>
         Discussion view is the default if route doesn't specify mobile tab (e.g. <i>
          /order/1234
        </i>)
      </p>
    </PageLayout>
  );
};

const { number, oneOfType, shape, string } = PropTypes;

OrderPage.propTypes = {
  params: shape({ id: oneOfType([ number, string ]).isRequired }).isRequired,
};

export default OrderPage;
