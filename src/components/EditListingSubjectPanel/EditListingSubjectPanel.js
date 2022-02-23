import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureListing } from '../../util/data';
import { findOptionsForSelectFilter } from '../../util/search';
import { EditListingSubjectForm } from '../../forms';
import { ListingLink } from '..';
import config from '../../config';


import css from './EditListingSubjectPanel.module.css';

const FEATURES_NAME = 'subject';

const EditListingSubjectPanel = props => {
  const {
    rootClassName,
    className,
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
  const currentListing = ensureListing(listing);
  const { publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingSubjectPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingSubjectPanel.createListingTitle" />
  );

  const subject = publicData && publicData.subject;
  const groupLevelType = publicData && publicData.level.type;
  const level = publicData && publicData.level.level;
  const initialValues = { subject, groupLevelType, level };

  const groupLevelTypeOptions = findOptionsForSelectFilter('classLevelType', config.custom.filters);
  const levelOptions = findOptionsForSelectFilter('classLevel', config.custom.filters);
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingSubjectForm
        className={css.form}
        name={FEATURES_NAME}
        initialValues={initialValues}
        onSubmit={values => {
          const { subject = [], groupLevelType, level } = values;
          
          const updatedValues = {
            publicData: { 
              subject,
              level: {
                type: groupLevelType,
                level: level,
              },
            },
          };
          onSubmit(updatedValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        groupLevelTypes={groupLevelTypeOptions}
        classLevels={levelOptions}
      />
    </div>
  );
};

EditListingSubjectPanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
};

const { bool, func, object, string } = PropTypes;

EditListingSubjectPanel.propTypes = {
  rootClassName: string,
  className: string,

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

export default EditListingSubjectPanel;
