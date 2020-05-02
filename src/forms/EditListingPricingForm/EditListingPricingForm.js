import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import config from '../../config';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, LINE_ITEM_HOUR, propTypes } from '../../util/types';



import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { Button, Form, FieldCurrencyInput, CategoryField, FieldSelect } from '../../components';
import css from './EditListingPricingForm.css';

const { Money } = sdkTypes;

export const EditListingPricingFormComponent = props => (
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
        user_type,
        rate,
      } = fieldRenderProps;

      const unitType = config.bookingUnitType;
      const isNightly = unitType === LINE_ITEM_NIGHT;
      const isDaily = unitType === LINE_ITEM_DAY;
      const isHourly = unitType === LINE_ITEM_HOUR;

      const translationKey = isHourly
        ? 'EditListingPricingForm.pricePerHour'
        : isNightly
          ? 'EditListingPricingForm.pricePerNight'
          : isDaily
            ? 'EditListingPricingForm.pricePerDay'
            : 'EditListingPricingForm.pricePerUnit';

      const msg_key = user_type === 1 ? 'EditListingPricingForm.pricePerNight' : 'EditListingPricingForm.pricePerHour';
      const pricePerUnitMessage = intl.formatMessage({
        id: msg_key,
      });

      const pricePlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder',
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
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      const { updateListingError, showListingsError } = fetchErrors || {};

      const categoryRateLabel = intl.formatMessage({
        id: 'EditListingPricingForm.category.rate.label',
        // values: {animal},
      });
      const categoryRatePlaceholder = intl.formatMessage({
        id: 'EditListingPricingForm.category.rate.placeholder',
        // values: {animal},
      });
      const categoryRateRequired = validators.required(
        intl.formatMessage({
          id: 'EditListingPricingForm.category.rate.required',
          // values: {animal},
        })
      );

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

          {user_type === 2 ? (
            <CategoryField
              id="rate"
              name="rate"
              className={css.category}
              categories={rate}
              intl={intl}
              categoryLabel={categoryRateLabel}
              categoryPlaceholder={categoryRatePlaceholder}
              categoryRequired={categoryRateRequired}
            />
          ) : null
          }

          <FieldSelect id="currency" name="currency" label="Select Currency" className={css.currency}>
            <option value="GBP">GBP</option>
            <option value="USD">USD</option>
            <option value="PEN">PEN</option>
          </FieldSelect>

          <FieldCurrencyInput
            id="price"
            name="price"
            className={css.priceInput}
            autoFocus
            label={pricePerUnitMessage}
            placeholder={pricePlaceholderMessage}
            currencyConfig={{ ...config.currencyConfig, currency: fieldRenderProps.values.currency }}
            validate={priceValidators}
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
    }}
  />
);

EditListingPricingFormComponent.defaultProps = { fetchErrors: null };

EditListingPricingFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingPricingFormComponent);
