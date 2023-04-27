import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { maxLength, required, composeValidators, } from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { findOptionsForSelectFilter } from '../../util/search';
import { types as sdkTypes } from '../../util/sdkLoader';
import FieldRadioButtonComponent from '../../components/FieldRadioButton/FieldRadioButton';
import {
  Button,
  Form,
  
  FieldTextInput,
  FieldCurrencyInput,
  
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
      console.log('values', values)

      const unitType = config.bookingUnitType;
      const isNightly = unitType === LINE_ITEM_NIGHT;
      const isDaily = unitType === LINE_ITEM_DAY;

      const translationKey = isNightly
        ? 'EditListingPricingForm.pricePerNight'
        : isDaily
          ? 'EditListingPricingForm.pricePerDay'
          : 'EditListingPricingForm.pricePerUnit';

          const TITLE_MAX_LENGTH = 2;

        //  const maxLength2Message = maxLength( TITLE_MAX_LENGTH);
        const maxLengthMessage = intl.formatMessage(
          { id: 'EditListingDescriptionForm.maxLength' },
          {
            maxLength: TITLE_MAX_LENGTH,
          }
        );
          const maxLength2Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
          // maxLength: TITLE_MAX_LENGTH,
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
        ? validators.composeValidators(priceRequired, minPriceRequired,pricePerUnitMessage)
        : priceRequired;
      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready ;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress|| !values.discount
      const { updateListingError, showListingsError } = fetchErrors || {};
      const discount = findOptionsForSelectFilter('discount', filterConfig);
      const detail = listing?.attributes?.publicData?.serviceSetup;
      const numberPet = listing?.attributes?.publicData?.numberOfPets;
      const numberPetArray = numberPet && numberPet == "three" ? [1, 2, 3]
        : numberPet == "two" ? [1, 2] : [1];
  //console.log(values,"values");


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
          {detail && detail.includes("overnightsStay") ? <> <p>Price for overnightsStay</p>
            <div style={{ display: 'flex', gap: '20px' }}>
             {numberPetArray.map((st)=> 
               <FieldCurrencyInput
                id={"overnightsStayPrice"+st}
                name={"overnightsStayPrice"+st}
                className={css.priceInput}
                autoFocus
                label={st+  "    Pet"}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
            
                validate={priceValidators}
              />) }
            </div>
          </>
            : null}
          {detail && detail.includes("dayCareStay") ? <>
            <p>Price for dayStay</p>
            <div style={{ display: 'flex', gap: '20px' }}>
            {numberPetArray.map((st)=> 
               <FieldCurrencyInput
                id={"dayCareStay"+st}
                name={"dayCareStay"+st}
                className={css.priceInput}
                autoFocus
                label={"Pet"+st}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                validate={priceValidators}
              />) }
            </div>
          </>
            : null}
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
                <FieldTextInput type="number" id="lengthOfStays" name="lengthOfStays" 
                  validate={composeValidators( maxLength2Message)}/>
              </div>
              <div>
                <p>Discount</p>
                <FieldTextInput
                  type="number"
                  id="discountlengthOfStays"
                  name="discountlengthOfStays"
                  validate={composeValidators( maxLength2Message)}
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
