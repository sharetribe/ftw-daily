import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import range from 'lodash/range';
import { IconArrowHead, NamedLink } from '../../components';
import { stringify } from '../../util/urlHelpers';
import { propTypes } from '../../util/types';

import css from './PaginationLinks.module.css';

const { string, object } = PropTypes;

let pgKey = 0;
const paginationGapKey = () => {
  pgKey += 1;
  return pgKey;
};

/**
 * Returns an array containing page numbers and possible ellipsis '…' characters.
 *
 * @param {Number} page - current page
 * @param {Number} totalPages - total page count
 * @return {Array}
 */
const getPageNumbersArray = (page, totalPages) => {
  // Create array of numbers: [1, 2, 3, 4, ..., totalPages]
  const numbersFrom1ToTotalPages = range(1, totalPages + 1);
  return numbersFrom1ToTotalPages
    .filter(v => {
      // Filter numbers that are next to current page and pick also first and last page
      // E.g. [1, 4, 5, 6, 9], where current page = 5 and totalPages = 9.
      return v === 1 || Math.abs(v - page) <= 1 || v === totalPages;
    })
    .reduce((newArray, p) => {
      // Create a new array where gaps between consecutive numbers is filled with ellipsis character
      // E.g. [1, '…', 4, 5, 6, '…', 9], where current page = 5 and totalPages = 9.
      const isFirstPageOrNextToCurrentPage = p === 1 || newArray[newArray.length - 1] + 1 === p;
      return isFirstPageOrNextToCurrentPage ? newArray.concat([p]) : newArray.concat(['\u2026', p]);
    }, []);
};

/**
 * Component that renders "Previous page" and "Next page" pagination
 * links of the given page component with the given pagination
 * information.
 *
 * The links will be disabled when no previous/next page exists.
 */
export const PaginationLinksComponent = props => {
  const {
    className,
    rootClassName,
    intl,
    pageName,
    pagePathParams,
    pageSearchParams,
    pagination,
  } = props;
  const classes = classNames(rootClassName || css.root, className);

  const { page, totalPages } = pagination;
  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;
  const prevSearchParams = { ...pageSearchParams, page: prevPage };
  const nextSearchParams = { ...pageSearchParams, page: nextPage };

  /* Arrow links: to previous page */
  const prevLinkEnabled = (
    <NamedLink
      className={css.prev}
      name={pageName}
      params={pagePathParams}
      to={{ search: stringify(prevSearchParams) }}
      title={intl.formatMessage({ id: 'PaginationLinks.previous' })}
    >
      <IconArrowHead direction="left" size="big" rootClassName={css.arrowIcon} />
    </NamedLink>
  );

  const prevLinkDisabled = (
    <div className={css.prev}>
      <IconArrowHead
        direction="left"
        size="big"
        rootClassName={classNames(css.arrowIcon, css.disabled)}
      />
    </div>
  );

  /* Arrow links: to next page */
  const nextLinkEnabled = (
    <NamedLink
      className={css.next}
      name={pageName}
      params={pagePathParams}
      to={{ search: stringify(nextSearchParams) }}
      title={intl.formatMessage({ id: 'PaginationLinks.next' })}
    >
      <IconArrowHead direction="right" size="big" rootClassName={css.arrowIcon} />
    </NamedLink>
  );

  const nextLinkDisabled = (
    <div className={css.next}>
      <IconArrowHead
        direction="right"
        size="big"
        rootClassName={classNames(css.arrowIcon, css.disabled)}
      />
    </div>
  );

  /* Numbered pagination links */

  const pageNumbersNavLinks = getPageNumbersArray(page, totalPages).map(v => {
    const isCurrentPage = v === page;
    const pageClassNames = classNames(css.toPageLink, { [css.currentPage]: isCurrentPage });
    return typeof v === 'number' ? (
      <NamedLink
        key={v}
        className={pageClassNames}
        name={pageName}
        params={pagePathParams}
        to={{ search: stringify({ ...pageSearchParams, page: v }) }}
        title={intl.formatMessage({ id: 'PaginationLinks.toPage' }, { page: v })}
      >
        {v}
      </NamedLink>
    ) : (
      <span key={`pagination_gap_${paginationGapKey()}`} className={css.paginationGap}>
        {v}
      </span>
    );
  });

  // Using 'justify-content: space-between' we can deal with very narrow mobile screens.
  // However, since the length of pageNumberList can vary up to 7,
  // we need to keep track of how much space is allocated for the list
  // Maximum length of pageNumbersNavLinks is 7 (e.g. [1, '…', 4, 5, 6, '…', 9])
  const pageNumberListClassNames = classNames(
    css.pageNumberList,
    css[`pageNumberList${pageNumbersNavLinks.length}Items`]
  );

  return (
    <nav className={classes}>
      {prevPage ? prevLinkEnabled : prevLinkDisabled}
      <div className={pageNumberListClassNames}>{pageNumbersNavLinks}</div>
      {nextPage ? nextLinkEnabled : nextLinkDisabled}
    </nav>
  );
};

PaginationLinksComponent.defaultProps = {
  className: '',
  rootClassName: '',
  pagePathParams: {},
  pageSearchParams: {},
};

PaginationLinksComponent.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  pageName: string.isRequired,
  pagePathParams: object,
  pageSearchParams: object,
  pagination: propTypes.pagination.isRequired,
};

export default injectIntl(PaginationLinksComponent);
