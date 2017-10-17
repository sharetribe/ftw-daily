import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { ensureCurrentUser } from '../../util/data';
import { fetchCurrentUser, sendVerificationEmail } from '../../ducks/user.duck';
import {
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  Page,
  TabNav,
  UserNav,
} from '../../components';
import { ContactDetailsForm, TopbarContainer } from '../../containers';

import { isScrollingDisabled } from '../../ducks/UI.duck';
import { changeEmail, changeEmailClear } from './ContactDetailsPage.duck';
import css from './ContactDetailsPage.css';

export const ContactDetailsPageComponent = props => {
  const {
    authInfoError,
    changeEmailError,
    changeEmailInProgress,
    currentUser,
    emailChanged,
    logoutError,
    onChange,
    scrollingDisabled,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    onResendVerificationEmail,
    onSubmitChangeEmail,
  } = props;

  const tabs = [
    {
      text: <FormattedMessage id="ContactDetailsPage.emailTabTitle" />,
      selected: true,
      linkProps: {
        name: 'ContactDetailsPage',
      },
    },
    {
      text: <FormattedMessage id="ContactDetailsPage.passwordTabTitle" />,
      selected: false,
      linkProps: {
        name: 'PasswordChangePage',
      },
    },
  ];

  const user = ensureCurrentUser(currentUser);
  const email = user.attributes.email || '';
  const changeEmailForm = user.id ? (
    <ContactDetailsForm
      className={css.form}
      initialValues={{ email }}
      changeEmailError={changeEmailError}
      currentUser={currentUser}
      onResendVerificationEmail={onResendVerificationEmail}
      onSubmit={onSubmitChangeEmail}
      onChange={onChange}
      inProgress={changeEmailInProgress}
      ready={emailChanged}
      sendVerificationEmailInProgress={sendVerificationEmailInProgress}
      sendVerificationEmailError={sendVerificationEmailError}
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
            currentPage="ContactDetailsPage"
            desktopClassName={css.desktopTopbar}
            mobileClassName={css.mobileTopbar}
          />
          <UserNav selectedPageName="ContactDetailsPage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperSideNav>
          <TabNav rootClassName={css.tabs} tabRootClassName={css.tab} tabs={tabs} />
        </LayoutWrapperSideNav>
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>
              <FormattedMessage id="ContactDetailsPage.title" />
            </h1>
            {changeEmailForm}
          </div>
        </LayoutWrapperMain>
      </LayoutSideNavigation>
    </Page>
  );
};

ContactDetailsPageComponent.defaultProps = {
  authInfoError: null,
  changeEmailError: null,
  currentUser: null,
  logoutError: null,
  sendVerificationEmailError: null,
};

const { bool, func } = PropTypes;

ContactDetailsPageComponent.propTypes = {
  authInfoError: propTypes.error,
  changeEmailError: propTypes.error,
  changeEmailInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  emailChanged: bool.isRequired,
  logoutError: propTypes.error,
  onChange: func.isRequired,
  onSubmitChangeEmail: func.isRequired,
  scrollingDisabled: bool.isRequired,
  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: propTypes.error,
  onResendVerificationEmail: func.isRequired,
};

const mapStateToProps = state => {
  // Page needs authInfoError and logoutError, Topbar needs isAuthenticated
  const { authInfoError, isAuthenticated, logoutError } = state.Auth;
  // Topbar needs user info.
  const { currentUser, sendVerificationEmailInProgress, sendVerificationEmailError } = state.user;
  const { changeEmailError, changeEmailInProgress, emailChanged } = state.ContactDetailsPage;
  return {
    authInfoError,
    changeEmailError,
    changeEmailInProgress,
    currentUser,
    emailChanged,
    isAuthenticated,
    logoutError,
    scrollingDisabled: isScrollingDisabled(state),
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: () => dispatch(changeEmailClear()),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
  onSubmitChangeEmail: values => dispatch(changeEmail(values)),
});

const ContactDetailsPage = compose(connect(mapStateToProps, mapDispatchToProps))(
  ContactDetailsPageComponent
);

ContactDetailsPage.loadData = () => {
  // Since verify email happens in separate tab, current user's data might be updated
  return fetchCurrentUser();
};

export default ContactDetailsPage;
