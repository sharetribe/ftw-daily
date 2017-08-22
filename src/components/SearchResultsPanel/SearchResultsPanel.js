import React, { PropTypes } from 'react';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { ListingCard, PaginationLinks } from '../../components';
import css from './SearchResultsPanel.css';

const SearchResultsPanel = props => {
  const { className, rootClassName, currencyConfig, listings, pagination, search } = props;
  const classes = classNames(rootClassName || css.root, className);

  const paginationLinks = pagination && pagination.totalPages > 1
    ? <PaginationLinks
        className={css.pagination}
        pageName="SearchPage"
        pageSearchParams={search}
        pagination={pagination}
      />
    : null;

  return (
    <div className={classes}>
      <div className={css.listingCards}>
        {listings.map(l => (
          <ListingCard
            className={css.listingCard}
            key={l.id.uuid}
            listing={l}
            currencyConfig={currencyConfig}
          />
        ))}
        {props.children}
      </div>
      {paginationLinks}
    </div>
  );
};

SearchResultsPanel.defaultProps = {
  children: null,
  className: null,
  listings: [],
  pagination: null,
  rootClassName: null,
  search: null,
};

const { array, node, object, string } = PropTypes;

SearchResultsPanel.propTypes = {
  children: node,
  className: string,
  currencyConfig: propTypes.currencyConfig.isRequired,
  listings: array,
  pagination: propTypes.pagination,
  rootClassName: string,
  search: object,
};

export default SearchResultsPanel;
