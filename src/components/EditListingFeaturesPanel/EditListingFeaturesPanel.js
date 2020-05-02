import React from 'react';
import { bool, func, object, string} from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ensureListing } from '../../util/data';
import { ListingLink } from '../../components';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { EditListingFeaturesForm } from '../../forms';
import config from '../../config';
import css from './EditListingFeaturesPanel.css';


const EditListingFeaturesPanel = props => {
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

  const FEATURES_NAME = 'amenities';

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const { publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const user_name = user_type === 0?"owner":user_type === 1?"sitter":"service";
  const publish = isPublished ?"title.":"createListingTitle.";
  const FeaturesPanelTitle = 'EditListingFeaturesPanel.'+ publish + user_name;

  const panelTitle = isPublished ? (
    <FormattedMessage
      id={FeaturesPanelTitle}
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id={FeaturesPanelTitle} />
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingFeaturesForm
        
        className={css.form}
        name={FEATURES_NAME}
        initialValues={{
          dog: publicData.dog,
          cat: publicData.cat,
          reptiles: publicData.reptiles,
          bird: publicData.bird,
          farm: publicData.farm,
          rabbit: publicData.rabbit,
          fish: publicData.fish,
          other: publicData.other,
          horse: publicData.horse,
          amenities: publicData.amenities 
        }}
        onSubmit={values => {
          const { 
            amenities = [],
            dog,
            cat,
            reptiles,
            bird,
            farm,
            rabbit,
            fish,
            horse,
            other } = values;

          const updatedValues = {
            publicData: 
            { amenities,
              dog,
              cat,
              reptiles,
              bird,
              farm,
              rabbit,
              fish,
              horse,
              other },
          };
          onSubmit(updatedValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        categories={config.custom.amenities}
        user_type ={ user_type}
        
      />
    </div>
  );
};

EditListingFeaturesPanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
  errors: null,
};



EditListingFeaturesPanel.propTypes = {
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

export default EditListingFeaturesPanel;
