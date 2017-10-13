import React from 'react';
import { NamedLink } from '../../components';
import css from './FilterPanel.css';

const FilterPanel = () => (
  <div>
    <h1 className={css.filterTitle}>Filters</h1>
    <NamedLink className={css.toListingsButton} name="SearchListingsPage">
      See studios
    </NamedLink>
    <NamedLink className={css.close} name="SearchListingsPage">
      X
    </NamedLink>
  </div>
);

export default FilterPanel;
