import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import config from '../../config';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { Button, Form, FieldCurrencyInput } from '../../components';
import css from './EditListingPricingForm.css';
import marketPlaceCss from './../../marketplace.css';

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
      } = fieldRenderProps;

      const unitType = config.bookingUnitType;
      const isNightly = unitType === LINE_ITEM_NIGHT;
      const isDaily = unitType === LINE_ITEM_DAY;

      const translationKey = isNightly
        ? 'EditListingPricingForm.pricePerNight'
        : isDaily
        ? 'EditListingPricingForm.pricePerDay'
        : 'EditListingPricingForm.pricePerUnit';

      const pricePerMorningAdult = intl.formatMessage({ id: 'EditListingPricingForm.pricePerMorningAdult' });
      const pricePerAfternoonAdult = intl.formatMessage({ id: 'EditListingPricingForm.pricePerAfternoonAdult' });
      const pricePerDayAdult = intl.formatMessage({ id: 'EditListingPricingForm.pricePerDayAdult' });
      const pricePerMorningChild = intl.formatMessage({ id: 'EditListingPricingForm.pricePerMorningChild' });
      const pricePerAfternoonChild = intl.formatMessage({ id: 'EditListingPricingForm.pricePerAfternoonChild' });
      const pricePerDayChild = intl.formatMessage({ id: 'EditListingPricingForm.pricePerDayChild' });

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
          <div className={css.fieldsRow}>
            <FieldCurrencyInput
              id="priceDayAdult"
              name="priceDayAdult"
              className={css.field}
              label={pricePerDayAdult}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              validate={priceValidators}
            />
            <FieldCurrencyInput
              id="priceDayChild"
              name="priceDayChild"
              className={css.field}
              label={pricePerDayChild}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              validate={priceValidators}
            />
          </div>

          <div className={css.fieldsRow}>
            <FieldCurrencyInput
              id="priceAfternoonAdult"
              name="priceAfternoonAdult"
              className={css.field}
              label={pricePerAfternoonAdult}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              validate={priceValidators}
            />
            <FieldCurrencyInput
              id="priceAfternoonChild"
              name="priceAfternoonChild"
              className={css.field}
              label={pricePerAfternoonChild}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              validate={priceValidators}
            />
          </div>

          <div className={css.fieldsRow}>
            <FieldCurrencyInput
              id="priceMorningAdult"
              name="priceMorningAdult"
              className={css.field}
              label={pricePerMorningAdult}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              validate={priceValidators}
            />
            <FieldCurrencyInput
              id="priceMorningChild"
              name="priceMorningChild"
              className={css.field}
              label={pricePerMorningChild}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              validate={priceValidators}
            />
          </div>
          <div className={marketPlaceCss.alignRight}>
            <Button
              className={css.submitButton}
              type="submit"
              inProgress={submitInProgress}
              disabled={submitDisabled}
              ready={submitReady}
            >
              {saveActionMsg}
            </Button>
          </div>
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
