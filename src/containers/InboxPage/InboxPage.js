import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { PageLayout } from '../../components';

const toPath = (filter, id) => {
  switch (filter) {
    case 'orders':
      return `/order/${id}`;
    case 'sales':
      return `/sale/${id}`;
    default:
      return `/conversation/${id}`;
  }
};

const InboxPage = props => {
  const { filter } = props;
  return (
    <PageLayout title={`${filter} page`}>
      <ul>
        <li><Link to={toPath(filter, 1234)}>Single thread</Link></li>
      </ul>
    </PageLayout>
  );
};

InboxPage.defaultProps = { filter: 'conversation' };

const { oneOf } = PropTypes;

InboxPage.propTypes = { filter: oneOf([ 'orders', 'sales', 'inbox' ]) };

export default InboxPage;
