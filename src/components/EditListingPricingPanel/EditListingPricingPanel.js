import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import {
  DAILY_PRICE,
  WEEKLY_PRICE,
  MONTHLY_PRICE,
  LINE_ITEM_DAY,
  LINE_ITEM_UNITS,
  HOURLY_DISCOUNT,
  DAILY_DISCOUNT,
  LISTING_STATE_DRAFT
} from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingPricingForm } from '../../forms';
import { ensureOwnListing } from '../../util/data';
import { types as sdkTypes } from '../../util/sdkLoader';
import config from '../../config';
import {
  createDefaultPlan
} from '../../util/data';

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
    fetchListingProgress
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { price, publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingPricingPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingPricingPanel.createListingTitle" />
  );

  const initialPrices = listing => {
    const {publicData, price} = listing && listing.attributes || {};

    if (!publicData){
      return null;
    }

    //for support old listings types
    if (publicData.unitType && publicData.unitType === LINE_ITEM_DAY){
      return {
        price: null,
        [DAILY_PRICE]: price
      }
    }

    return {
      price,
      ...([DAILY_PRICE, WEEKLY_PRICE, MONTHLY_PRICE].reduce((acc, p) => {
        if (!publicData[p]){
          return acc;
        }

        const {amount, currency} = publicData[p];

        return {
          ...acc,
          [p]: new Money(amount, currency)
        }
      }, {}))
    }
  }

  const initialDiscounts = listing => {
    const {publicData = {}} = listing && listing.attributes || {};
    const {discount = {}} = publicData;

    return {discount: {
      type: publicData[LINE_ITEM_DAY] ? DAILY_DISCOUNT : HOURLY_DISCOUNT,
      ...discount
    }}
  }

  const initialValues = {
    price,
    ...initialDiscounts(listing),
    ...initialPrices(listing)
  };

  const managePrices = values => {
    return [DAILY_PRICE, WEEKLY_PRICE, MONTHLY_PRICE].reduce((acc, p) => {
      const {amount, currency} = values[p] || {};

      return {
        ...acc,
        [p]: amount ? {amount, currency} : null,
        [`${p}Filter`]: amount ? amount/100 : null
      }
    }, {});
  }

  const updateAvailabilityMaybe = values => {
    return (values[WEEKLY_PRICE] && !initialValues[WEEKLY_PRICE]) ||
           (values[MONTHLY_PRICE] && !initialValues[MONTHLY_PRICE])
  }

  const priceCurrencyValid = price instanceof Money ? price.currency === config.currency : true;

  const form = priceCurrencyValid ? (
    <EditListingPricingForm
      className={css.form}
      initialValues={initialValues}
      // unitType={publicData.unitType}
      fetchListingProgress={fetchListingProgress}
      onSubmit={values => {
        const { price, discount } = values;

        onSubmit({
          price,
          publicData: {
            unitType: null, //remove unittype field from previous realisation
            discount,
            ...managePrices(values)
          },
          ...(updateAvailabilityMaybe(values) ? {availabilityPlan: createDefaultPlan(publicData.seats || 1, true)} : {}),
        });
      }}
      onChange={onChange}
      saveActionMsg={submitButtonText}
      disabled={disabled}
      ready={ready}
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
      <p className={css.subTitle}>
        <FormattedMessage id="EditListingPricingPanel.createListingSubTitle" />
      </p>
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
