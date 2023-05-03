import React, { useState } from 'react';
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

} from '../../components';
import css from './EditListingPricingForm.module.css';
import Slider from 'rc-slider';
import './slider.css';
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
        ? validators.composeValidators(priceRequired, minPriceRequired, pricePerUnitMessage)
        : priceRequired;
      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress || !values.discount
      const { updateListingError, showListingsError } = fetchErrors || {};
      const discount = findOptionsForSelectFilter('discount', filterConfig);
      const detail = listing?.attributes?.publicData?.serviceSetup;
      const numberPet = listing?.attributes?.publicData?.numberOfPets;
      const numberPetArray = numberPet && numberPet == "three" ? [1, 2, 3]
        : numberPet == "two" ? [1, 2] : [1];
      //console.log(values,"values");
      const [stayRange, setStayRange] = useState([7, 90]);
      const [discountRange, setDiscountRange] = useState([1, 50]);

      const handlePriceChange = (value) => {
        setStayRange(value);
      };
      const handleDiscountChange = (value) => {
        setDiscountRange(value);
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
          {detail && detail.includes("overnightsStay") ? <>  <FormattedMessage id="EditListingPricingForm.priceovernight" />
            <div style={{ display: 'flex', gap: '20px' }}>
              {numberPetArray.map((st) =>
                <FieldTextInput
                  id={"overnightsStayPrice" + st}
                  name={"overnightsStayPrice" + st}
                  className={css.priceInput}
                  autoFocus
                  type="number"
                  label={st + "    Pet"}
                  placeholder={pricePlaceholderMessage}
                  //currencyConfig={config.currencyConfig}

                  validate={priceValidators}

                />)}
            </div>
          </>
            : null}
          {detail && detail.includes("dayCareStay") ? <>
            <FormattedMessage id="EditListingPricingForm.priceday" />

            <div style={{ display: 'flex', gap: '20px' }}>
              {numberPetArray.map((st) =>
                <FieldTextInput
                  id={"dayCareStay" + st}
                  name={"dayCareStay" + st}
                  className={css.priceInput}
                  type="Number"
                  autoFocus
                  label={st + "    Pet"}
                  placeholder={pricePlaceholderMessage}
                  //currencyConfig={config.currencyConfig}
                  validate={priceValidators}
                />)}
            </div>
          </>
            : null}
          <FormattedMessage id="EditListingPricingForm.pricediscount" />

          <div style={{ display: 'flex', gap: '20px' }}>
            {discount.map(num => {
              return (
                <div className={css.cardSelectPet}>
                  <FieldRadioButtonComponent
                    className={css.features}
                    id={num.key}
                    name={'discount'}
                    value={num.key}
                    label={num.label}
                  />
                </div>
              );
            })}
          </div>
          {values && values.discount == 'dis_yes' ? (
            <>
              <div>
                {/* <FieldTextInput
                  type="number"
                  id="lengthOfStays"
                  name="lengthOfStays"
                validate={composeValidators(maxLength2Message)} /> */}
                <div className={css.rangeBox}>
                  <p>$ to days</p>
                  <Slider
                    min={7}
                    max={90}
                    id="lengthOfStays"
                    name="lengthOfStays"
                    range
                    defaultValue={stayRange}
                    onChange={handlePriceChange}
                    validate={composeValidators(maxLength2Message)}
                  />
                  <div> ${stayRange[0]} - ${stayRange[1]}</div>
                </div>
              </div>
              <div className={css.rangeBox}>
                <p>Discount</p>
                {/* <FieldTextInput
                  type="number"
                  id="discountlengthOfStays"
                  name="discountlengthOfStays"
                  validate={composeValidators(maxLength2Message)}
                /> */}
                <Slider
                  min={0}
                  max={50}
                  range
                  id="discountlengthOfStays"
                  name="discountlengthOfStays"
                  validate={composeValidators(maxLength2Message)}
                  defaultValue={discountRange}
                  onChange={handleDiscountChange}
                />
                <div> {discountRange[0]}% - {discountRange[1]}%</div>
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





