import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
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

  const priceRequiredMessage = intl.formatMessage({ id: 'EditListingPricingForm.priceRequired' });

  const classes = classNames(css.root, className);

  return (
    <form className={classes} onSubmit={handleSubmit}>
      <div className={css.priceWrapper}>
        <CurrencyInputField
          className={css.priceInput}
          name="price"
          currencyConfig={config.currencyConfig}
          validate={[required(priceRequiredMessage)]}
          autoFocus
        />
        <div className={css.perNight}>
          <FormattedMessage id="EditListingPricingForm.perNight" />
        </div>
      </div>

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
