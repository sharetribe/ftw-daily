import React, { PropTypes, Component } from 'react'; // eslint-disable-line react/no-deprecated
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { parse } from '../../util/urlHelpers';
import { Page, NamedLink, IconKeys, IconKeysSuccess } from '../../components';
import { PasswordResetForm, TopbarContainer } from '../../containers';

import { resetPassword } from './PasswordResetPage.duck';
import css from './PasswordResetPage.css';

const parseUrlParams = location => {
  const params = parse(location.search);
  const { t: token, e: email } = params;
  return { token, email };
};

export class PasswordResetPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { newPasswordSubmitted: false };
  }
  render() {
    const {
      authInfoError,
      intl,
      logoutError,
      scrollingDisabled,
      location,
      resetPasswordInProgress,
      resetPasswordError,
      onSubmitPassword,
    } = this.props;

    const title = intl.formatMessage({
      id: 'PasswordResetPage.title',
    });

    const { token, email } = parseUrlParams(location);
    const paramsValid = !!(token && email);

    const handleSubmit = values => {
      const { password } = values;
      this.setState({ newPasswordSubmitted: false });
      onSubmitPassword(email, token, password).then(() => {
        this.setState({ newPasswordSubmitted: true });
      });
    };

    const recoveryLink = (
      <NamedLink name="PasswordRecoveryPage">
        <FormattedMessage id="PasswordResetPage.recoveryLinkText" />
      </NamedLink>
    );
    const paramsErrorContent = (
      <div className={css.content}>
        <p>
          <FormattedMessage id="PasswordResetPage.invalidUrlParams" values={{ recoveryLink }} />
        </p>
      </div>
    );

    const resetFormContent = (
      <div className={css.content}>
        <IconKeys className={css.modalIcon} />
        <h1 className={css.modalTitle}>
          <FormattedMessage id="PasswordResetPage.mainHeading" />
        </h1>
        <p className={css.modalMessage}>
          <FormattedMessage id="PasswordResetPage.helpText" />
        </p>
        {resetPasswordError
          ? <p className={css.error}>
              <FormattedMessage id="PasswordResetPage.resetFailed" />
            </p>
          : null}
        <PasswordResetForm
          className={css.form}
          onSubmit={handleSubmit}
          inProgress={resetPasswordInProgress}
        />
      </div>
    );

    const resetDoneContent = (
      <div className={css.content}>
        <IconKeysSuccess className={css.modalIcon} />
        <h1 className={css.modalTitle}>
          <FormattedMessage id="PasswordResetPage.passwordChangedHeading" />
        </h1>
        <p className={css.modalMessage}>
          <FormattedMessage id="PasswordResetPage.passwordChangedHelpText" />
        </p>
        <NamedLink name="LoginPage" className={css.submitButton}>
          <FormattedMessage id="PasswordResetPage.loginButtonText" />
        </NamedLink>
      </div>
    );

    let content;

    if (!paramsValid) {
      content = paramsErrorContent;
    } else if (!resetPasswordError && this.state.newPasswordSubmitted) {
      content = resetDoneContent;
    } else {
      content = resetFormContent;
    }

    return (
      <Page
        title={title}
        authInfoError={authInfoError}
        logoutError={logoutError}
        scrollingDisabled={scrollingDisabled}
      >
        <TopbarContainer />
        <div className={css.root}>
          {content}
        </div>
      </Page>
    );
  }
}

PasswordResetPageComponent.defaultProps = {
  authInfoError: null,
  logoutError: null,
  resetPasswordError: null,
};

const { bool, func, instanceOf, shape, string } = PropTypes;

PasswordResetPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  logoutError: instanceOf(Error),
  scrollingDisabled: bool.isRequired,
  resetPasswordInProgress: bool.isRequired,
  resetPasswordError: instanceOf(Error),
  onSubmitPassword: func.isRequired,

  // from withRouter
  location: shape({
    search: string,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { authInfoError, logoutError } = state.Auth;
  const { resetPasswordInProgress, resetPasswordError } = state.PasswordResetPage;
  return {
    authInfoError,
    logoutError,
    scrollingDisabled: isScrollingDisabled(state),
    resetPasswordInProgress,
    resetPasswordError,
  };
};

const mapDispatchToProps = dispatch => ({
  onSubmitPassword: (email, token, password) => dispatch(resetPassword(email, token, password)),
});

const PasswordResetPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  injectIntl
)(PasswordResetPageComponent);

export default PasswordResetPage;
