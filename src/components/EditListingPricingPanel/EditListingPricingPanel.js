import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { createSlug } from '../../util/urlHelpers';
import { NamedLink } from '../../components';
import { EditListingPricingForm } from '../../containers';
import { ensureListing } from '../../util/data';
import { types } from '../../util/sdkLoader';
import config from '../../config';

import css from './EditListingPricingPanel.css';

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
  const currentListing = ensureListing(listing);
  const { price, title } = currentListing.attributes;
  const listingTitle = title || '';
  const listingLink = currentListing.id ? (
    <NamedLink name="ListingPage" params={{ id: currentListing.id.uuid, slug: createSlug(title) }}>
      {listingTitle}
    </NamedLink>
  ) : (
    ''
  );

  const panelTitle = currentListing.id ? (
    <FormattedMessage id="EditListingPricingPanel.title" values={{ listingTitle: listingLink }} />
  ) : (
    <FormattedMessage id="EditListingPricingPanel.createListingTitle" />
  );

  const priceCurrencyValid =
    price instanceof types.Money ? price.currency === config.currency : true;
  const form = priceCurrencyValid ? (
    <EditListingPricingForm
      className={css.form}
      initialValues={{ price }}
      onSubmit={onSubmit}
      onChange={onChange}
      saveActionMsg={submitButtonText}
      updated={panelUpdated}
      updateError={errors.updateListingError}
      updateInProgress={updateInProgress}
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
