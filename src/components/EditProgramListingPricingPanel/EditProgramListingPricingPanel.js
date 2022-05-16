import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '..';
import { EditProgramListingPricingForm } from '../../forms';
import config from '../../config';
import { types as sdkTypes } from '../../util/sdkLoader';

import css from './EditProgramListingPricingPanel.module.css';
const { Money } = sdkTypes;

const PRICING_TYPE_HOURLY = 'hourly';
const PRICING_TYPE_PACKAGE = 'package';

const EditProgramListingPricingPanel = props => {
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
  const currencyUnit = process.env.REACT_APP_SHARETRIBE_MARKETPLACE_CURRENCY;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { publicData, price } = currentListing.attributes;
  const hours = publicData.hours;
  const pricingType = publicData.pricingType || PRICING_TYPE_HOURLY;
  const packageQuantity = publicData && publicData.packageQuantity;
  const pricePerItem =
    publicData.pricingType === PRICING_TYPE_HOURLY
      ? new Money(price.amount / hours, currencyUnit)
      : pricingType === PRICING_TYPE_PACKAGE
      ? new Money(price.amount / packageQuantity, currencyUnit)
      : null;
    
      console.log(pricePerItem)

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditProgramListingPricingPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditProgramListingPricingPanel.createListingTitle" />
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditProgramListingPricingForm
        className={css.form}
        initialValues={{ hours, pricingType, price: pricePerItem }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const { pricingType, hours, packageQuantity, price } = values;

          const totalAmount =
            pricingType === PRICING_TYPE_PACKAGE ? quantity * price.amount : hours * price.amount;
          const totalPrice = new Money(totalAmount, currencyUnit);

          const updateValues = {
            publicData: { pricingType },
            price: totalPrice,
          };

          if (pricingType !== PRICING_TYPE_HOURLY) {
            updateValues.publicData.packageQuantity = packageQuantity;
          }

          onSubmit(updateValues);
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
      />
    </div>
  );
};

EditProgramListingPricingPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditProgramListingPricingPanel.propTypes = {
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

export default EditProgramListingPricingPanel;
