import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperAccountSettingsSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  Page,
  UserNav,
} from '../../components';
import { DeleteAccountForm } from '../../forms'
import { TopbarContainer } from '..';

import {
  deleteAccount,
  deleteAccountClear,
  resetPassword,
} from './DeleteAccountPage.duck';
import { logout } from '../../ducks/Auth.duck';
import css from './DeleteAccountPage.module.css';

export const DeleteAccountPageComponent = props => {
  const {
    deleteAccountError,
    deleteAccountInProgress,
    currentUser,
    onChange,
    onLogout,
    onSubmitDeleteAccount,
    onResetPassword,
    resetPasswordInProgress,
    resetPasswordError,
    accountDeleted,
    scrollingDisabled,
    intl,
  } = props;

  const handleDeleteAccount = values => {
    return onSubmitDeleteAccount(values).then(() => {
      onLogout();
    });
  };

  useEffect(() => {
    return onChange();
  }, []);


  const pageDetails = (
    <div className={css.details}>
      <FormattedMessage
        id={
          deleteAccountError?.status == 409
            ? 'DeleteAccountPage.error'
            : 'DeleteAccountPage.details'
        }
        values={{ errorCause: deleteAccountError?.message }}
      />
    </div>
  );

  const title = intl.formatMessage({ id: 'DeleteAccountPage.title' });

  // Show form for a valid current user
  const showDeleteAccountForm = (currentUser && currentUser.id);
 
  const deleteAccountForm = showDeleteAccountForm ? (
      <DeleteAccountForm
        className={css.form}
        deleteAccountError={deleteAccountError}
        currentUser={currentUser}
        onSubmit={handleDeleteAccount}
        onChange={onChange}
        onResetPassword={onResetPassword}
        resetPasswordInProgress={resetPasswordInProgress}
        resetPasswordError={resetPasswordError}
        inProgress={deleteAccountInProgress}
        ready={accountDeleted}
      />
    ) :
    null;

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer
            currentPage="DeleteAccountPage"
            desktopClassName={css.desktopTopbar}
            mobileClassName={css.mobileTopbar}
          />
          <UserNav selectedPageName="DeleteAccountPage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperAccountSettingsSideNav currentTab="DeleteAccountPage" />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>
              <FormattedMessage id="DeleteAccountPage.heading" />
            </h1>
            {pageDetails}
            {deleteAccountForm}
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

DeleteAccountPageComponent.defaultProps = {
  deleteAccountError: null,
  currentUser: null,
  resetPasswordInProgress: false,
  resetPasswordError: null,
};

const { bool, func } = PropTypes;

DeleteAccountPageComponent.propTypes = {
  deleteAccountError: propTypes.error,
  deleteAccountInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  onChange: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onSubmitDeleteAccount: func.isRequired,
  accountDeleted: bool.isRequired,
  scrollingDisabled: bool.isRequired,
  resetPasswordInProgress: bool,
  resetPasswordError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  // Topbar needs user info.
  const {
    deleteAccountError,
    deleteAccountInProgress,
    accountDeleted,
    resetPasswordInProgress,
    resetPasswordError,
  } = state.DeleteAccountPage;
  const { currentUser } = state.user;
  return {
    deleteAccountError,
    deleteAccountInProgress,
    currentUser,
    accountDeleted,
    scrollingDisabled: isScrollingDisabled(state),
    resetPasswordInProgress,
    resetPasswordError,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: () => dispatch(deleteAccountClear()),
  onLogout: () => dispatch(logout()),
  onManageDisableScrolling: () => dispatch(manageDisableScrolling()),
  onSubmitDeleteAccount: values => dispatch(deleteAccount(values)),
  onResetPassword: values => dispatch(resetPassword(values)),
});

const DeleteAccountPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(DeleteAccountPageComponent);

export default DeleteAccountPage;