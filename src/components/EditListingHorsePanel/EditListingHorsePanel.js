import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '../../components';
import {
  LISTING_STATE_DRAFT,
  ERROR_CODE_TRANSACTION_ALREADY_REVIEWED_BY_CUSTOMER,
} from '../../util/types';
import { EditListingHorseForm } from '../../forms';

import config from '../../config';

import css from './EditListingHorsePanel.css';

const EditListingHorsePanel = props => {
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
  const { title, publicData } = currentListing.attributes;
  const { gender, age, breed, hight, color } = publicData;
  const { genders, ages, breeds, hights, colors } = config.custom;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingHorsePanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingHorsePanel.createListingTitle" />
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingHorseForm
        initialValues={{
          title: gender ? title : '',
          gender,
          age,
          breed,
          hight,
          color,
        }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const { title, gender, age, breed, hight, color } = values;
          const updateValues = {
            title: title.trim(),
            publicData: { gender, age: parseInt(age), breed, hight: parseInt(hight), color },
          };

          onSubmit(updateValues);
        }}
        onChange={onChange}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        genders={genders}
        ages={ages}
        breeds={breeds}
        hights={hights}
        colors={colors}
      />
    </div>
  );
};

EditListingHorsePanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingHorsePanel.propTypes = {
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

export default EditListingHorsePanel;
