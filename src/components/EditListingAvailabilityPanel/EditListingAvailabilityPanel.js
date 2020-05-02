import React from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ensureOwnListing } from '../../util/data';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingAvailabilityForm } from '../../forms';
import Calendar from '../../components/Calendar/Calendar.js';
import config from '../../config';
import css from './EditListingAvailabilityPanel.css';

const EditListingAvailabilityPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    availability,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
    user_type,
  } = props;
  const EQUIPMENTS_NAME = 'equipments';
  const LOCATIONS_NAME = 'locations';
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;

  const defaultAvailabilityPlanSitter = {
    type: 'availability-plan/day',
    entries: [
      { dayOfWeek: 'mon', seats: 1 },
      { dayOfWeek: 'tue', seats: 1 },
      { dayOfWeek: 'wed', seats: 1 },
      { dayOfWeek: 'thu', seats: 1 },
      { dayOfWeek: 'fri', seats: 1 },
      { dayOfWeek: 'sat', seats: 1 },
      { dayOfWeek: 'sun', seats: 1 },
    ],
  };

  const defaultAvailabilityPlanOwner = {
    type: 'availability-plan/day',
    entries: [
      { dayOfWeek: 'mon', seats: 0 },
      { dayOfWeek: 'tue', seats: 0 },
      { dayOfWeek: 'wed', seats: 0 },
      { dayOfWeek: 'thu', seats: 0 },
      { dayOfWeek: 'fri', seats: 0 },
      { dayOfWeek: 'sat', seats: 0 },
      { dayOfWeek: 'sun', seats: 0 },
    ],
  };

  const availabilityPlan =
    currentListing.attributes.availabilityPlan || user_type === 0
      ? defaultAvailabilityPlanOwner
      : defaultAvailabilityPlanSitter;

  const exceptionID = currentListing.attributes.publicData.exceptionID || null;

  let requiredDates = false;

  const user_name = user_type === 0 ? 'owner' : user_type === 1 ? 'sitter' : 'service';
  const publish = isPublished ? 'title.' : 'createListingTitle.';
  const AvailabilityPanelTitle = 'EditListingAvailabilityPanel.' + publish + user_name;

  return (
    <div className={classes}>
      <h1 className={css.title}>
        {isPublished ? (
          <FormattedMessage
            id={AvailabilityPanelTitle}
            values={{ listingTitle: <ListingLink listing={listing} /> }}
          />
        ) : (
          <FormattedMessage id={AvailabilityPanelTitle} />
        )}
      </h1>
      <EditListingAvailabilityForm
        className={css.form}
        listingId={currentListing.id}
        publicData={currentListing.attributes.publicData}
        initialValues={{ availabilityPlan }}
        availability={availability}
        availabilityPlan={availabilityPlan}
        setRequiredDates={value => {
          requiredDates = value;
        }}
        onSubmit={() => {
          if (user_name == 'owner') {
            if (requiredDates) {
              onSubmit({ availabilityPlan, publicData: { requiredDates, exceptionID } });
            }
          } else {
            onSubmit({ availabilityPlan });
          }
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateError={errors.updateListingError}
        updateInProgress={updateInProgress}
        name_equipment={EQUIPMENTS_NAME}
        name_location={LOCATIONS_NAME}
        equipments={config.custom.equipments}
        locations={config.custom.locations}
        user_name={user_name}
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
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingAvailabilityPanel;
