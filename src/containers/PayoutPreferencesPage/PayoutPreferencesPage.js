import React, { PropTypes } from 'react'; // eslint-disable-line react/no-deprecated
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { Page } from '../../components';
import { TopbarContainer } from '../../containers';

export const PayoutPreferencesPageComponent = props => {
  const { authInfoError, logoutError, scrollingDisabled } = props;

  return (
    <Page
      authInfoError={authInfoError}
      logoutError={logoutError}
      title="Payout preferences"
      scrollingDisabled={scrollingDisabled}
    >
      <TopbarContainer />
    </Page>
  );
};

PayoutPreferencesPageComponent.defaultProps = {
  authInfoError: null,
  logoutError: null,
};

const { bool, instanceOf } = PropTypes;

PayoutPreferencesPageComponent.propTypes = {
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

const PayoutPreferencesPage = compose(connect(mapStateToProps))(PayoutPreferencesPageComponent);

export default PayoutPreferencesPage;
