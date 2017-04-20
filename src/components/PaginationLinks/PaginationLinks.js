import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { NamedLink } from '../../components';
import { stringify } from '../../util/urlHelpers';
import * as propTypes from '../../util/propTypes';

import css from './PaginationLinks.css';

const { string, object } = PropTypes;

/**
 * Component that renders "Previous page" and "Next page" pagination
 * links of the given page component with the given pagination
 * information.
 *
 * The links will be disabled when no previous/next page exists.
 */
const PaginationLinks = props => {
  const { className, pageName, pagePathParams, pageSearchParams, pagination } = props;
  const { page, totalPages } = pagination;
  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;
  const prevSearchParams = { ...pageSearchParams, page: prevPage };
  const nextSearchParams = { ...pageSearchParams, page: nextPage };

  const prevLinkEnabled = (
    <NamedLink
      className={css.prev}
      name={pageName}
      params={pagePathParams}
      to={{ search: stringify(prevSearchParams) }}
    >
      <FormattedMessage id="PaginationLinks.previous" />
    </NamedLink>
  );

  const prevLinkDisabled = (
    <div className={classNames(css.disabled, css.prev)}>
      <FormattedMessage id="PaginationLinks.previous" />
    </div>
  );

  const nextLinkEnabled = (
    <NamedLink
      className={css.next}
      name={pageName}
      params={pagePathParams}
      to={{ search: stringify(nextSearchParams) }}
    >
      <FormattedMessage id="PaginationLinks.next" />
    </NamedLink>
  );

  const nextLinkDisabled = (
    <div className={classNames(css.disabled, css.next)}>
      <FormattedMessage id="PaginationLinks.next" />
    </div>
  );

  return (
    <nav className={className}>
      {prevPage ? prevLinkEnabled : prevLinkDisabled}
      {nextPage ? nextLinkEnabled : nextLinkDisabled}
    </nav>
  );
};

PaginationLinks.defaultProps = { className: '', pagePathParams: {}, pageSearchParams: {} };

PaginationLinks.propTypes = {
  className: string,
  pageName: string.isRequired,
  pagePathParams: object,
  pageSearchParams: object,
  pagination: propTypes.pagination.isRequired,
};

export default PaginationLinks;
