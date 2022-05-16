import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { LINE_ITEM_DAY, LINE_ITEM_NIGHT, propTypes } from '../../util/types';
import {
  Form,
  Button,
  FieldTextInput,
  FieldCurrencyInput,
  FieldRadioButton,
} from '../../components';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { required, composeValidators, requiredNumber } from '../../util/validators';

import css from './EditProgramListingPricingForm.module.css';
import config from '../../config';

const { Money } = sdkTypes;

const PRICING_TYPE_PACKAGE = 'package';
const PRICING_TYPE_HOURLY = 'hourly';
const currencyUnit = process.env.REACT_APP_SHARETRIBE_MARKETPLACE_CURRENCY;

const EditProgramListingPricingForm = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        values,
      } = formRenderProps;

      const unitType = config.bookingUnitType;
      const isNightly = unitType === LINE_ITEM_NIGHT;
      const isDaily = unitType === LINE_ITEM_DAY;

      const translationKey =
        values.pricingType === 'hourly'
          ? 'EditProgramListingPricingForm.pricePerHour'
          : 'EditProgramListingPricingForm.pricePerPackage';

      const pricePerUnitMessage = intl.formatMessage({
        id: translationKey,
      });

      const pricingTypeRequiredMessage = intl.formatMessage({
        id: 'EditProgramListingPricingPanel.pricingTypeRequired',
      });

      const pricePlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder',
      });

      const quantityRequiredMessage = intl.formatMessage({
        id: 'EditProgramListingPricingForm.quantityRequired',
      });

      const priceRequired = validators.required(
        intl.formatMessage({
          id: 'EditListingPricingForm.priceRequired',
        })
      );
      const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);
      const minPriceRequired = validators.moneySubUnitAmountAtLeast(
        intl.formatMessage(
          {
            id: 'EditListingPricingForm.priceTooLow',
          },
          {
            minPrice: formatMoney(intl, minPrice),
          }
        ),
        config.listingMinimumPriceSubUnits
      );
      const priceValidators = config.listingMinimumPriceSubUnits
        ? validators.composeValidators(priceRequired, minPriceRequired)
        : priceRequired;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      const { updateListingError, showListingsError } = fetchErrors || {};

      const { pricingType = PRICING_TYPE_HOURLY, price, quantity = 0, hours } = values;
      let totalPrice = new Money(0, currencyUnit);
      if (values.price) {
        const totalAmount =
          pricingType === PRICING_TYPE_PACKAGE ? quantity * price.amount : hours * price.amount;
        totalPrice = new Money(totalAmount, currencyUnit);
      }

      return (
        <Form onSubmit={handleSubmit} className={classes}>
          {updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditProgramListingPricingPanel.updateFailed" />
            </p>
          ) : null}
          {showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditProgramListingPricingPanel.showListingFailed" />
            </p>
          ) : null}
          <div>Pricing type</div>
          <FieldRadioButton
            label="Package"
            id={PRICING_TYPE_PACKAGE}
            name="pricingType"
            value={PRICING_TYPE_PACKAGE}
            validate={validators.required(pricingTypeRequiredMessage)}
          />
          <FieldRadioButton
            label="Hourly"
            id={PRICING_TYPE_HOURLY}
            name="pricingType"
            value={PRICING_TYPE_HOURLY}
            validate={required(pricingTypeRequiredMessage)}
          />

          {values.pricingType === 'hourly' && (
            <FieldTextInput
              id="hours"
              name="hours"
              className={css.hours}
              type="text"
              label="Hours"
              disabled
            />
          )}

          {values.pricingType === 'package' && (
            <FieldTextInput
              id="packageQuantity"
              name="packageQuantity"
              className={css.hours}
              type="number"
              label="Quantity"
              validate={required(quantityRequiredMessage)}
            />
          )}

          <FieldCurrencyInput
            id="price"
            name="price"
            className={css.priceInput}
            autoFocus
            label={pricePerUnitMessage}
            placeholder={pricePlaceholderMessage}
            currencyConfig={config.currencyConfig}
            validate={priceValidators}
          />

          <div>
            Total price: {totalPrice.amount / 100} {currencyUnit}
          </div>

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
    }}
  />
);

EditProgramListingPricingForm.defaultProps = { className: null, fetchErrors: null };

EditProgramListingPricingForm.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  categories: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(EditProgramListingPricingForm);
