import React, {useState, useEffect} from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import {
  ensureOwnListing,
  AVAILABILITY_DEFAULT_START,
  createDefaultPlan
} from '../../util/data';
import {
  LISTING_STATE_DRAFT,
  AVAILABILITY_PLAN_TIME,
  WEEKLY_PRICE,
  MONTHLY_PRICE,
} from '../../util/types';
import { ListingLink } from '..';
import { EditListingAvailabilityForm } from '../../forms';

import css from './EditListingAvailabilityPanel.module.css';

const planValid = (plan, seats) => {
  const {type, entries} = plan || {}

  return plan &&
        type === AVAILABILITY_PLAN_TIME &&
        entries && entries.every(({startTime, endTime, seats: entrieSeats}) => (
          startTime === AVAILABILITY_DEFAULT_START && endTime === AVAILABILITY_DEFAULT_START && entrieSeats === seats));
}

const preparePlan = (plan, days) => {
  const { entries, ...rest } = plan;
  return {
    ...rest,
    entries: entries
              .filter(({dayOfWeek}) => days.includes(dayOfWeek))
              .map(({endTime, ...rest}) => ({...rest, endTime: AVAILABILITY_DEFAULT_START}))
  }
}

const EditListingAvailabilityPanel = props => {
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

  const availabilityPlan = planValid(currentAvailabilityPlan, numSeats) ? currentAvailabilityPlan : createDefaultPlan(numSeats);
  // const minimumLength = [publicData.minimumLength] || [1];

  const getDaysAvailability = availabilityPlan => {
    return availabilityPlan.entries.map(({dayOfWeek}) => dayOfWeek)
  }

  const daysAvailabilityDisabled = !!(publicData[WEEKLY_PRICE] || publicData[MONTHLY_PRICE]);

  const [initialValues, setInitialValues] = useState(null)

  useEffect(() => {
    if(currentListing && currentListing.id && currentListing.id.uuid && !initialValues) {
      setInitialValues({
        availabilityPlan,
        daysAvailability: getDaysAvailability(availabilityPlan)
      })
    }

  }, [currentListing])


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
        initialValues={initialValues || {}}
        availability={availability}
        availabilityPlan={availabilityPlan}
        onSubmit={values => {
          console.log('availabilityPlan', values)
          const {daysAvailability} = values;
          // We save the default availability plan
          // I.e. this listing is available every night.
          // Exceptions are handled with live edit through a calendar,
          // which is visible on this panel.
          // const minimumLength = values.minimumLength[0]
          onSubmit({
            availabilityPlan: preparePlan(createDefaultPlan(numSeats), daysAvailability),
            // publicData: { minimumLength }
          });
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateError={errors.updateListingError}
        updateInProgress={updateInProgress}
        seats={numSeats}
        daysAvailabilityDisabled={daysAvailabilityDisabled}
      />
    </div>
  );
};

EditListingAvailabilityPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingAvailabilityPanel.propTypes = {
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

export default EditListingAvailabilityPanel;
