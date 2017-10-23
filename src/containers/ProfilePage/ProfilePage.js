import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as propTypes from '../../util/propTypes';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { Page } from '../../components';
import { TopbarContainer } from '../../containers';

export const ProfilePageComponent = props => {
  const { logoutError, params, scrollingDisabled } = props;

  return (
    <Page
      logoutError={logoutError}
      title={`Profile page with display name: ${params.displayName}`}
      scrollingDisabled={scrollingDisabled}
    >
      <TopbarContainer />
    </Page>
  );
};

ProfilePageComponent.defaultProps = {
  logoutError: null,
};

const { bool, shape, string } = PropTypes;

ProfilePageComponent.propTypes = {
  logoutError: propTypes.error,
  params: shape({ displayName: string.isRequired }).isRequired,
  scrollingDisabled: bool.isRequired,
};

const mapStateToProps = state => {
  // Page needs logoutError
  const { logoutError } = state.Auth;
  return {
    logoutError,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const ProfilePage = compose(connect(mapStateToProps))(ProfilePageComponent);

export default ProfilePage;
