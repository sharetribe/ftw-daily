import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { reduxForm, Field, propTypes as formPropTypes } from 'redux-form';
import { NamedLink, IconEmailAttention, IconEmailSuccess } from '../../components';
import * as propTypes from '../../util/propTypes';

import css from './EmailVerificationForm.css';

const EmailVerificationFormComponent = props => {
  const {
    currentUser,
    submitting,
    inProgress,
    handleSubmit,
    verificationError,
  } = props;

  const email = <strong>{currentUser.attributes.email}</strong>;
  const name = currentUser.attributes.profile.firstName;

  const errorMessage = (
    <div className={css.error}>
      <FormattedMessage id="EmailVerificationForm.verificationFailed" />
    </div>
  );

  const verifyEmail = (
    <div className={css.root}>
      <div>
        <IconEmailAttention className={css.modalIcon}/>
        <h1 className={css.modalTitle}>
          <FormattedMessage id="EmailVerificationForm.verifyEmailAddress" />
        </h1>

        <p className={css.modalMessage}>
          <FormattedMessage id="EmailVerificationForm.finishAccountSetup" values={{ email }} />
        </p>

        {verificationError ? errorMessage : null}

      </div>

      <form onSubmit={handleSubmit}>
        <Field component="input" type="hidden" name="verificationToken" />

        <div className={css.bottomWrapper}>
          <NamedLink className={css.submitButton} type="submit" disabled={submitting || inProgress}>

            {submitting || inProgress
              ? <FormattedMessage id="EmailVerificationForm.verifying" />
              : <FormattedMessage id="EmailVerificationForm.verify" />}
          </NamedLink>

        </div>
      </form>
    </div>
  );

  const alreadyVerified = (
    <div className={css.root}>
      <div>
        <IconEmailSuccess className={css.modalIcon}/>
        <h1 className={css.modalTitle}>
          <FormattedMessage id="EmailVerificationForm.successTitle" values={{ name }} />
        </h1>

        <p className={css.modalMessage}>
          <FormattedMessage id="EmailVerificationForm.successText" />
        </p>

      </div>

      <div className={css.bottomWrapper}>
        <NamedLink className={css.submitButton} name="LandingPage">
          <FormattedMessage id="EmailVerificationForm.successButtonText" />
        </NamedLink>
      </div>
    </div>
  );

  return currentUser.attributes.emailVerified ? alreadyVerified : verifyEmail;
};

EmailVerificationFormComponent.defaultProps = {
  currentUser: null,
  inProgress: false,
  verificationError: null,
};

const { instanceOf, bool } = PropTypes;

EmailVerificationFormComponent.propTypes = {
  ...formPropTypes,
  inProgress: bool,
  currentUser: propTypes.currentUser.isRequired,
  verificationError: instanceOf(Error),
};

const defaultFormName = 'EmailVerificationForm';

const EmailVerificationForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(
  EmailVerificationFormComponent
);

export default EmailVerificationForm;
