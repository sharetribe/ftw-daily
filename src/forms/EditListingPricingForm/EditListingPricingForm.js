import React, {useEffect, useState} from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import {
  HOURLY_PRICE,
  DAILY_PRICE,
  WEEKLY_PRICE,
  MONTHLY_PRICE,
  propTypes,
  HOURLY_BOOKING,
  DAILY_BOOKING,
  WEEKLY_BOOKING,
  MONTHLY_BOOKING
} from '../../util/types';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { Button, Form, FieldCurrencyInput, FieldTextInput, FieldSelect } from '../../components';
import css from './EditListingPricingForm.module.css';
import {valueOf} from "lodash/seq";
import { getMainCurrency } from '../../util/moneyHelpers';

const { Money } = sdkTypes;

const hasSelectedPrice = values => {
  return [
    HOURLY_PRICE,
    DAILY_PRICE,
    WEEKLY_PRICE,
    MONTHLY_PRICE
  ].some(key => !!values[key]);
}

const daysInMonth = (month, year) => {
  let date1 = new Date(year, month-1, 1);
  let date2 = new Date(year, month, 1);
  return Math.round((date2 - date1) / 1000 / 3600 / 24);
}

const roundNumber = value => {
  let num = value.toString().split('.')
  if(!num[1]) return value
  else return +(num[0]+'.5')
}

