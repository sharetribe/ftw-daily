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
import { findOptionsForSelectFilter } from '../../util/search';
import { types as sdkTypes } from '../../util/sdkLoader';
import FieldRadioButtonComponent from '../../components/FieldRadioButton/FieldRadioButton';
import {
  Button,
  Form,
  FieldCurrencyInput,
  FieldRadioButton,
  FieldDateRangeInput,
  FieldDateInput,
  FieldTextInput,
  FieldSelect,
} from '../../components';
import css from './EditListingPricingForm.module.css';

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
        listing,
        saveActionMsg,
        updated,
        publicData,
        values,
        filterConfig,
        updateInProgress,
        fetchErrors,
      } = formRenderProps;
      className;
      console.log('values', values)

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
      const submitDisabled = invalid || disabled || submitInProgress 
      const { updateListingError, showListingsError } = fetchErrors || {};
      const discount = findOptionsForSelectFilter('discount', filterConfig);
      const detail = listing?.attributes?.publicData?.serviceSetup;
      //console.log('detail', detail);

      const numberPet = listing?.attributes?.publicData?.numberOfPets;
console.log('numberPet', numberPet)
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
          { detail && detail.filter(st => st == 'overnightsStay').length && detail && detail.filter(st => st == 'dayCareStay').length ? (
            <div>
              <div>
                <p>Price for overnightsStay</p>
                {numberPet == "two" ? <>
              
              <FieldCurrencyInput
                id="price"
                name="price"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
              <FieldCurrencyInput
                id="price"
                name="price"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
              
              </>: numberPet == "one" ?
              <>
              
              <FieldCurrencyInput
                id="price"
                name="price"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
              
              </>
            : numberPet == "three" ? 
            <>
              
            <FieldCurrencyInput
              id="price"
              name="price"
              className={css.priceInput}
              autoFocus
              label={pricePerUnitMessage}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              // validate={priceValidators}
            />
            <FieldCurrencyInput
              id="price"
              name="price"
              className={css.priceInput}
              autoFocus
              label={pricePerUnitMessage}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              // validate={priceValidators}
            />
            <FieldCurrencyInput
              id="price"
              name="price"
              className={css.priceInput}
              autoFocus
              label={pricePerUnitMessage}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              // validate={priceValidators}
            />
            
            </>
         :null }
              </div>
              <div>
                <p>Price for dayStay</p>
                {numberPet == "two" ? <>
              
              <FieldCurrencyInput
                id="price"
                name="price"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
              <FieldCurrencyInput
                id="price"
                name="price"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
              
              </>: numberPet == "one" ?
              <>
              
              <FieldCurrencyInput
                id="price"
                name="price"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
              
              </>
            : numberPet == "three" ? 
            <>
              
            <FieldCurrencyInput
              id="price"
              name="price"
              className={css.priceInput}
              autoFocus
              label={pricePerUnitMessage}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              // validate={priceValidators}
            />
            <FieldCurrencyInput
              id="price"
              name="price"
              className={css.priceInput}
              autoFocus
              label={pricePerUnitMessage}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              // validate={priceValidators}
            />
            <FieldCurrencyInput
              id="price"
              name="price"
              className={css.priceInput}
              autoFocus
              label={pricePerUnitMessage}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              // validate={priceValidators}
            />
            
            </>
         :null }
              </div>
            </div>
          ) : detail && detail.filter(st => st == 'dayCareStay').length ? (
            <div>
              <p>Price for DayStay</p>
              {numberPet == "two" ? <>
              
              <FieldCurrencyInput
                id="price1"
                name="price1"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
              <FieldCurrencyInput
                id="price2"
                name="price2"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
              
              </>: numberPet == "one" ?
              <>
              
              <FieldCurrencyInput
                id="price1"
                name="price1"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
              
              </>
            : numberPet == "three" ? 
            <>
              
            <FieldCurrencyInput
              id="price1"
              name="price1"
              className={css.priceInput}
              autoFocus
              label={pricePerUnitMessage}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              // validate={priceValidators}
            />
            <FieldCurrencyInput
              id="price2"
              name="price2"
              className={css.priceInput}
              autoFocus
              label={pricePerUnitMessage}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              // validate={priceValidators}
            />
            <FieldCurrencyInput
              id="price3"
              name="price3"
              className={css.priceInput}
              autoFocus
              label={pricePerUnitMessage}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              // validate={priceValidators}
            />
            
            </>
         :null }
            </div>
          ) : detail && detail.filter(st => st == 'overnightsStay').length ? (
            <>
              <p>Price for overnightsStay</p>

              {numberPet == "two" ? <>
              
              <FieldCurrencyInput
                id="price1"
                name="price1"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
              <FieldCurrencyInput
                id="price2"
                name="price2"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
              
              </>: numberPet == "one" ?
              <>
              
              <FieldCurrencyInput
                id="price1"
                name="price1"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
              
              </>
            : numberPet == "three" ? 
            <>
              
            <FieldCurrencyInput
              id="price1"
              name="price12"
              className={css.priceInput}
              autoFocus
              label={pricePerUnitMessage}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              // validate={priceValidators}
            />
            <FieldCurrencyInput
              id="price2"
              name="price2"
              className={css.priceInput}
              autoFocus
              label={pricePerUnitMessage}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              // validate={priceValidators}
            />
            <FieldCurrencyInput
              id="price3"
              name="price3"
              className={css.priceInput}
              autoFocus
              label={pricePerUnitMessage}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              // validate={priceValidators}
            />
            
            </>
         :null }
              
            </>
          ) : null}
          {/* <div>
              <p>Price for overnightsStay</p>
             
                 
              <div style={{ display: 'flex', gap: '10px' }}>
              <FieldCurrencyInput
                id="price"
                name="price"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
              <FieldCurrencyInput
                id="price"
                name="price"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
              <FieldCurrencyInput
                id="price"
                name="price"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
            </div>
              
            </div> */}

          {/* <p>{detail == 'overnightsStay' ? 'overnightsStay' : null}</p>
          {detail == 'overnightsStay' ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <FieldCurrencyInput
                id="price"
                name="price"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
              <FieldCurrencyInput
                id="price"
                name="price"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
              <FieldCurrencyInput
                id="price"
                name="price"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
            </div>
          ) :  <FieldSelect
             id="numberOfpets"
            name="numberOfpets"
           >
            <option disabled value="">
             Choose the number of pets
           </option>
            <option>1</option>
           <option>2</option>
            <option>3</option>
          </FieldSelect>
          null}

          <p>{detail == 'dayCareStay' ? 'dayCareStay' : null}</p>

          {detail == 'dayCareStay' ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <FieldCurrencyInput
                id="price"
                name="price"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
              <FieldCurrencyInput
                id="price"
                name="price"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
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
            </div>
          ) :  <FieldSelect
             id="numberOfpets"
             name="numberOfpets"
           >
            <option disabled value="">
              Choose the number of pets
           </option>
            <option>1</option>
            <option>2</option>
             <option>3</option>
           </FieldSelect>

          null} */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {values && values.numberOfpets ? (
              <FieldCurrencyInput
                id="price"
                name="price"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                // validate={priceValidators}
              />
            ) : null}
          </div>

          <p>Would you like to provide discount rate longer 7 days</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {discount.map(num => {
              return (
                <FieldRadioButtonComponent
                  className={css.features}
                  id={num.key}
                  name={'discount'}
                  value={num.key}
                  label={num.label}
                />
              );
            })}
          </div>
          {values && values.discount == 'dis_yes' ? (
            <>
              <div>
                <p>Length of Stays</p>
                <FieldTextInput type="number" id="lengthOfStays" name="lengthOfStays" />
              </div>
              <div>
                <p>Discount</p>
                <FieldTextInput
                  type="number"
                  id="discountlengthOfStays"
                  name="discountlengthOfStays"
                />
              </div>
            </>
          ) : null}
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

EditListingPricingFormComponent.defaultProps = {
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

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
  filterConfig: propTypes.filterConfig,
};

export default compose(injectIntl)(EditListingPricingFormComponent);
