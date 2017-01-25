import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { HeroSection, NamedRedirect, PageLayout } from '../../components';
import { HeroSearchForm } from '../../containers';
import { changeLocationFilter } from '../../ducks/LocationFilter.ducks';
import css from './LandingPage.css';

const submitCurry = addFilterCreator => formData => {
  addFilterCreator(formData.location);
};

export const LandingPageComponent = props => {
  const handleSubmit = submitCurry(props.changeLocationFilter);
  const shouldRedirectToSearch = props.LocationFilter && props.LocationFilter.length > 0
    ? <NamedRedirect name="SearchPage" query={{ location: props.LocationFilter }} />
    : null;

  return (
    <PageLayout title="Landing page">
      {shouldRedirectToSearch}
      <HeroSection>
        <HeroSearchForm className={css.form} onSubmit={handleSubmit} />
      </HeroSection>
    </PageLayout>
  );
};

const { func, string } = PropTypes;

LandingPageComponent.defaultProps = { LocationFilter: '' };

LandingPageComponent.propTypes = { changeLocationFilter: func.isRequired, LocationFilter: string };

/**
 * Container functions.
 * Since we add this to global store state with combineReducers, this will only get partial state
 * which is page specific.
 */
const mapStateToProps = function mapStateToProps(state) {
  return state;
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return { changeLocationFilter: v => dispatch(changeLocationFilter(v)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageComponent)
