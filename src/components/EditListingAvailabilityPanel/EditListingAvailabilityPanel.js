import React from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { 
  LISTING_STATE_DRAFT,
  AVAILABILITY_PLAN_TIME,
  DAYS_OF_WEEK
} from '../../util/types';
import { ListingLink } from '..';
import { EditListingAvailabilityForm } from '../../forms';
import { getDefaultTimeZoneOnBrowser } from '../../util/dates';

import css from './EditListingAvailabilityPanel.module.css';

const START_TIME = '00:00';
const END_TIME = '24:00';

const defaultTimeZone = () =>
  typeof window !== 'undefined' ? getDefaultTimeZoneOnBrowser() : 'Etc/UTC';

const createDefaultPlan = (seats = 1) => {
  return {
    type: AVAILABILITY_PLAN_TIME,
    timezone: defaultTimeZone(),
    entries: DAYS_OF_WEEK.map(dayOfWeek => ({
      dayOfWeek, startTime: START_TIME, endTime: END_TIME, seats
    }))
  }
}

const planValid = (plan, seats) => {
  const {type, entries} = plan || {}

  return plan &&
        type === AVAILABILITY_PLAN_TIME &&
        entries && entries.every(({startTime, endTime, seats: entrieSeats}) => (
          startTime === START_TIME && endTime === START_TIME && entrieSeats === seats));
}

const preparePlan = (plan, days) => {
  const { entries, ...rest } = plan;
  return {
    ...rest,
    entries: entries
              .filter(({dayOfWeek}) => days.includes(dayOfWeek))
              .map(({endTime, ...rest}) => ({...rest, endTime: START_TIME}))
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
        initialValues={{
          availabilityPlan,
          daysAvailability: getDaysAvailability(availabilityPlan)
        }}
        availability={availability}
        availabilityPlan={availabilityPlan}
        onSubmit={values => {
          const {daysAvailability} = values;
          // We save the default availability plan
          // I.e. this listing is available every night.
          // Exceptions are handled with live edit through a calendar,
          // which is visible on this panel.
          // const minimumLength = values.minimumLength[0]

          onSubmit({
            availabilityPlan: preparePlan(availabilityPlan, daysAvailability), 
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
