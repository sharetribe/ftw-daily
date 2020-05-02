import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput } from '../../components';

import NamedLink from '../../components/NamedLink/NamedLink';

import css from './EditListingPoliciesForm.css';

const RULES_MAX_LENGTH = 20;
export const EditListingPoliciesFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        className,
        disabled,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        currentUser,
      } = fieldRenderProps;

      console.log('Umair', currentUser);

      const rulesLabelMessage = intl.formatMessage({
        id: 'EditListingPoliciesForm.rulesLabel',
      });
      const rulesPlaceholderMessage = intl.formatMessage({
        id: 'EditListingPoliciesForm.rulesPlaceholder',
      });
      const rulesRequiredMessage = intl.formatMessage({
        id: 'EditListingPoliciesForm.rulesRequired',
      });
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingPoliciesForm.maxLength' },
        {
          maxLength: RULES_MAX_LENGTH,
        }
      );
      const maxLength60Message = maxLength(maxLengthMessage, RULES_MAX_LENGTH);

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingPoliciesForm.updateFailed" />
        </p>
      ) : null;
      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingPoliciesForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}

          {currentUser ? (
            currentUser.attributes.profile.publicData.yotiVerified == 'YES' ? (
              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={submitReady}
              >
                {saveActionMsg}
              </Button>
            ) : (
              <NamedLink name="ProfileSettingsPage">
                <Button
                  className={css.submitButton}
                  type="submit"
                  inProgress={submitInProgress}
                  disabled={submitDisabled}
                  ready={submitReady}
                >
                  Go to Profile
                </Button>
              </NamedLink>
            )
          ) : (
            <NamedLink name="ProfileSettingsPage">
              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={submitReady}
              >
                Go to Profile
              </Button>
            </NamedLink>
          )}
        </Form>
      );
    }}
  />
);

EditListingPoliciesFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
};

EditListingPoliciesFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  selectedPlace: propTypes.place,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingPoliciesFormComponent);
