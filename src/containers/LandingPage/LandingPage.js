import React, { PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import { HeroSection, PageLayout } from '../../components';
import { HeroSearchForm } from '../../containers';
import { stringify } from '../../util/urlHelpers';

import css from './LandingPage.css';

export const LandingPageComponent = props => {
  const { push: historyPush } = props;

  const handleSubmit = values => {
    const { location: { selectedPlace } } = values;
    const { address, origin, bounds } = selectedPlace;
    const searchQuery = stringify({ address, origin, bounds });
    historyPush(`/s?${searchQuery}`);
  };

  return (
    <PageLayout title="Landing page">
      <HeroSection>
        <HeroSearchForm className={css.form} onSubmit={handleSubmit} />
      </HeroSection>
    </PageLayout>
  );
};

const { func } = PropTypes;

LandingPageComponent.propTypes = {
  push: func.isRequired,
};

export default withRouter(LandingPageComponent);
