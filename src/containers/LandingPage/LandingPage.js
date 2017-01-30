import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { HeroSection, NamedRedirect, PageLayout } from '../../components';
import { HeroSearchForm } from '../../containers';
import { changeLocationFilter } from '../../ducks/LocationFilter.ducks';
import css from './LandingPage.css';

const createSubmitHandler = onLocationChanged => formData => {
  onLocationChanged(formData.location);
};

export const LandingPageComponent = props => {
  const handleSubmit = createSubmitHandler(props.onLocationChanged);
  const componentOrRedirect = props.LocationFilter && props.LocationFilter.length > 0
    ? <NamedRedirect name="SearchPage" query={{ location: props.LocationFilter }} />
    : <PageLayout title="Landing page">
        <HeroSection>
          <HeroSearchForm className={css.form} onSubmit={handleSubmit} />
        </HeroSection>
      </PageLayout>;

  return componentOrRedirect;
};

const { func, string } = PropTypes;

LandingPageComponent.defaultProps = { LocationFilter: '' };

LandingPageComponent.propTypes = { onLocationChanged: func.isRequired, LocationFilter: string };

/**
 * Container functions.
 * Since we add this to global store state with combineReducers, this will only get partial state
 * which is page specific.
 */
const mapStateToProps = function mapStateToProps(state) {
  return state;
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return { onLocationChanged: v => dispatch(changeLocationFilter(v)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageComponent);
