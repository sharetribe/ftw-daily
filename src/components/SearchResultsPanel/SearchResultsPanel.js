import React, { PropTypes } from 'react';
import { Menu, NamedLink } from '../../components';
import css from './SearchResultsPanel.css';

const SearchResultsPanel = props => (
  <div>
    {props.children}
    <div className={css.navigation}>
      <NamedLink className={css.button} name="SearchFiltersPage">Filters</NamedLink>
      <NamedLink className={css.button} name="SearchMapPage">Map</NamedLink>
    </div>
  </div>
);

SearchResultsPanel.defaultProps = { children: null };

const { any } = PropTypes;

SearchResultsPanel.propTypes = { children: any };

export default SearchResultsPanel;
