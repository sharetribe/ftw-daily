import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { parse } from '../../util/urlHelpers';
import PaginationLinks from './PaginationLinks';

const { shape, string } = PropTypes;

const Pagination = props => {
  const { history } = props;
  const search = parse(history.location.search || '');

  const pagination = {
    page: search.page || 1,
    perPage: 10,
    totalItems: 100,
    totalPages: 10,
  };

  const linkProps = {
    pageName: 'StyleguideComponentExample',
    pagePathParams: {
      component: 'PaginationLinks',
      example: 'Empty',
    },
    pagination,
  };
  return (
    <div>
      <pre>
        <code>{JSON.stringify(pagination, null, '  ')}</code>
      </pre>
      <PaginationLinks {...linkProps} />
    </div>
  );
};

Pagination.propTypes = {
  history: shape({
    location: shape({
      search: string,
    }).isRequired,
  }).isRequired,
};

export const Empty = {
  component: withRouter(Pagination),
  group: 'navigation',
};
