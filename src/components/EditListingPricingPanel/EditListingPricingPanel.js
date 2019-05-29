import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingPricingForm } from '../../forms';
import { ensureOwnListing } from '../../util/data';
import { types as sdkTypes } from '../../util/sdkLoader';
import config from '../../config';

import css from './EditListingPricingPanel.css';

const { Money } = sdkTypes;

const EditListingPricingPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { price } = currentListing.attributes;
  const { 
    priceDayAdult,
    priceDayChild,
    priceAfternoonAdult, 
    priceAfternoonChild, 
    priceMorningAdult, 
    priceMorningChild 
  } = currentListing.attributes.publicData
  
  const prices = {
    priceDayAdult: priceDayAdult ? new Money(priceDayAdult, config.currency): null,
    priceDayChild: priceDayChild ? new Money(priceDayChild, config.currency): null,
    priceAfternoonAdult: priceAfternoonAdult ? new Money(priceAfternoonAdult, config.currency): null,
    priceAfternoonChild: priceAfternoonChild ? new Money(priceAfternoonChild, config.currency): null,
    priceMorningAdult: priceMorningAdult ? new Money(priceMorningAdult, config.currency): null,
    priceMorningChild: priceMorningChild ? new Money(priceMorningChild, config.currency): null,
  }

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
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
      initialValues={{ 
        price, 
        priceDayAdult: prices.priceDayAdult,
        priceDayChild: prices.priceDayChild,
        priceAfternoonAdult: prices.priceAfternoonAdult,
        priceAfternoonChild: prices.priceAfternoonChild,
        priceMorningAdult: prices.priceMorningAdult, 
        priceMorningChild: prices.priceMorningChild 
      }}
      onSubmit={values => {
          const updateValues = {
            publicData: {
              priceDayAdult: values.priceDayAdult.amount,
              priceDayChild: values.priceDayChild.amount,
              priceAfternoonAdult: values.priceAfternoonAdult.amount,
              priceAfternoonChild: values.priceAfternoonChild.amount,
              priceMorningAdult: values.priceMorningAdult.amount,
              priceMorningChild: values.priceMorningChild.amount,
            }
          };
          onSubmit(updateValues)
        }
      }
      onChange={onChange}
      saveActionMsg={submitButtonText}
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

  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingPricingPanel;
