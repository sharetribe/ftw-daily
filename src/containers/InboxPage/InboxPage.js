/* eslint-disable arrow-body-style */
import React, { PropTypes } from 'react';
import { PageLayout, NamedLink } from '../../components';

const InboxPage = props => {
  const { filter } = props;
  const ids = ['some-id-1', 'some-id-2'];

  const toLink = id => {
    return filter === 'orders'
      ? <NamedLink name="OrderDetailsPage" params={{ id }}>{id} order details</NamedLink>
      : <NamedLink name="SaleDetailsPage" params={{ id }}>{id} sale details</NamedLink>;
  };

  return (
    <PageLayout title={`${filter} page`}>
      <ul>
        {ids.map(id => <li key={id}>{toLink(id)}</li>)}
      </ul>
    </PageLayout>
  );
};

const { oneOf } = PropTypes;

InboxPage.propTypes = { filter: oneOf(['orders', 'sales']).isRequired };

export default InboxPage;
