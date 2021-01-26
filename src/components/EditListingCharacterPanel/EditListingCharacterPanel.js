import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '..';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { EditListingCharacterForm } from '../../forms';
import config from '../../config';

import css from './EditListingCharacterPanel.css';

const EditListingCharacterPanel = props => {
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
  const { characteristics } = currentListing.attributes.publicData;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingCharacterPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingCharacterPanel.createListingTitle" />
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingCharacterForm
        className={css.form}
        initialValues={{ characteristics }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const { characteristics = [] } = values;
          const updateValues = {
            publicData: { characteristics },
          };
          onSubmit(updateValues);
        }}
        onChange={onChange}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        characteristics={config.custom.characteristics}
      />
    </div>
  );
};

EditListingCharacterPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingCharacterPanel.propTypes = {
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

export default EditListingCharacterPanel;
