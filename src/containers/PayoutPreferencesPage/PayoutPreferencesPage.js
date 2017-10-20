import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as propTypes from '../../util/propTypes';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  Page,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
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
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>Content</LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
};

PayoutPreferencesPageComponent.defaultProps = {
  authInfoError: null,
  logoutError: null,
};

const { bool } = PropTypes;

PayoutPreferencesPageComponent.propTypes = {
  authInfoError: propTypes.error,
  logoutError: propTypes.error,
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
