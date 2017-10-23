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
  const { logoutError, scrollingDisabled } = props;

  return (
    <Page
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
  logoutError: null,
};

const { bool } = PropTypes;

PayoutPreferencesPageComponent.propTypes = {
  logoutError: propTypes.error,
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

const PayoutPreferencesPage = compose(connect(mapStateToProps))(PayoutPreferencesPageComponent);

export default PayoutPreferencesPage;
