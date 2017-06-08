import React, { PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import { PageLayout, HeroSection } from '../../components';
import { withFlattenedRoutes } from '../../util/contextHelpers';

import css from './LandingPage.css';

export const LandingPageComponent = props => {
  const { flattenedRoutes, history, location } = props;
  return (
    <PageLayout title="Landing page" className={css.root}>
      <HeroSection
        className={css.hero}
        flattenedRoutes={flattenedRoutes}
        history={history}
        location={location}
      />
    </PageLayout>
  );
};

const { array, object } = PropTypes;

LandingPageComponent.propTypes = {
  // from withFlattenedRoutes
  flattenedRoutes: array.isRequired,

  // from withRouter
  history: object.isRequired,
  location: object.isRequired,
};

export default withRouter(withFlattenedRoutes(LandingPageComponent));
