import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { parse } from '../../util/urlHelpers';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  Page,
  NamedLink,
  IconKeys,
  IconKeysSuccess,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import { PasswordResetForm } from '../../forms';
import { TopbarContainer } from '../../containers';

import { resetPassword } from './PasswordResetPage.duck';
import css from './PasswordResetPage.module.css';

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
      intl,
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
        {resetPasswordError ? (
          <p className={css.error}>
            <FormattedMessage id="PasswordResetPage.resetFailed" />
          </p>
        ) : null}
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
      <Page title={title} scrollingDisabled={scrollingDisabled} referrer="origin">
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain className={css.layoutWrapperMain}>
            <div className={css.root}>{content}</div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

PasswordResetPageComponent.defaultProps = {
  resetPasswordError: null,
};

const { bool, func, shape, string } = PropTypes;

PasswordResetPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
  resetPasswordInProgress: bool.isRequired,
  resetPasswordError: propTypes.error,
  onSubmitPassword: func.isRequired,

  // from withRouter
  location: shape({
    search: string,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { resetPasswordInProgress, resetPasswordError } = state.PasswordResetPage;
  return {
    scrollingDisabled: isScrollingDisabled(state),
    resetPasswordInProgress,
    resetPasswordError,
  };
};

const mapDispatchToProps = dispatch => ({
  onSubmitPassword: (email, token, password) => dispatch(resetPassword(email, token, password)),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const PasswordResetPage = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(PasswordResetPageComponent);

export default PasswordResetPage;
