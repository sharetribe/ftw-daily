import React, { Component } from 'react';
import { array, bool, func, object, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { EditListingPhotosForm } from '../../forms';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '../../components';
// import EditListingVerificationFormComponent from '../../forms'

import css from './EditListingPhotosPanel.module.css';
import { EditListingVerificationFormComponent } from '../../forms/EditListingVerificationfForm /EditListingVerificationForm';

class EditListingVerificationPanel extends Component {
  render() {
    const {
      className,
      rootClassName,
      errors,
      disabled,
      ready,
      images,
      listing,
      requestImageUpload,
      onImageUpload,
      imageType,
      mainImageId,
      onUpdateImageverificationOrder,
      submitButtonText,
      panelUpdated,
      updateInProgress,
      onChange,
      onSubmit,
      onRemoveImageverification,
    } = this.props;
    console.log('imageType', imageType)
console.log('images', images)
    const rootClass = rootClassName || css.root;
    const classes = classNames(rootClass, className);
    const currentListing = ensureOwnListing(listing);

    const isPublished =
      currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
    const panelTitle = isPublished ? (
      <FormattedMessage
        id="EditListingPhotosPanel.title"
        values={{ listingTitle: <ListingLink listing={listing} /> }}
      />
    ) : (
      <FormattedMessage id="EditListingPhotosPanel.createListingTitle" />
    );
    // const restImages = images && images.length
    //   ? mainImageId
    //     ? images.filter(image => !image.imageType && mainImageId && image.id && (!image.id.uuid || (image.id.uuid && image.id.uuid != mainImageId)))
    //     : images.filter(image => !image.imageType)
    //   : [];
    const idProofImage = images && images.length
      ? images.filter(image => image.imageType == 'idProofImage').length
        ? images.filter(image => image.imageType == 'idProofImage')[images.filter(image => image.imageType == 'idProofImage').length - 1]
        : images.filter(image => mainImageId && image.id && image.id.uuid == mainImageId).length
          ? images.filter(image => mainImageId && image.id && image.id.uuid == mainImageId)[0]
          : []
      : [];

    return (
      <div className={classes}>
        <h1 className={css.title}>{panelTitle}</h1>
       
        <EditListingVerificationFormComponent
          className={css.form}
          disabled={disabled}
          ready={ready}
          fetchErrors={errors}
          mainImageId={idProofImage}
          initialValues={{ images }}
          images={images}
          onImageUpload={onImageUpload}
          onSubmit={values => {
            const { idProofImage: dummyidProofImage, ...updateValues } = values;
            if (idProofImage && idProofImage.imageId && idProofImage.imageId.uuid) {
               if (updateValues.images && updateValues.images.length) {
                updateValues.images.push(idProofImage);
              } else {
                updateValues.images = [idProofImage];
              }
            }else{
              if (updateValues.images && updateValues.images.length) {
                 updateValues.images.push(idProofImage);
              } else {
                 updateValues.images = [idProofImage];
              }
            }
            if (updateValues.images && updateValues.images.length) {
              if (mainImageId) {
                updateValues.images.filter(image => image.id.uuid != mainImageId);
              }
              Object.assign(updateValues, {
                publicData: {
                  idProofImageId: idProofImage?.imageId?.uuid ? idProofImage?.imageId?.uuid : mainImageId ? mainImageId : '',
                 
                }
              });
            }
            onSubmit(updateValues);
          }}
          onChange={onChange}
          onUpdateImageverificationOrder={onUpdateImageverificationOrder}
          onRemoveImageverification={onRemoveImageverification}
          saveActionMsg={submitButtonText}
          updated={panelUpdated}
          updateInProgress={updateInProgress}
        />
      </div>
    );
  }
}

EditListingVerificationPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  images:[],
  listing: null,
};

EditListingVerificationPanel.propTypes = {
  className: string,
  rootClassName: string,
  errors: object,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  images:array,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  onImageverificationUpload: func.isRequired,
  onUpdateImageverificationOrder: func.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  onRemoveImageverification: func.isRequired,
};

export default EditListingVerificationPanel;
