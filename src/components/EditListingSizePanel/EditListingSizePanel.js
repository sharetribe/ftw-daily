import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ensureOwnListing } from '../../util/data';
import { findOptionsForSelectFilter } from '../../util/search';
import { ListingLink } from '../../components';
import { EditListingSizeForm } from '../../forms';
import config from '../../config.js';

// Create this file using EditListingDescriptionPanel.module.css
// as a template.
import css from './EditListingSizePanel.module.css';

const EditListingSizePanel = props => {
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
  const { publicData } = currentListing.attributes;

  const panelTitle = currentListing.id ? (
    <FormattedMessage
      id="EditListingSizePanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingSizePanel.createListingTitle" />
  );
  const sizeOptions = findOptionsForSelectFilter(
    'size',
    config.custom.filters
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingSizeForm
        className={css.form}
        initialValues={{ size: publicData.size }}
        onSubmit={values => {
          const { size } = values;
          const updateValues = {
            publicData: {
              size,
            },
          };
          onSubmit(updateValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateError={errors.updateListingError}
        updateInProgress={updateInProgress}
        sizeOptions={sizeOptions}
      />
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingSizePanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingSizePanel.propTypes = {
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

export default EditListingSizePanel;