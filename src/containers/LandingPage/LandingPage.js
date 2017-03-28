import React, { PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import { HeroSection, PageLayout } from '../../components';
import { HeroSearchForm } from '../../containers';
import { createResourceLocatorString } from '../../util/routes';
import * as propTypes from '../../util/propTypes';

import css from './LandingPage.css';

export const LandingPageComponent = props => {
  const { push: historyPush, flattenedRoutes } = props;

  const handleSubmit = values => {
    const selectedPlace = values && values.location ? values.location.selectedPlace : null;
    const { address, origin, bounds } = selectedPlace || {};
    const searchParams = { address, origin, bounds };
    historyPush(createResourceLocatorString('SearchPage', flattenedRoutes, {}, searchParams));
  };

  return (
    <PageLayout title="Landing page">
      <HeroSection>
        <HeroSearchForm className={css.form} onSubmit={handleSubmit} />
      </HeroSection>
    </PageLayout>
  );
};

const { func, arrayOf } = PropTypes;

LandingPageComponent.propTypes = {
  flattenedRoutes: arrayOf(propTypes.route).isRequired,

  // history.push from withRouter
  push: func.isRequired,
};

export default withRouter(LandingPageComponent);
