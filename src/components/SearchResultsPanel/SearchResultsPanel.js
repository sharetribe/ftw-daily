import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { Button, ListingCard } from '../../components';
import css from './SearchResultsPanel.css';

const SearchResultsPanel = props => {
  const { currencyConfig, listings, onNextPage, onPreviousPage } = props;
  const pagination = onNextPage || onPreviousPage
    ? <div className={css.pagination}>
        <Button
          onClick={() => onPreviousPage()}
          disabled={!onPreviousPage}
          className={css.prevPage}
        >
          <FormattedMessage id="SearchResultsPanel.previousPage" />
        </Button>
        <Button onClick={() => onNextPage()} disabled={!onNextPage} className={css.nextPage}>
          <FormattedMessage id="SearchResultsPanel.nextPage" />
        </Button>
      </div>
    : null;

  return (
    <div>
      {listings.map(l => (
        <ListingCard key={l.id.uuid} listing={l} currencyConfig={currencyConfig} />
      ))}
      {pagination}
    </div>
  );
};

SearchResultsPanel.defaultProps = {
  listings: [],
  onNextPage: null,
  onPreviousPage: null,
};

const { array, func } = PropTypes;

SearchResultsPanel.propTypes = {
  currencyConfig: propTypes.currencyConfig.isRequired,
  listings: array,
  onNextPage: func,
  onPreviousPage: func,
};

export default SearchResultsPanel;
