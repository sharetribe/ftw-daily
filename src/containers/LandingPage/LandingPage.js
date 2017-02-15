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
  const { onLocationChanged, filter } = props;
  const handleSubmit = createSubmitHandler(onLocationChanged);

  return filter.length > 0
    ? <NamedRedirect name="SearchPage" search={`location=${filter}`} />
    : <PageLayout title="Landing page">
        <HeroSection>
          <HeroSearchForm className={css.form} onSubmit={handleSubmit} />
        </HeroSection>
      </PageLayout>;
};

const { func, string } = PropTypes;

LandingPageComponent.defaultProps = { filter: '' };

LandingPageComponent.propTypes = { onLocationChanged: func.isRequired, filter: string };

const mapStateToProps = state => ({ filter: state.LocationFilter });

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return { onLocationChanged: v => dispatch(changeLocationFilter(v)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageComponent);
