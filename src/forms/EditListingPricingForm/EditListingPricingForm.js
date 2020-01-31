import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { Button, Form, FieldCurrencyInput, FieldTextInput, FieldSelect } from '../../components';
import css from './EditListingPricingForm.css';

const { Money } = sdkTypes;

export const EditListingPricingFormComponent = props => (
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
        values: {
          discount
        }
      } = formRenderProps;

      const unitType = config.bookingUnitType;
      const isNightly = unitType === LINE_ITEM_NIGHT;
      const isDaily = unitType === LINE_ITEM_DAY;

      const translationKey = isNightly
        ? 'EditListingPricingForm.pricePerNight'
        : isDaily
        ? 'EditListingPricingForm.pricePerDay'
        : 'EditListingPricingForm.pricePerUnit';

      const pricePerUnitMessage = intl.formatMessage({
        id: translationKey,
      });

      const pricePlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder',
      });

      const discountRequired = (discount, value) => {
        const isRequired = discount && discount.amount
        const msg = intl.formatMessage({
          id: 'EditListingPricingForm.discountRequired',
        })

        if (isRequired && !value) return msg
        return undefined;
      };


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

      const parsePercentage = value => {
        if (!value) {
          return value;
        }

        const pattern = /^\d{0,3}(?:\.\d{1,2})?$/;
        const hasCorrectFormat = value.match(pattern);
        const floatValue = Number.parseFloat(value);
        const isInRange = 0 <= floatValue && floatValue <= 100;

        return hasCorrectFormat && isInRange
          ? value
          : hasCorrectFormat && floatValue < 0
          ? 0
          : hasCorrectFormat && floatValue > 100
          ? 100
          : value.substring(0, value.length - 1);
      };

      return (
        <Form onSubmit={handleSubmit} className={classes}>
          {updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.updateFailed" />
            </p>
          ) : null}
          {showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.showListingFailed" />
            </p>
          ) : null}
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

          <h3>{intl.formatMessage({ id: 'EditListingPricingForm.discountHeader' })}</h3>
          <p className={css.discountDescription}>{intl.formatMessage({ id: 'EditListingPricingForm.discountSubHeader' })}</p>

          <div className={css.discountContainer}>
            <FieldTextInput
              id="discount.amount"
              name="discount.amount"
              className={css.priceInput}
              label={intl.formatMessage({ id: 'EditListingPricingForm.discountAmountMessage' })}
              placeholder={intl.formatMessage({ id: 'EditListingPricingForm.discountAmountPlaceholder' })}
              type='number'
              min={0}
              max={100}
              step="0.01"
              parse={parsePercentage}
            />

            <FieldTextInput
              id="discount.breakpoint"
              name="discount.breakpoint"
              className={css.priceInput}
              label={intl.formatMessage({ id: 'EditListingPricingForm.discountBreakpointMessage' })}
              placeholder={intl.formatMessage({ id: 'EditListingPricingForm.discountBreakpointPlaceholder' })}
              type='number'
              min='1'
              validate={value => discountRequired(discount, value)}
            />

            <FieldSelect
              id="discount.unitType"
              name="discount.unitType"
              label={intl.formatMessage({ id: 'EditListingPricingForm.discountUnitTypeMessage' })}
              validate={value => discountRequired(discount, value)}
            >
              <option value=""></option>
              <option value="weeks">Weeks</option>
              <option value="days">Days</option>
              <option value="hours">Hours</option>
            </FieldSelect>
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

EditListingPricingFormComponent.defaultProps = { fetchErrors: null };

EditListingPricingFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingPricingFormComponent);
