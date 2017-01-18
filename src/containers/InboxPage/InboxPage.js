import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Page } from '../../components';

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
    <Page title={`${filter} page`}>
      <ul>
        <li><Link to={toPath(filter, 1234)}>Single thread</Link></li>
      </ul>
    </Page>
  );
};

const { string } = PropTypes;

// TODO: should the filter an enum?
InboxPage.propTypes = { filter: string.isRequired };

export default InboxPage;
