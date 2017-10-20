import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  Page,
  TabNav,
  UserNav,
} from '../../components';
import { PasswordChangeForm, TopbarContainer } from '../../containers';

import { changePassword, changePasswordClear } from './PasswordChangePage.duck';
import css from './PasswordChangePage.css';

export const PasswordChangePageComponent = props => {
  const {
    authInfoError,
    changePasswordError,
    changePasswordInProgress,
    currentUser,
    logoutError,
    onChange,
    onSubmitChangePassword,
    passwordChanged,
    scrollingDisabled,
  } = props;

  const tabs = [
    {
      text: <FormattedMessage id="PasswordChangePage.emailTabTitle" />,
      selected: false,
      linkProps: {
        name: 'ContactDetailsPage',
      },
    },
    {
      text: <FormattedMessage id="PasswordChangePage.passwordTabTitle" />,
      selected: true,
      linkProps: {
        name: 'PasswordChangePage',
      },
    },
  ];

  const changePasswordForm =
    currentUser && currentUser.id ? (
      <PasswordChangeForm
        className={css.form}
        changePasswordError={changePasswordError}
        currentUser={currentUser}
        onSubmit={onSubmitChangePassword}
        onChange={onChange}
        inProgress={changePasswordInProgress}
        ready={passwordChanged}
      />
    ) : null;

  return (
    <Page
      authInfoError={authInfoError}
      logoutError={logoutError}
      title="Contact details"
      scrollingDisabled={scrollingDisabled}
    >
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer
            currentPage="PasswordChangePage"
            desktopClassName={css.desktopTopbar}
            mobileClassName={css.mobileTopbar}
          />
          <UserNav selectedPageName="PasswordChangePage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperSideNav>
          <TabNav rootClassName={css.tabs} tabRootClassName={css.tab} tabs={tabs} />
        </LayoutWrapperSideNav>
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>
              <FormattedMessage id="PasswordChangePage.title" />
            </h1>
            {changePasswordForm}
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

PasswordChangePageComponent.defaultProps = {
  authInfoError: null,
  changePasswordError: null,
  currentUser: null,
  logoutError: null,
};

const { bool, func } = PropTypes;

PasswordChangePageComponent.propTypes = {
  authInfoError: propTypes.error,
  changePasswordError: propTypes.error,
  changePasswordInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  logoutError: propTypes.error,
  onChange: func.isRequired,
  onSubmitChangePassword: func.isRequired,
  passwordChanged: bool.isRequired,
  scrollingDisabled: bool.isRequired,
};

const mapStateToProps = state => {
  // Page needs authInfoError and logoutError
  const { authInfoError, logoutError } = state.Auth;
  // Topbar needs user info.
  const {
    changePasswordError,
    changePasswordInProgress,
    passwordChanged,
  } = state.PasswordChangePage;
  const { currentUser } = state.user;
  return {
    authInfoError,
    changePasswordError,
    changePasswordInProgress,
    currentUser,
    logoutError,
    passwordChanged,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: () => dispatch(changePasswordClear()),
  onSubmitChangePassword: values => dispatch(changePassword(values)),
});

const PasswordChangePage = compose(connect(mapStateToProps, mapDispatchToProps))(
  PasswordChangePageComponent
);

export default PasswordChangePage;
