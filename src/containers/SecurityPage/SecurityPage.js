import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { Page } from '../../components';
import { TopbarContainer } from '../../containers';

export const SecurityPageComponent = props => {
  const { authInfoError, logoutError, scrollingDisabled } = props;

  return (
    <Page
      authInfoError={authInfoError}
      logoutError={logoutError}
      title="Security"
      scrollingDisabled={scrollingDisabled}
    >
      <TopbarContainer />
    </Page>
  );
};

SecurityPageComponent.defaultProps = {
  authInfoError: null,
  logoutError: null,
};

const { bool, instanceOf } = PropTypes;

SecurityPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  logoutError: instanceOf(Error),
  scrollingDisabled: bool.isRequired,
};

const mapStateToProps = state => {
  // Page needs authInfoError and logoutError
  const { authInfoError, logoutError } = state.Auth;
  return {
    authInfoError,
    logoutError,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const SecurityPage = compose(connect(mapStateToProps))(SecurityPageComponent);

export default SecurityPage;
