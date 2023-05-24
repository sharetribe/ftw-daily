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
  const { price, publicData = {} } = currentListing.attributes;

  // day price
  const dayCareStay1 = publicData && publicData.pricepet && publicData.pricepet.dayCare && publicData.pricepet.dayCare.dayCareStay1 || "";
  const dayCareStay2 = publicData && publicData.pricepet && publicData.pricepet.dayCare && publicData.pricepet.dayCare.dayCareStay2 || "";
  const dayCareStay3 = publicData && publicData.pricepet && publicData.pricepet.dayCare && publicData.pricepet.dayCare.dayCareStay3 || "";

  //price for OverNight Stay
  const overnightsStayPrice1 = publicData && publicData.pricepet && publicData.pricepet.overNight && publicData.pricepet.overNight.overnightsStayPrice1 || "";
  const overnightsStayPrice2 = publicData && publicData.pricepet && publicData.pricepet.overNight && publicData.pricepet.overNight.overnightsStayPrice2 || "";
  const overnightsStayPrice3 = publicData && publicData.pricepet && publicData.pricepet.overNight && publicData.pricepet.overNight.overnightsStayPrice3 || "";

  const discount = publicData && publicData.discount
  const discountlengthOfStays = publicData && publicData.discountlengthOfStays
  const lengthOfStays = publicData && publicData.lengthOfStays
  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;

  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingPricingPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingPricingPanel.createListingTitle" />
  );
  const updateValues1 =(e) => {
    console.log(e,'setData');
            }

  const priceCurrencyValid = price instanceof Money ? price.currency === config.currency : true;
  const form = priceCurrencyValid ? (
    <EditListingPricingForm
      className={css.form}
      initialValues={{ overnightsStayPrice1, overnightsStayPrice2, overnightsStayPrice3, dayCareStay1, dayCareStay2, dayCareStay3, discount, discountlengthOfStays, lengthOfStays }}
      onSubmit={values => {
       
        const { overnightsStayPrice1, overnightsStayPrice2, overnightsStayPrice3, dayCareStay1, dayCareStay2, dayCareStay3, discount, discountlengthOfStays, lengthOfStays } = values;

        function findMinPrice(var_args) {
          return Array.prototype.reduce.call(arguments, function (prev, current) {
            return prev && current ? Math.min(prev, current) : prev || current;
          });
        }
        const min1 = findMinPrice(overnightsStayPrice1, overnightsStayPrice2, overnightsStayPrice3, dayCareStay1, dayCareStay2, dayCareStay3)
        const min = min1 * 100

        const updateValues = {
          price: new Money(min, config.currency),
          publicData: {
            pricepet: {
              dayCare: {
                dayCareStay1: dayCareStay1 || 0,
                dayCareStay2: dayCareStay2 || 0,
                dayCareStay3: dayCareStay3 || 0,
              },
              overNight: {
                overnightsStayPrice1: overnightsStayPrice1 || 0,
                overnightsStayPrice2: overnightsStayPrice2 || 0,
                overnightsStayPrice3: overnightsStayPrice3 || 0,
              }
            },
            discount,
            discountlengthOfStays,
            lengthOfStays
          },
        };
       

        onSubmit(updateValues);
      }}
      onChange={onChange}
      saveActionMsg={submitButtonText}
      disabled={disabled}
      ready={ready}
      listing={listing}
      publicData={publicData}
      lengthOfStays={lengthOfStays}
      discountlengthOfStays={discountlengthOfStays}
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