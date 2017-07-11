import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { PageLayout, HeroSection, Topbar } from '../../components';
import { withFlattenedRoutes } from '../../util/contextHelpers';

import css from './LandingPage.css';

export const LandingPageComponent = props => {
  const { flattenedRoutes, history, location, scrollingDisabled } = props;
  return (
    <PageLayout title="Landing page" className={css.root} scrollingDisabled={scrollingDisabled}>
      <Topbar history={history} location={location} />
      <HeroSection
        className={css.hero}
        flattenedRoutes={flattenedRoutes}
        history={history}
        location={location}
      />
    </PageLayout>
  );
};

const { array, bool, object } = PropTypes;

LandingPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from withFlattenedRoutes
  flattenedRoutes: array.isRequired,

  // from withRouter
  history: object.isRequired,
  location: object.isRequired,
};

const mapStateToProps = state => ({
  scrollingDisabled: isScrollingDisabled(state),
});

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
});

const LandingPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withFlattenedRoutes
)(LandingPageComponent);

export default LandingPage;
