import React, { PropTypes } from 'react';
import { PageLayout, NamedLink } from '../../components';

/* eslint-disable arrow-body-style */
const filterLink = (filter, id, text) => {
  return filter === 'orders'
    ? <NamedLink name="OrderPage" params={{ id }}>{text}</NamedLink>
    : <NamedLink name="SalePage" params={{ id }}>{text}</NamedLink>;
};
/* eslint-enable arrow-body-style */

const InboxPage = props => {
  const { filter } = props;
  return (
    <PageLayout title={`${filter} page`}>
      <ul>
        <li>{filterLink(filter, 1234, 'Single thread')}</li>
      </ul>
    </PageLayout>
  );
};

InboxPage.defaultProps = { filter: 'conversation' };

const { oneOf } = PropTypes;

InboxPage.propTypes = { filter: oneOf(['orders', 'sales']) };

export default InboxPage;