export const EditListingPricingFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        disabled,
        form,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        fetchListingProgress,
        values,
        userPublicData,
      } = formRenderProps;

      // prices
      const pricePerHourLabel = intl.formatMessage({
        id: 'EditListingPricingForm.priceLabel',
      }, {
        currency: values.currency
      });
      const pricePlaceholder = intl.formatMessage({
        id: 'EditListingPricingForm.pricePlaceholder',
      });
      const priceRequired = validators.required(
        intl.formatMessage({
          id: 'EditListingPricingForm.priceRequired',
        })
      );
      const minPrice = new Money(config.listingMinimumPriceSubUnits, values.currency);
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


      const pricePerDayLabel = intl.formatMessage({
        id: 'EditListingPricingForm.pricePerDayLabel'
      }, {
        currency: values.currency
      });

      const pricePerWeekLabel = intl.formatMessage({
        id: 'EditListingPricingForm.pricePerWeekLabel',
      }, {
        currency: values.currency
      });

      const pricePerMonthLabel = intl.formatMessage({
        id: 'EditListingPricingForm.pricePerMonthLabel',
      }, {
        currency: values.currency
      });

      const discountRequired = (discount, value) => {
        const isRequired = discount && discount.amount
        const msg = intl.formatMessage({
          id: 'EditListingPricingForm.discountRequired',
        })

        if (isRequired && !value) return msg
        return undefined;
      };

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = !hasSelectedPrice(values) || invalid || disabled || submitInProgress || fetchListingProgress;
      // if user has currency field in publicData, he can not change currency field in another listings
      const disableCurrencyField = userPublicData && userPublicData.currency || !submitDisabled;
      const inputsDisabled = fetchListingProgress;
      const { updateListingError, showListingsError } = fetchErrors || {};

      const parsePercentage = value => {
        if (!value) return value
        const pattern = /^\d{0,2}(?:\.\d{1,2})?$/;
        const hasCorrectFormat = value.match(pattern);
        const floatValue = Number.parseFloat(value);
        const isInRange = 0 <= floatValue && floatValue <= maxStep;

        return hasCorrectFormat && isInRange
          ? (values.minBookingType !== HOURLY_BOOKING ? Math.round(value) : roundNumber(value))
          : hasCorrectFormat && floatValue < 0
          ? 0
          : hasCorrectFormat && floatValue > maxStep
          ? maxStep
          : value.substring(0, value.length - 1)
      };

        useEffect( () => {
          if( !values.minBookingType ) {
            setStep(null)
            setMaxStep(null)
            form.change('minBookingCount', null)
          }
          if ( values.minBookingType === HOURLY_BOOKING ) {
            setStep(0.5)
            setMaxStep(24)
            form.change('minBookingCount', 0.5)
          }
          if ( values.minBookingType === DAILY_BOOKING ) {
            setMaxStep(daysInMonth(new Date().getMonth(), new Date().getFullYear()))
            form.change('minBookingCount', 1)
          }
          if ( values.minBookingType === WEEKLY_BOOKING ) {
            setMaxStep(4)
            form.change('minBookingCount', 1)
          }
          if ( values.minBookingType === MONTHLY_BOOKING ) {
            setMaxStep(12)
            form.change('minBookingCount', 1)
          }
        }, [values.minBookingType])

        const [ step, setStep ] = useState(0.5)
        const [ maxStep, setMaxStep ] = useState(24)

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

          <FieldSelect
            id="currency"
            name="currency"
            className={classNames(css.priceInput)}
            disabled={disableCurrencyField}
            label={intl.formatMessage({ id: 'EditListingPricingForm.currency' })}
          >
            <option value='GBP' key='GBP'>{config.currency}</option>
            <option value='USD' key='USD'>{config.additionalCurrency}</option>
          </FieldSelect>

          <FieldCurrencyInput
            id={HOURLY_PRICE}
            name={HOURLY_PRICE}
            className={css.priceInput}
            label={pricePerHourLabel}
            placeholder={pricePlaceholder}
            currencyConfig={getMainCurrency(values.currency)}
            disabled={inputsDisabled}
          />

          <FieldCurrencyInput
            id={DAILY_PRICE}
            name={DAILY_PRICE}
            className={css.priceInput}
            label={pricePerDayLabel}
            placeholder={pricePlaceholder}
            disabled={inputsDisabled}
            currencyConfig={getMainCurrency(values.currency)}
          />

          <FieldCurrencyInput
            id={WEEKLY_PRICE}
            name={WEEKLY_PRICE}
            className={css.priceInput}
            label={pricePerWeekLabel}
            placeholder={pricePlaceholder}
            disabled={inputsDisabled}
            currencyConfig={getMainCurrency(values.currency)}
          />

          <FieldCurrencyInput
            id={MONTHLY_PRICE}
            name={MONTHLY_PRICE}
            className={css.priceInput}
            label={pricePerMonthLabel}
            placeholder={pricePlaceholder}
            disabled={inputsDisabled}
            currencyConfig={getMainCurrency(values.currency)}
          />

          <p className={css.labelMinBook}>
            <FormattedMessage id="EditListingPricingForm.infoTextMinBook" />
          </p>
          <div className={css.blockMiningBooking}>
            <FieldSelect
              id="minBookingType"
              name="minBookingType"
              className={classNames(css.priceInput, css.minBookInput)}
              // label={intl.formatMessage({ id: 'EditListingPricingForm.discountTypeMessage' })}
              // defaultValue={config.custom.discountTypes[0].key}
            >
              {/*<option value="" disabled> </option>*/}
              <option value=""> </option>
              {config.custom.discountTypes.map(({ key, label}) => (
                <option value={key} key={key}>{label}</option>
              ))}
            </FieldSelect>

            <FieldTextInput
              id="minBookingCount"
              name="minBookingCount"
              className={classNames(css.inputNumber, css.minBookInput)}
              type='number'
              // label={intl.formatMessage({ id: 'EditListingPricingForm.discountAmountMessage' })}
              defaultValue={step}
              min={step}
              max={maxStep}
              step={step}
              parse={parsePercentage}
            />
          </div>


          {/* <h3>{intl.formatMessage({ id: 'EditListingPricingForm.discountHeader' })}</h3>
          <p className={css.discountDescription}>{intl.formatMessage({ id: 'EditListingPricingForm.discountSubHeader' })}</p> */}

          {/* <div className={css.discountContainer}>
            <FieldTextInput
              id="discount.amount"
              name="discount.amount"
              className={classNames(css.priceInput, css.inputNumber)}
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
              id="discount.type"
              name="discount.type"
              className={css.priceInput}
              label={intl.formatMessage({ id: 'EditListingPricingForm.discountTypeMessage' })}
            >
              <option value="" disabled>-</option>
              {config.custom.discountTypes.map(({key, label}) => (
                <option value={key}>{label}</option>
              ))}
            </FieldSelect>
          </div> */}

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
  unitType: string,
};

export default compose(injectIntl)(EditListingPricingFormComponent);
