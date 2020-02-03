import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { arrayOf, bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { getDefaultTimeZoneOnBrowser, timestampToDate } from '../../util/dates';
import { LISTING_STATE_DRAFT, DATE_TYPE_DATETIME, propTypes } from '../../util/types';
import {
  Button,
  IconClose,
  IconEdit,
  IconSpinner,
  InlineTextButton,
  ListingLink,
  Modal,
  TimeRange,
} from '../../components';
import { EditListingAvailabilityPlanForm, EditListingAvailabilityExceptionForm } from '../../forms';

import css from './EditListingAvailabilityPanel.css';

const WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// We want to sort exceptions on the client-side, maximum pagination page size is 100,
// so we need to restrict the amount of exceptions to that.
const MAX_EXCEPTIONS_COUNT = 100;

const defaultTimeZone = () =>
  typeof window !== 'undefined' ? getDefaultTimeZoneOnBrowser() : 'Etc/UTC';

////////////
// Portal //
////////////

// TODO: change all the modals to use portals at some point.
// Portal is used here to circumvent the problems that rise
// from different levels of z-indexes in DOM tree.
// Note: React Portal didn't exist when we originally created modals.

class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    this.props.portalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.props.portalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

/////////////
// Weekday //
/////////////
const findEntry = (availabilityPlan, dayOfWeek) =>
  availabilityPlan.entries.find(d => d.dayOfWeek === dayOfWeek);

const getEntries = (availabilityPlan, dayOfWeek) =>
  availabilityPlan.entries.filter(d => d.dayOfWeek === dayOfWeek);

const Weekday = props => {
  const { availabilityPlan, dayOfWeek, openEditModal } = props;
  const hasEntry = findEntry(availabilityPlan, dayOfWeek);

  return (
    <div
      className={classNames(css.weekDay, { [css.blockedWeekDay]: !hasEntry })}
      onClick={() => openEditModal(true)}
      role="button"
    >
      <div className={css.dayOfWeek}>
        <FormattedMessage id={`EditListingAvailabilityPanel.dayOfWeek.${dayOfWeek}`} />
      </div>
      <div className={css.entries}>
        {availabilityPlan && hasEntry
          ? getEntries(availabilityPlan, dayOfWeek).map(e => {
              return (
                <span className={css.entry} key={`${e.dayOfWeek}${e.startTime}`}>{`${
                  e.startTime
                } - ${e.endTime === '00:00' ? '24:00' : e.endTime}`}</span>
              );
            })
          : null}
      </div>
    </div>
  );
};

///////////////////////////////////////////////////
// EditListingAvailabilityExceptionPanel - utils //
///////////////////////////////////////////////////

// Create initial entry mapping for form's initial values
const createEntryDayGroups = (entries = {}) =>
  entries.reduce((groupedEntries, entry) => {
    const { startTime, endTime: endHour, dayOfWeek } = entry;
    const dayGroup = groupedEntries[dayOfWeek] || [];
    return {
      ...groupedEntries,
      [dayOfWeek]: [
        ...dayGroup,
        {
          startTime,
          endTime: endHour === '00:00' ? '24:00' : endHour,
        },
      ],
    };
  }, {});

// Create initial values
const createInitialValues = availabilityPlan => {
  const { timezone, entries } = availabilityPlan || {};
  const tz = timezone || defaultTimeZone();
  return {
    timezone: tz,
    ...createEntryDayGroups(entries),
  };
};

// Create entries from submit values
const createEntriesFromSubmitValues = values =>
  WEEKDAYS.reduce((allEntries, dayOfWeek) => {
    const dayValues = values[dayOfWeek] || [];
    const dayEntries = dayValues.map(dayValue => {
      const { startTime, endTime } = dayValue;
      // Note: This template doesn't support seats yet.
      return startTime && endTime
        ? {
            dayOfWeek,
            seats: 1,
            startTime,
            endTime: endTime === '24:00' ? '00:00' : endTime,
          }
        : null;
    });

    return allEntries.concat(dayEntries.filter(e => !!e));
  }, []);

// Create availabilityPlan from submit values
const createAvailabilityPlan = values => ({
  availabilityPlan: {
    type: 'availability-plan/time',
    timezone: values.timezone,
    entries: createEntriesFromSubmitValues(values),
  },
});

// Ensure that the AvailabilityExceptions are in sensible order.
//
// Note: if you allow fetching more than 100 exception,
// pagination kicks in and that makes client-side sorting impossible.
const sortExceptionsByStartTime = (a, b) => {
  return a.attributes.start.getTime() - b.attributes.start.getTime();
};

//////////////////////////////////
// EditListingAvailabilityPanel //
//////////////////////////////////
const EditListingAvailabilityPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    availabilityExceptions,
    fetchExceptionsInProgress,
    onAddAvailabilityException,
    onDeleteAvailabilityException,
    disabled,
    ready,
    onSubmit,
    onManageDisableScrolling,
    onNextTab,
    submitButtonText,
    updateInProgress,
    errors,
  } = props;
  // Hooks
  const [isEditPlanModalOpen, setIsEditPlanModalOpen] = useState(false);
  const [isEditExceptionsModalOpen, setIsEditExceptionsModalOpen] = useState(false);
  const [portalRoot, setPortalRoot] = useState(null);
  const [valuesFromLastSubmit, setValuesFromLastSubmit] = useState(null);

  const setPortalRootAfterInitialRender = () => {
    setPortalRoot(document.getElementById('portal-root'));
  };

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const isNextButtonDisabled = !currentListing.attributes.availabilityPlan;
  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const defaultAvailabilityPlan = {
    type: 'availability-plan/time',
    timezone: defaultTimeZone(),
    entries: [
      // { dayOfWeek: 'mon', startTime: '09:00', endTime: '17:00', seats: 1 },
      // { dayOfWeek: 'tue', startTime: '09:00', endTime: '17:00', seats: 1 },
      // { dayOfWeek: 'wed', startTime: '09:00', endTime: '17:00', seats: 1 },
      // { dayOfWeek: 'thu', startTime: '09:00', endTime: '17:00', seats: 1 },
      // { dayOfWeek: 'fri', startTime: '09:00', endTime: '17:00', seats: 1 },
      // { dayOfWeek: 'sat', startTime: '09:00', endTime: '17:00', seats: 1 },
      // { dayOfWeek: 'sun', startTime: '09:00', endTime: '17:00', seats: 1 },
    ],
  };
  const availabilityPlan = currentListing.attributes.availabilityPlan || defaultAvailabilityPlan;
  const initialValues = valuesFromLastSubmit
    ? valuesFromLastSubmit
    : createInitialValues(availabilityPlan);

  const handleSubmit = values => {
    setValuesFromLastSubmit(values);

    // Final Form can wait for Promises to return.
    return onSubmit(createAvailabilityPlan(values))
      .then(() => {
        setIsEditPlanModalOpen(false);
      })
      .catch(e => {
        // Don't close modal if there was an error
      });
  };

  const exceptionCount = availabilityExceptions ? availabilityExceptions.length : 0;
  const sortedAvailabilityExceptions = availabilityExceptions.sort(sortExceptionsByStartTime);

  // Save exception click handler
  const saveException = values => {
    const { availability, exceptionStartTime, exceptionEndTime } = values;

    // TODO: add proper seat handling
    const seats = availability === 'available' ? 1 : 0;

    return onAddAvailabilityException({
      listingId: listing.id,
      seats,
      start: timestampToDate(exceptionStartTime),
      end: timestampToDate(exceptionEndTime),
    })
      .then(() => {
        setIsEditExceptionsModalOpen(false);
      })
      .catch(e => {
        // Don't close modal if there was an error
      });
  };

  return (
    <main className={classes} ref={setPortalRootAfterInitialRender}>
      <h1 className={css.title}>
        {isPublished ? (
          <FormattedMessage
            id="EditListingAvailabilityPanel.title"
            values={{
              listingTitle: (
                <ListingLink listing={listing}>
                  <FormattedMessage id="EditListingAvailabilityPanel.listingTitle" />
                </ListingLink>
              ),
            }}
          />
        ) : (
          <FormattedMessage id="EditListingAvailabilityPanel.createListingTitle" />
        )}
      </h1>

      <section className={css.section}>
        <header className={css.sectionHeader}>
          <h2 className={css.sectionTitle}>
            <FormattedMessage id="EditListingAvailabilityPanel.defaultScheduleTitle" />
          </h2>
          <InlineTextButton
            className={css.editPlanButton}
            onClick={() => setIsEditPlanModalOpen(true)}
          >
            <IconEdit className={css.editPlanIcon} />{' '}
            <FormattedMessage id="EditListingAvailabilityPanel.edit" />
          </InlineTextButton>
        </header>
        <div className={css.week}>
          {WEEKDAYS.map(w => (
            <Weekday
              dayOfWeek={w}
              key={w}
              availabilityPlan={availabilityPlan}
              openEditModal={setIsEditPlanModalOpen}
            />
          ))}
        </div>
      </section>
      <section className={css.section}>
        <header className={css.sectionHeader}>
          <h2 className={css.sectionTitle}>
            {fetchExceptionsInProgress ? (
              <FormattedMessage id="EditListingAvailabilityPanel.availabilityExceptionsTitleNoCount" />
            ) : (
              <FormattedMessage
                id="EditListingAvailabilityPanel.availabilityExceptionsTitle"
                values={{ count: exceptionCount }}
              />
            )}
          </h2>
        </header>
        {fetchExceptionsInProgress ? (
          <div className={css.exceptionsLoading}>
            <IconSpinner />
          </div>
        ) : exceptionCount === 0 ? (
          <div className={css.noExceptions}>
            <FormattedMessage id="EditListingAvailabilityPanel.noExceptions" />
          </div>
        ) : (
          <div className={css.exceptions}>
            {sortedAvailabilityExceptions.map(availabilityException => {
              const { start, end, seats } = availabilityException.attributes;
              return (
                <div key={availabilityException.id.uuid} className={css.exception}>
                  <div className={css.exceptionHeader}>
                    <div className={css.exceptionAvailability}>
                      <div
                        className={classNames(css.exceptionAvailabilityDot, {
                          [css.isAvailable]: seats > 0,
                        })}
                      />
                      <div className={css.exceptionAvailabilityStatus}>
                        {seats > 0 ? (
                          <FormattedMessage id="EditListingAvailabilityPanel.exceptionAvailable" />
                        ) : (
                          <FormattedMessage id="EditListingAvailabilityPanel.exceptionNotAvailable" />
                        )}
                      </div>
                    </div>
                    <button
                      className={css.removeExceptionButton}
                      onClick={() =>
                        onDeleteAvailabilityException({ id: availabilityException.id })
                      }
                    >
                      <IconClose size="normal" className={css.removeIcon} />
                    </button>
                  </div>
                  <TimeRange
                    className={css.timeRange}
                    startDate={start}
                    endDate={end}
                    dateType={DATE_TYPE_DATETIME}
                    timeZone={availabilityPlan.timezone}
                  />
                </div>
              );
            })}
          </div>
        )}
        {exceptionCount <= MAX_EXCEPTIONS_COUNT ? (
          <InlineTextButton
            className={css.addExceptionButton}
            onClick={() => setIsEditExceptionsModalOpen(true)}
            disabled={disabled}
            ready={ready}
          >
            <FormattedMessage id="EditListingAvailabilityPanel.addException" />
          </InlineTextButton>
        ) : null}
      </section>

      {errors.showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingAvailabilityPanel.showListingFailed" />
        </p>
      ) : null}

      {!isPublished ? (
        <Button
          className={css.goToNextTabButton}
          onClick={onNextTab}
          disabled={isNextButtonDisabled}
        >
          {submitButtonText}
        </Button>
      ) : null}
      {portalRoot && onManageDisableScrolling ? (
        <Portal portalRoot={portalRoot}>
          <Modal
            id="EditAvailabilityPlan"
            isOpen={isEditPlanModalOpen}
            onClose={() => setIsEditPlanModalOpen(false)}
            onManageDisableScrolling={onManageDisableScrolling}
            containerClassName={css.modalContainer}
          >
            <EditListingAvailabilityPlanForm
              formId="EditListingAvailabilityPlanForm"
              listingTitle={currentListing.attributes.title}
              availabilityPlan={availabilityPlan}
              weekdays={WEEKDAYS}
              onSubmit={handleSubmit}
              initialValues={initialValues}
              inProgress={updateInProgress}
              fetchErrors={errors}
            />
          </Modal>
        </Portal>
      ) : null}
      {portalRoot && onManageDisableScrolling ? (
        <Portal portalRoot={portalRoot}>
          <Modal
            id="EditAvailabilityExceptions"
            isOpen={isEditExceptionsModalOpen}
            onClose={() => setIsEditExceptionsModalOpen(false)}
            onManageDisableScrolling={onManageDisableScrolling}
            containerClassName={css.modalContainer}
          >
            <EditListingAvailabilityExceptionForm
              formId="EditListingAvailabilityExceptionForm"
              onSubmit={saveException}
              timeZone={availabilityPlan.timezone}
              availabilityExceptions={sortedAvailabilityExceptions}
              updateInProgress={updateInProgress}
              fetchErrors={errors}
            />
          </Modal>
        </Portal>
      ) : null}
    </main>
  );
};

EditListingAvailabilityPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
  availabilityExceptions: [],
};

EditListingAvailabilityPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  availabilityExceptions: arrayOf(propTypes.availabilityException),
  fetchExceptionsInProgress: bool.isRequired,
  onAddAvailabilityException: func.isRequired,
  onDeleteAvailabilityException: func.isRequired,
  onSubmit: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onNextTab: func.isRequired,
  submitButtonText: string.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingAvailabilityPanel;
