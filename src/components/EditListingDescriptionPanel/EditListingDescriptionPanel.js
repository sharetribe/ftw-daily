import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '../../components';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { EditListingDescriptionForm } from '../../forms';
import css from './EditListingDescriptionPanel.css';
import config from '../../config';

const EditListingDescriptionPanel = props => {
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
    user_type,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { description, title, publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const user_name = user_type === 0 ? "owner" : user_type === 1 ? "sitter" : "service";
  const publish = isPublished ? "title." : "createListingTitle.";
  const DescriptionPanelTitle = 'EditListingDescriptionPanel.' + publish + user_name;
  const service = config.custom.service;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id={DescriptionPanelTitle}
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
      <FormattedMessage id={DescriptionPanelTitle} />
    );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingDescriptionForm
        className={css.form}
        initialValues={{ title, description, user_type, service: publicData.service, sittertype: publicData.sittertype, foodtype: publicData.foodtype }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const { title, description, user_type, service, foodtype, sittertype } = values;
          const updateValues = {
            title: title.trim(),
            description: description,
            publicData:
            {
              user_type,
              service,
              foodtype,
              sittertype
            }
          };

          onSubmit(updateValues);
        }}
        onChange={onChange}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        user_type={user_type}
        service={service}
      />
    </div>
  );
};

EditListingDescriptionPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingDescriptionPanel.propTypes = {
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

export default EditListingDescriptionPanel;
