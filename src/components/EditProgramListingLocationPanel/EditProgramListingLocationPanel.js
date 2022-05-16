import React, { useState } from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { findOptionsForSelectFilter } from '../../util/search';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '..';
import { EditListingDescriptionForm, EditProgramListingLocationForm } from '../../forms';
import config from '../../config';

import css from './EditProgramListingLocationPanel.module.css';

const EditProgramListingLocationPanel = props => {
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

  const currentListing = ensureOwnListing(listing);

  const getInitialValues = () => {
    const { geolocation, publicData } = currentListing.attributes;

    // Only render current search if full place object is available in the URL params
    // TODO bounds are missing - those need to be queried directly from Google Places
    const locationFieldsPresent =
      publicData && publicData.location && publicData.location.address && geolocation;
    const location = publicData && publicData.location ? publicData.location : {};
    const { address } = location;

    const typeLocation = publicData && publicData.typeLocation;

    return {
      location: locationFieldsPresent
        ? {
            selectedPlace: { address, origin: geolocation },
            search: address,
          }
        : null,
      typeLocation: typeLocation || [],
    };
  };

  const [initialValues, setInitialValues] = useState(() => getInitialValues());
  const classes = classNames(rootClassName || css.root, className);

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditProgramListingLocationPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditProgramListingLocationPanel.createListingTitle" />
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditProgramListingLocationForm
        className={css.form}
        initialValues={initialValues}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const { location = {}, typeLocation = [] } = values;
          const onSiteSelection = 'on-site';
          const updateValues = {};
          if (typeLocation.includes(onSiteSelection)) {
            const {
              selectedPlace: { address, origin },
            } = location;
            updateValues.geolocation = origin;
            updateValues.publicData = { location: { address }, typeLocation };

            setInitialValues({
              typeLocation,
              location: { search: address, selectedPlace: { address, origin } },
            });
          } else {
            updateValues.publicData = { typeLocation, location: '' };
            setInitialValues({ typeLocation, location: null });
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

EditProgramListingLocationPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditProgramListingLocationPanel.propTypes = {
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

export default EditProgramListingLocationPanel;
