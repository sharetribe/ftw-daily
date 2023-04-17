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
        updateInProgress,
        fetchErrors,
      } = formRenderProps;
      className;

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
      const submitDisabled = invalid || disabled || submitInProgress || !values.price;
      const { updateListingError, showListingsError } = fetchErrors || {};
      //const dohavepets = findOptionsForSelectFilter('dohavepets', filterConfig);
      const detail = listing?.attributes?.publicData?.serviceSetup
      console.log('detail', detail)
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
        
       
         <p>{detail == "overnightsStay"? "overnightsStay":null}</p>
           {detail == "overnightsStay" ?
           
                              <FieldSelect
                                id="industries"
                                name="industries"
                              >
                                <option disabled value="">
                                  Choose the number of pets
                                </option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                              </FieldSelect>:null} 

          <p>{detail == "dayCareStay"? "dayCareStay":null}</p>
          {detail == "dayCareStay" ?
                              <FieldSelect
                                id="industries"
                                name="industries"
                              >
                                <option disabled value="">
                                  Choose the number of pets
                                </option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                              </FieldSelect>:null}
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

          
          </div>

       
        

          <p>Would you like to provide discount rate longer 7 days</p>
          <div style={{ display: 'flex', gap: '20px' }}>
          {/* {
            dohavepets.map((num)=>{
              return(
               <FieldRadioButtonComponent className={css.features} id={num.key} name={"dohavepets"} value={num.key} label={num.label}/>
              )
            })
          } */}
          </div>

          <div>
            <p>Length of Stays</p>
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
