import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { findOptionsForSelectFilter } from '../../util/search';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '..';
// import { EditListingBasicInfoForm } from '../../forms';
import config from '../../config';

import css from "./EditListingbasicInfoPanel.module.css"
import EditListingBasicInfoForm from '../../forms/EditListingBasicInfoForm/EditListingBasicInfoForm';

const EditListingBasicInfoPanel = props => {
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
  const { title, publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingDescriptionPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingDescriptionPanel.createListingTitle" />
  );

  const categoryOptions = findOptionsForSelectFilter('category', config.custom.filters);
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingBasicInfoForm
        className={css.form}
        initialValues={{
          title, email: publicData.email, birthday: publicData.birthday, location: publicData.location, phone: publicData.phone,
          serviceSetup: publicData.serviceSetup
        }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const { title, email, phone, birthday, location, serviceSetup } = values;
          const updateValues = {
            title: title.trim(),
            publicData: { birthday, email, location, serviceSetup, phone },
          };
          onSubmit(updateValues);
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        categories={categoryOptions}
      />
    </div>
  );
};

EditListingBasicInfoPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingBasicInfoPanel.propTypes = {
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

export default EditListingBasicInfoPanel;
