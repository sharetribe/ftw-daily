import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '..';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { EditListingDisciplineForm } from '../../forms';
import config from '../../config';

import css from './EditListingDisciplinePanel.css';

const EditListingDisciplinePanel = props => {
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
  const { mainDiscipline, additionalDisciplines } = currentListing.attributes.publicData;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingDisciplinePanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingDisciplinePanel.createListingTitle" />
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingDisciplineForm
        className={css.form}
        initialValues={{ mainDiscipline, additionalDisciplines }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const { mainDiscipline, additionalDisciplines } = values;
          const index = additionalDisciplines && additionalDisciplines.indexOf(mainDiscipline);

          if (index > -1) {
            additionalDisciplines.splice(index, 1);
          }

          const updateValues = {
            publicData: { mainDiscipline, additionalDisciplines },
          };
          onSubmit(updateValues);
        }}
        onChange={onChange}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        disciplines={config.custom.disciplines}
      />
    </div>
  );
};

EditListingDisciplinePanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingDisciplinePanel.propTypes = {
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

export default EditListingDisciplinePanel;
