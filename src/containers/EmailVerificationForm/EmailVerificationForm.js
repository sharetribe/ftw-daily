import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { reduxForm, Field, propTypes as formPropTypes } from 'redux-form';
import { Button, NamedLink } from '../../components';

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

  const errorMessage = (
    <div className={css.error}>
      <FormattedMessage id="EmailVerificationForm.verificationFailed" />
    </div>
  );

  const verifyEmail = (
    <div className={css.root}>
      <div>
        <h2>
          <FormattedMessage id="EmailVerificationForm.verifyEmailAddress" />
        </h2>

        <p>
          <FormattedMessage id="EmailVerificationForm.finishAccountSetup" values={{ email }} />
        </p>

        {verificationError ? errorMessage : null}

      </div>

      <form onSubmit={handleSubmit}>
        <Field component="input" type="hidden" name="verificationToken" />

        <Button className={css.button} type="submit" disabled={submitting || inProgress}>

          {submitting || inProgress
            ? <FormattedMessage id="EmailVerificationForm.verifying" />
            : <FormattedMessage id="EmailVerificationForm.verify" />}
        </Button>
      </form>
    </div>
  );

  const alreadyVerified = (
    <div className={css.root}>
      <div>
        <h2>
          <FormattedMessage id="EmailVerificationForm.emailVerified" />
        </h2>

        <p>
          <FormattedMessage
            id="EmailVerificationForm.yourEmailAddressIsVerified"
            values={{ email }}
          />
        </p>

      </div>

      <NamedLink className={css.button} name="LandingPage">
        <FormattedMessage id="EmailVerificationForm.okHomepage" />
      </NamedLink>
    </div>
  );

  return currentUser.attributes.emailVerified ? alreadyVerified : verifyEmail;
};
EmailVerificationFormComponent.defaultProps = {
  currentUser: null,
  inProgress: false,
  verificationError: null,
};
const {
  instanceOf,
  bool,
} = PropTypes;

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
