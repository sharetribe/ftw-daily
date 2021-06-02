import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '../../components';
import { EditListingSeatsForm } from '../../forms';
import config from '../../config.js';

import css from './EditListingSeatsPanel.module.css';

const EditListingSeatsPanel = props => {
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
  const {
    availabilityPlan: currentAvailabilityPlan,
    publicData
  } = currentListing.attributes;

  const panelTitle = currentListing.id ? (
    <FormattedMessage
      id="EditListingSeatsPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingSeatsPanel.createListingTitle" />
  );

  const { availabilityPlan } = listing && listing.attributes;

  const updateAvailabilityPlan = (availabilityPlan, seats) => {
    return {
      ...availabilityPlan,
      entries: availabilityPlan.entries.map(entry => ({...entry, seats}))
    }
  }

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <p>Do you have more than one of this Patch? For example if you want to list multiple chairs in a barbershop, this is the place to add the quantity!</p>
      <EditListingSeatsForm
        className={css.form}
        initialValues={{ seats: publicData.seats }}
        onSubmit={values => {
          const { seats } = values;

          const availabilityUpdate = publicData.seats !== seats && !!availabilityPlan;

          const updateValues = {
            ...(availabilityUpdate ? {availabilityPlan: updateAvailabilityPlan(availabilityPlan, seats) } : {}),
            publicData: {
              seats: parseInt(seats, 10),   // NOTE seats expects an int, not string
            },
          };
          onSubmit(updateValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateError={errors.updateListingError}
        updateInProgress={updateInProgress}
        seatsOptions={config.custom.seatsOptions}
      />
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingSeatsPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingSeatsPanel.propTypes = {
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

export default EditListingSeatsPanel;
