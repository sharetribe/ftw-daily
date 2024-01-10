import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { findOptionsForSelectFilter } from '../../util/search';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '..';
import config from '../../config';

import { EditListingBasicInfoForm } from '../../forms';

import css from "./EditListingbasicInfoPanel.module.css";

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
    currentUser,
    errors,
  } = props;
  const useremail = currentUser.attributes.email;
 const displayname = currentUser.attributes.profile.displayName;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { title, geolocation, publicData } = currentListing.attributes;

  // Only render current search if full place object is available in the URL params
  // TODO bounds are missing - those need to be queried directly from Google Places
  const locationFieldsPresent =
    publicData && publicData.location && publicData.location.address && geolocation;
  const location = publicData && publicData.location ? publicData.location : {};
  const { address } = location;

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
          title:displayname,
          fullname:publicData.fullname,
          email: useremail,
          birthday: publicData.birthday,
          phone: publicData.phone,
          serviceSetup: publicData.serviceSetup,
          location: locationFieldsPresent
            ? {
              search: address,
              selectedPlace: { address, origin: geolocation },
            }
            : null,
        }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const { title, email, phone,fullname, birthday, location, serviceSetup } = values;
          const {
            selectedPlace: { address, origin },
          } = location;

          const updateValues = {
            title: title.trim(),
            geolocation: origin,
            publicData: {
              email,
              phone,
              fullname,
              birthday,
              serviceSetup,
              location: { address },
            },
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
        currentUser={currentUser}
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
