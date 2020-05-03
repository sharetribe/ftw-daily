import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ensureListing } from '../../util/data';
import { ListingLink } from '..';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { EditListingHomeForm } from '../../forms';
import config from '../../config';
import css from './EditListingHomePanel.css';

const EditListingHomePanel = props => {
  const {
    rootClassName,
    className,
    listing,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated, 
    updateInProgress,
    errors,
    user_type,
  } = props;

  const HOME_NAME = 'home';

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const { publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const user_name = user_type === 0?"owner":user_type === 1?"sitter":"service";
  const publish = isPublished ?"title.":"createListingTitle.";
  const HomePanelTitle = 'EditListingHomePanel.' + publish + user_name;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id={HomePanelTitle}
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id={HomePanelTitle} />
  );
  
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingHomeForm
        className={css.form}
        name={HOME_NAME}
        initialValues={{ 
          locations: publicData.locations,
          equipments: publicData.equipments,
          info: publicData.info,
          bedroom:publicData.bedroom,
          bathroom:publicData.bathroom,
        }} 
        onSubmit={values => {
          const { 
            locations = [],
            equipments = [],
            info = [],
            bedroom,
            bathroom, 
          } = values;

          const updatedValues = {
            publicData: { 
              locations,
              equipments,
              info,
              bedroom,
              bathroom },
          };
          onSubmit(updatedValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        locations={config.custom.locations}
        equipments={config.custom.equipments}
        info={config.custom.info}
        name_equipments="equipments"
        name_locations="locations"
        user_type ={ user_type}
      />
    </div>
  );
};

EditListingHomePanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
  errors: null,
};



EditListingHomePanel.propTypes = {
  rootClassName: string,
  className: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingHomePanel;
