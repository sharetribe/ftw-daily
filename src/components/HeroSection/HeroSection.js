import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { stringify } from '../../util/urlHelpers';
import { createResourceLocatorString } from '../../util/routes';
import routeConfiguration from '../../routeConfiguration';
import { IconSearch, Button } from '../../components';
import { LocationSearchForm } from '../../containers';

import css from './HeroSection.css';

const HeroSection = props => {
  const { rootClassName, className, history, location } = props;

  const handleMobileSearchClick = () => {
    const params = { mobilesearch: 'open' };
    const path = `${location.pathname}?${stringify(params)}`;
    history.push(path);
  };

  const handleSearchSubmit = values => {
    const { search, selectedPlace } = values.location;
    const { origin, bounds, country } = selectedPlace;
    const searchParams = { address: search, origin, bounds, country };
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams));
  };

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <h1 className={css.heroMainTitle}>
        <FormattedMessage id="HeroSection.title" />
      </h1>
      <h2 className={css.heroSubTitle}>
        <FormattedMessage id="HeroSection.subTitle" />
      </h2>
      <Button className={css.mobileSearchButton} onClick={handleMobileSearchClick}>
        <IconSearch rootClassName={css.searchIcon} />
        <FormattedMessage id="HeroSection.mobileSearchButtonText" />
      </Button>
      <LocationSearchForm className={css.desktopSearchForm} onSubmit={handleSearchSubmit} />
    </div>
  );
};

HeroSection.defaultProps = { rootClassName: null, className: null };

const { string, shape, func } = PropTypes;

HeroSection.propTypes = {
  rootClassName: string,
  className: string,

  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string.isRequired,
  }).isRequired,
};

export default HeroSection;
