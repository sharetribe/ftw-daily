import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl } from 'react-intl';
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
  } = props;

  const pricePerNightMessage = intl.formatMessage({ id: 'EditListingPricingForm.pricePerNight' });
  const priceRequiredMessage = intl.formatMessage({ id: 'EditListingPricingForm.priceRequired' });
  const pricePlaceholderMessage = intl.formatMessage({
    id: 'EditListingPricingForm.priceInputPlaceholder',
  });

  const classes = classNames(css.root, className);

  return (
    <form className={classes} onSubmit={handleSubmit}>
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
        disabled={invalid || submitting || disabled}
      >
        {saveActionMsg}
      </Button>
    </form>
  );
};

EditListingPricingFormComponent.defaultProps = { saveActionMsg: 'Next: photos' };

const { func, string } = PropTypes;

EditListingPricingFormComponent.propTypes = {
  ...formPropTypes,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string,
};

const formName = 'EditListingPricingForm';

export default compose(reduxForm({ form: formName }), injectIntl)(EditListingPricingFormComponent);
