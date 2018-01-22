import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ensureListing } from '../../util/data';
import { createSlug } from '../../util/urlHelpers';
import { NamedLink } from '../../components';
import { EditListingLocationForm } from '../../containers';

import css from './EditListingLocationPanel.css';

const EditListingLocationPanel = props => {
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
  const { geolocation, title, publicData } = currentListing.attributes;
  const listingTitle = title || '';
  const listingLink = currentListing.id ? (
    <NamedLink name="ListingPage" params={{ id: currentListing.id.uuid, slug: createSlug(title) }}>
      {listingTitle}
    </NamedLink>
  ) : (
    ''
  );

  const panelTitle = currentListing.id ? (
    <FormattedMessage id="EditListingLocationPanel.title" values={{ listingTitle: listingLink }} />
  ) : (
    <FormattedMessage id="EditListingLocationPanel.createListingTitle" />
  );

  // Only render current search if full place object is available in the URL params
  // TODO bounds and country are missing - those need to be queried directly from Google Places
  const locationFieldsPresent =
    publicData && publicData.location && publicData.location.address && geolocation;
  const location = publicData && publicData.location ? publicData.location : {};
  const { address, building } = location;

  const initialSearchFormValues = {
    building,
    location: locationFieldsPresent
      ? {
          search: address,
          selectedPlace: { address, origin: geolocation },
        }
      : null,
  };

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingLocationForm
        className={css.form}
        initialValues={initialSearchFormValues}
        onSubmit={onSubmit}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateError={errors.updateListingError}
        updateInProgress={updateInProgress}
      />
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingLocationPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingLocationPanel.propTypes = {
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

export default EditListingLocationPanel;
