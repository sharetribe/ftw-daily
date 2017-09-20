import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import config from '../../config';
import { required } from '../../util/validators';
import { Button, CurrencyInputField } from '../../components';

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

  const errorMessage = updateError
    ? <p className={css.error}>
        <FormattedMessage id="EditListingPricingForm.updateFailed" />
      </p>
    : null;

  const classes = classNames(css.root, className);
  const submitDisabled = invalid || submitting || disabled || updateInProgress;

  return (
    <form className={classes} onSubmit={handleSubmit}>
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

      <Button className={css.submitButton} type="submit" disabled={submitDisabled}>
        {updated ? <FormattedMessage id="EditListingPricingForm.updated" /> : saveActionMsg}
      </Button>
    </form>
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
