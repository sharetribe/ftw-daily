import React from 'react';
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

export default props => {
  const { filter } = props;
  return (
    <Page title={`${filter} page`}>
      <ul>
        <li><Link to={toPath(filter, 1234)}>Single thread</Link></li>
      </ul>
    </Page>
  );
}
