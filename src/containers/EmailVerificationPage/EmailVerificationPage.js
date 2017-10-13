import React, { PropTypes } from 'react'; // eslint-disable-line react/no-deprecated
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { verify } from '../../ducks/EmailVerification.duck';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { parse } from '../../util/urlHelpers';
import { Page } from '../../components';
import { EmailVerificationForm, TopbarContainer } from '../../containers';

import css from './EmailVerificationPage.css';

/**
  Parse verification token from URL

  Returns stringified token, if the token is provided.

  Returns `null` if verification token is not provided.

  Please note that we need to explicitely stringify the token, because
  the unwanted result of the `parse` method is that it automatically
  parses the token to number.
*/
const parseVerificationToken = location => {
  const urlParams = parse(location.search);
  const verificationToken = urlParams.t;

  if (verificationToken) {
    return `${verificationToken}`;
  }

  return null;
};

export const EmailVerificationPageComponent = props => {
  const {
    authInfoError,
    currentUser,
    intl,
    logoutError,
    scrollingDisabled,
    submitVerification,
    emailVerificationInProgress,
    verificationError,
    location,
  } = props;
  const title = intl.formatMessage({
    id: 'EmailVerificationPage.title',
  });

  const initialValues = { verificationToken: parseVerificationToken(location) };

  return (
    <Page
      title={title}
      authInfoError={authInfoError}
      logoutError={logoutError}
      scrollingDisabled={scrollingDisabled}
    >
      <TopbarContainer />
      <div className={css.root}>
        <div className={css.content}>
          {currentUser ? (
            <EmailVerificationForm
              initialValues={initialValues}
              onSubmit={submitVerification}
              currentUser={currentUser}
              inProgress={emailVerificationInProgress}
              verificationError={verificationError}
            />
          ) : (
            <FormattedMessage id="EmailVerificationPage.loadingUserInformation" />
          )}
        </div>
      </div>
    </Page>
  );
};

EmailVerificationPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  logoutError: null,
  verificationError: null,
};

const { bool, func, instanceOf, shape, string } = PropTypes;

EmailVerificationPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  currentUser: propTypes.currentUser,
  logoutError: instanceOf(Error),
  scrollingDisabled: bool.isRequired,
  submitVerification: func.isRequired,
  emailVerificationInProgress: bool.isRequired,
  verificationError: instanceOf(Error),

  // from withRouter
  location: shape({
    search: string,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { authInfoError, logoutError } = state.Auth;
  const { currentUser } = state.user;
  const { verificationError } = state.EmailVerification;
  return {
    authInfoError,
    verificationError,
    currentUser,
    logoutError,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  submitVerification: ({ verificationToken }) => {
    return dispatch(verify(verificationToken));
  },
});

const EmailVerificationPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  injectIntl
)(EmailVerificationPageComponent);

export default EmailVerificationPage;
