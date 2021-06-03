import React from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingAvailabilityForm } from '../../forms';

import css from './EditListingAvailabilityPanelDay.module.css';

const EditListingAvailabilityPanelDay = props => {
  const {
    className,
    rootClassName,
    listing,
    availability,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const {
    state,
    availabilityPlan: currentAvailabilityPlan,
    publicData
  } = currentListing.attributes;

  const numSeats = 'seats' in publicData ? publicData.seats : 1;
  const isPublished = currentListing.id && state !== LISTING_STATE_DRAFT;
  const defaultAvailabilityPlan = {
    type: 'availability-plan/day',
    entries: [
      { dayOfWeek: 'mon', seats: numSeats },
      { dayOfWeek: 'tue', seats: numSeats },
      { dayOfWeek: 'wed', seats: numSeats },
      { dayOfWeek: 'thu', seats: numSeats },
      { dayOfWeek: 'fri', seats: numSeats },
      { dayOfWeek: 'sat', seats: numSeats },
      { dayOfWeek: 'sun', seats: numSeats },
    ],
  };

  if (currentAvailabilityPlan) {
    currentAvailabilityPlan.entries.map(e => e.seats = numSeats);
  }

  const availabilityPlan = currentAvailabilityPlan || defaultAvailabilityPlan;
  const minimumLength = [publicData.minimumLength] || [1];

  return (
    <div className={classes}>
      <h1 className={css.title}>
        {isPublished ? (
          <FormattedMessage
            id="EditListingAvailabilityPanel.title"
            values={{ listingTitle: <ListingLink listing={listing} /> }}
          />
        ) : (
          <FormattedMessage id="EditListingAvailabilityPanel.createListingTitle" />
        )}
      </h1>
      <EditListingAvailabilityForm
        className={css.form}
        listingId={currentListing.id}
        initialValues={{ availabilityPlan, minimumLength }}
        availability={availability}
        availabilityPlan={availabilityPlan}
        onSubmit={values => {
          // We save the default availability plan
          // I.e. this listing is available every night.
          // Exceptions are handled with live edit through a calendar,
          // which is visible on this panel.
          const minimumLength = values.minimumLength[0]
          onSubmit({ availabilityPlan, publicData: { minimumLength } });
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateError={errors.updateListingError}
        updateInProgress={updateInProgress}
      />
    </div>
  );
};

EditListingAvailabilityPanelDay.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingAvailabilityPanelDay.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  availability: shape({
    calendar: object.isRequired,
    onFetchAvailabilityExceptions: func.isRequired,
    onCreateAvailabilityException: func.isRequired,
    onDeleteAvailabilityException: func.isRequired,
  }).isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingAvailabilityPanelDay;
