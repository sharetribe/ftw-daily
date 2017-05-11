import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl } from 'react-intl';
import config from '../../config';
import { enhancedField } from '../../util/forms';
import { required } from '../../util/validators';
import { CurrencyInput, Button } from '../../components';

import css from './EditListingPricingForm.css';

export class EditListingPricingFormComponent extends Component {
  constructor(props) {
    super(props);

    // We must create the enhanced components outside the render function
    // to avoid losing focus.
    // See: https://github.com/erikras/redux-form/releases/tag/v6.0.0-alpha.14
    this.EnhancedCurrencyInput = enhancedField(CurrencyInput);
  }

  render() {
    const {
      disabled,
      handleSubmit,
      intl,
      invalid,
      saveActionMsg,
      submitting,
    } = this.props;

    const priceMessage = intl.formatMessage({ id: 'EditListingPricingForm.price' });
    const priceRequiredMessage = intl.formatMessage({ id: 'EditListingPricingForm.priceRequired' });
    const pricePlaceholderMessage = intl.formatMessage({
      id: 'EditListingPricingForm.pricePlaceholder',
    });

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="price"
          label={priceMessage}
          component={this.EnhancedCurrencyInput}
          currencyConfig={config.currencyConfig}
          validate={[required(priceRequiredMessage)]}
          placeholder={pricePlaceholderMessage}
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
  }
}

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
