import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingPricingForm } from '../../forms';
import { ensureOwnListing } from '../../util/data';
import { types as sdkTypes } from '../../util/sdkLoader';
import config from '../../config';

import css from './EditListingPricingPanel.module.css';

const { Money } = sdkTypes;

const EditListingPricingPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { price ,publicData={}} = currentListing.attributes;
  
  // day price

  const dayCareStay1 = publicData && publicData.pricepet && publicData.pricepet.dayCare && publicData.pricepet.dayCare.dayCareStay1 || "" ;
  const dayCareStay2= publicData && publicData.pricepet && publicData.pricepet.dayCare && publicData.pricepet.dayCare.dayCareStay2 || "" ;
  const dayCareStay3= publicData && publicData.pricepet && publicData.pricepet.dayCare && publicData.pricepet.dayCare.dayCareStay3 || "" ;

  //price for OverNight Stay

  const overnightsStayPrice1= publicData && publicData.pricepet && publicData.pricepet.overNight && publicData.pricepet.overNight.overnightsStayPrice1 || "";
  const overnightsStayPrice2= publicData && publicData.pricepet && publicData.pricepet.overNight && publicData.pricepet.overNight.overnightsStayPrice2 || "";
  const overnightsStayPrice3= publicData && publicData.pricepet && publicData.pricepet.overNight && publicData.pricepet.overNight.overnightsStayPrice3 || "";

  const discount = publicData && publicData.discount
  const discountlengthOfStays =publicData && publicData.discountlengthOfStays
  const lengthOfStays = publicData && publicData.lengthOfStays
  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;

  const prices = []
 const price1 = Number(overnightsStayPrice1)
 const price2 = Number(overnightsStayPrice2 )
const price3 = Number(overnightsStayPrice3 )
const price4 = Number(dayCareStay1)
const price5 = Number(dayCareStay2)
const price6 = Number(dayCareStay3)
console.log('price1', price1)
// prices.push(price1,price2,price3,price4,price5,price6)
const prices1 = [price1, price2, price3, price4, price5, price6];
const filteredPrices = prices1.filter(price => price > 0);
const min = Math.min(...filteredPrices);
console.log('min', min);

console.log('filteredPrices', filteredPrices)

//const min =  Math.min(...prices)

 //Check if price values are greater than 0, and push them into the prices array

// Calculate the minimum value from the prices array
//const min = Math.min(...prices);
// Output the minimum value
//console.log('min', min);






  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingPricingPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingPricingPanel.createListingTitle" />
  );

  const priceCurrencyValid = price instanceof Money ? price.currency === config.currency : true;
  const form = priceCurrencyValid ? (
    <EditListingPricingForm
      className={css.form}
       initialValues={{price, overnightsStayPrice1, overnightsStayPrice2, overnightsStayPrice3, dayCareStay1,dayCareStay2,dayCareStay3,discount,discountlengthOfStays,lengthOfStays}}
      onSubmit={values => {
        const { price, overnightsStayPrice1, overnightsStayPrice2, overnightsStayPrice3, dayCareStay1,dayCareStay2,dayCareStay3,discount, discountlengthOfStays,lengthOfStays} = values;
        const updateValues = {
          price:new Money(min, config.currency),
          publicData: {
            pricepet: {
             dayCare:{
              dayCareStay1 :dayCareStay1 || "",
              dayCareStay2 :dayCareStay2 || "", 
              dayCareStay3:dayCareStay3 || "",
             },
             overNight:{
              overnightsStayPrice1:overnightsStayPrice1 || "", 
              overnightsStayPrice2:overnightsStayPrice2 || "",
              overnightsStayPrice3:overnightsStayPrice3 || "",
             }
            },
            discount,
            discountlengthOfStays,
            lengthOfStays
          },
         };

        onSubmit(updateValues);
        console.log('updateValues', updateValues)
      }}
      onChange={onChange}
      saveActionMsg={submitButtonText}
      disabled={disabled}
      ready={ready}
      listing={listing}
      publicData={publicData}
      updated={panelUpdated}
      updateInProgress={updateInProgress}
      fetchErrors={errors}
    />
  ) : (
    <div className={css.priceCurrencyInvalid}>
      <FormattedMessage id="EditListingPricingPanel.listingPriceCurrencyInvalid" />
    </div>
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      {form}
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingPricingPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingPricingPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingPricingPanel;
