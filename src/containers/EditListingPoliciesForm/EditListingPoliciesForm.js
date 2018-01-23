import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Form, Button, TextInputField } from '../../components';

import css from './EditListingPoliciesForm.css';

export const EditListingPoliciesFormComponent = props => {
  const {
    className,
    disabled,
    handleSubmit,
    intl,
    form,
    invalid,
    saveActionMsg,
    submitting,
    updated,
    updateError,
    updateInProgress,
  } = props;

  const rulesLabelMessage = intl.formatMessage({ id: 'EditListingPoliciesForm.rulesLabel' });
  const saunaRulesPlaceholderMessage = intl.formatMessage({
    id: 'EditListingPoliciesForm.rulesPlaceholder',
  });

  const errorMessage = updateError ? (
    <p className={css.error}>
      <FormattedMessage id="EditListingPoliciesForm.updateFailed" />
    </p>
  ) : null;

  const classes = classNames(css.root, className);
  const submitReady = updated;
  const submitInProgress = submitting || updateInProgress;
  const submitDisabled = invalid || disabled || submitInProgress;

  return (
    <Form className={classes} onSubmit={handleSubmit}>
      {errorMessage}

      <TextInputField
        className={css.policy}
        type="textarea"
        name="saunaRules"
        id={`${form}.saunaRules`}
        label={rulesLabelMessage}
        placeholder={saunaRulesPlaceholderMessage}
      />

      <Button
        className={css.submitButton}
        type="submit"
        inProgress={submitInProgress}
        disabled={submitDisabled}
        ready={submitReady}
      >
        {saveActionMsg}
      </Button>
    </Form>
  );
};

EditListingPoliciesFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
};

const { func, string, bool } = PropTypes;

EditListingPoliciesFormComponent.propTypes = {
  ...formPropTypes,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  selectedPlace: propTypes.place,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
};

const formName = 'EditListingPoliciesForm';

export default compose(reduxForm({ form: formName }), injectIntl)(EditListingPoliciesFormComponent);
