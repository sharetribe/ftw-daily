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
  UserNav,
} from '../../components';
import { PasswordChangeForm, TopbarContainer } from '../../containers';

import { changePassword, changePasswordClear } from './PasswordChangePage.duck';
import css from './PasswordChangePage.css';

export const PasswordChangePageComponent = props => {
  const {
    changePasswordError,
    changePasswordInProgress,
    currentUser,
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
    <Page title="Contact details" scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer
            currentPage="PasswordChangePage"
            desktopClassName={css.desktopTopbar}
            mobileClassName={css.mobileTopbar}
          />
          <UserNav selectedPageName="PasswordChangePage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperSideNav tabs={tabs} />
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
  changePasswordError: null,
  currentUser: null,
};

const { bool, func } = PropTypes;

PasswordChangePageComponent.propTypes = {
  changePasswordError: propTypes.error,
  changePasswordInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  onChange: func.isRequired,
  onSubmitChangePassword: func.isRequired,
  passwordChanged: bool.isRequired,
  scrollingDisabled: bool.isRequired,
};

const mapStateToProps = state => {
  // Topbar needs user info.
  const {
    changePasswordError,
    changePasswordInProgress,
    passwordChanged,
  } = state.PasswordChangePage;
  const { currentUser } = state.user;
  return {
    changePasswordError,
    changePasswordInProgress,
    currentUser,
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
