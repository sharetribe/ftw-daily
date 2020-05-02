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
    user_type,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { price, publicData } = currentListing.attributes;
  const rate = config.custom.rate;
  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const user_name = user_type === 0 ? "owner" : user_type === 1 ? "sitter" : "service";
  const publish = isPublished ? "title." : "createListingTitle.";
  const PricingPanelTitle = 'EditListingPricingPanel.' + publish + user_name;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id={PricingPanelTitle}
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
      <FormattedMessage id={PricingPanelTitle} />
    );


  const priceCurrencyValid = price instanceof Money ? price.currency === config.currency : true;
  const form =
    <EditListingPricingForm
      className={css.form}
      initialValues={{
        rate: publicData.rate,
        price: price,
        currency: price.currency
      }}
      onSubmit={values => {
        const {
          rate,
          price,
          currency
        } = values;

        const updatedValues = {
          publicData: {
            rate,
          },
          price: { ...price, currency }

        };
        onSubmit(updatedValues);
      }}
      onChange={onChange}
      saveActionMsg={submitButtonText}
      updated={panelUpdated}
      updateInProgress={updateInProgress}
      fetchErrors={errors}
      user_type={user_type}
      rate={rate}
    />


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
