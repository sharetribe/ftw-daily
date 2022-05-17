import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { findOptionsForSelectFilter } from '../../util/search';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '..';
import { EditProgramListingGeneralForm } from '../../forms';
import config from '../../config';

import css from './EditProgramListingGeneralPanel.module.css';

const customHoursMessage = 'Custom hours';

const EditProgramListingGeneralPanel = props => {
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

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { description, title, publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditProgramListingGeneralPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditProgramListingGeneralPanel.createListingTitle" />
  );

  const tags = publicData?.tags && publicData.tags;

  const difficultyData = publicData?.difficulty && publicData.difficulty;

  const hoursData = publicData?.hours && publicData.hours;
  const initHours = {};
  if (hoursData !== 2 && hoursData !== 4 && hoursData !== 8) {
    initHours.hours = 'Custom hours';
    initHours.customHours = hoursData;
  } else {
    initHours.hours = hoursData;
  }

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditProgramListingGeneralForm
        className={css.form}
        initialValues={{
          title,
          description,
          tags,
          difficulty: difficultyData,
          ...initHours,
        }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const { title, description, tags = '', hours, customHours, difficulty = [] } = values;

          const updateValues = {
            title: title.trim(),
            description,
            publicData: { tags: tags, hours: hours === customHoursMessage ? customHours : hours, difficulty },
          };

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

EditProgramListingGeneralPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditProgramListingGeneralPanel.propTypes = {
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

export default EditProgramListingGeneralPanel;
