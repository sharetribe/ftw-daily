import React from 'react';
import PropTypes from 'prop-types';
import { NamedLink } from '../../components';
import css from './MapPanel.css';

const MapPanel = props => (
  <div>
    <div className={css.mapContainer}>Map</div>
    <div className={css.mapListingsContainer}>{props.children}</div>
    <NamedLink className={css.toFiltersButton} name="SearchFiltersPage">
      Filters
    </NamedLink>
    <NamedLink className={css.close} name="SearchListingsPage">
      X
    </NamedLink>
  </div>
);

MapPanel.defaultProps = { children: null };

const { any } = PropTypes;

MapPanel.propTypes = { children: any };

export default MapPanel;
