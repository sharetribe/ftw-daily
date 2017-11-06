import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { ensureCurrentUser } from '../../util/data';
import { fetchCurrentUser, sendVerificationEmail } from '../../ducks/user.duck';
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
import { ContactDetailsForm, TopbarContainer } from '../../containers';

import { isScrollingDisabled } from '../../ducks/UI.duck';
import { changeEmail, changeEmailClear } from './ContactDetailsPage.duck';
import css from './ContactDetailsPage.css';

export const ContactDetailsPageComponent = props => {
  const {
    changeEmailError,
    changeEmailInProgress,
    currentUser,
    emailChanged,
    onChange,
    scrollingDisabled,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    onResendVerificationEmail,
    onSubmitChangeEmail,
    intl,
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

  const title = intl.formatMessage({ id: 'ContactDetailsPage.title' });

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer
            currentPage="ContactDetailsPage"
            desktopClassName={css.desktopTopbar}
            mobileClassName={css.mobileTopbar}
          />
          <UserNav selectedPageName="ContactDetailsPage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperSideNav tabs={tabs} />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>
              <FormattedMessage id="ContactDetailsPage.heading" />
            </h1>
            {changeEmailForm}
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

ContactDetailsPageComponent.defaultProps = {
  changeEmailError: null,
  currentUser: null,
  sendVerificationEmailError: null,
};

const { bool, func } = PropTypes;

ContactDetailsPageComponent.propTypes = {
  changeEmailError: propTypes.error,
  changeEmailInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  emailChanged: bool.isRequired,
  onChange: func.isRequired,
  onSubmitChangeEmail: func.isRequired,
  scrollingDisabled: bool.isRequired,
  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: propTypes.error,
  onResendVerificationEmail: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  // Topbar needs user info.
  const { currentUser, sendVerificationEmailInProgress, sendVerificationEmailError } = state.user;
  const { changeEmailError, changeEmailInProgress, emailChanged } = state.ContactDetailsPage;
  return {
    changeEmailError,
    changeEmailInProgress,
    currentUser,
    emailChanged,
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

const ContactDetailsPage = compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(
  ContactDetailsPageComponent
);

ContactDetailsPage.loadData = () => {
  // Since verify email happens in separate tab, current user's data might be updated
  return fetchCurrentUser();
};

export default ContactDetailsPage;
