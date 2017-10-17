import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import config from '../../config';
import { required } from '../../util/validators';
import { Form, Button, CurrencyInputField } from '../../components';

import css from './EditListingPricingForm.css';

export const EditListingPricingFormComponent = props => {
  const {
    className,
    disabled,
    handleSubmit,
    intl,
    invalid,
    saveActionMsg,
    submitting,
    updated,
    updateError,
    updateInProgress,
  } = props;

  const pricePerNightMessage = intl.formatMessage({ id: 'EditListingPricingForm.pricePerNight' });
  const priceRequiredMessage = intl.formatMessage({ id: 'EditListingPricingForm.priceRequired' });
  const pricePlaceholderMessage = intl.formatMessage({
    id: 'EditListingPricingForm.priceInputPlaceholder',
  });

  const errorMessage = updateError ? (
    <p className={css.error}>
      <FormattedMessage id="EditListingPricingForm.updateFailed" />
    </p>
  ) : null;

  const classes = classNames(css.root, className);
  const submitReady = updated;
  const submitInProgress = submitting || updateInProgress;
  const submitDisabled = invalid || disabled || submitInProgress;

  return (
    <Form className={classes} onSubmit={handleSubmit}>
      {errorMessage}
      <CurrencyInputField
        id="EditListingPricingForm.CurrencyInputField"
        className={css.priceInput}
        autoFocus
        name="price"
        label={pricePerNightMessage}
        placeholder={pricePlaceholderMessage}
        currencyConfig={config.currencyConfig}
        validate={[required(priceRequiredMessage)]}
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

EditListingPricingFormComponent.defaultProps = { updateError: null };

const { func, string, bool, instanceOf } = PropTypes;

EditListingPricingFormComponent.propTypes = {
  ...formPropTypes,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: instanceOf(Error),
  updateInProgress: bool.isRequired,
};

const formName = 'EditListingPricingForm';

export default compose(reduxForm({ form: formName }), injectIntl)(EditListingPricingFormComponent);
