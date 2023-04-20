import React, { Component } from 'react';
import { array, bool, func, object, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { EditListingPhotosForm } from '../../forms';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '../../components';

import css from './EditListingPhotosPanel.module.css';

class EditListingPhotosPanel extends Component {
  render() {
    const {
      className,
      rootClassName,
      errors,
      disabled,
      ready,
      images,
      listing,
      onImageUpload,
      onUpdateImageOrder,
      submitButtonText,
      panelUpdated,
      updateInProgress,
      onChange,
      onSubmit,
      onRemoveImage,
    } = this.props;

    const rootClass = rootClassName || css.root;
    const classes = classNames(rootClass, className);
    const currentListing = ensureOwnListing(listing);
    const { publicData } = currentListing.attributes || {};
    const { idProofImageId } = publicData || {};    
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

    const idProofImage = images && images.length
      ? images.filter(image => image.imageType == 'idProofImage').length
        ? images.filter(image => image.imageType == 'idProofImage')[images.filter(image => image.imageType == 'idProofImage').length - 1]
        : images.filter(image => idProofImageId && image.id && image.id.uuid == idProofImageId).length
          ? images.filter(image => idProofImageId && image.id && image.id.uuid == idProofImageId)[0]
          : []
      : [];
    const restImages = images && images.length
      ? idProofImageId
        ? images.filter(image => !image.imageType && idProofImageId && image.id && (!image.id.uuid || (image.id.uuid && image.id.uuid != idProofImageId)))
        : images.filter(image => !image.imageType)
      : [];

    return (
      <div className={classes}>
        <h1 className={css.title}>{panelTitle}</h1>
        <EditListingPhotosForm
          className={css.form}
          disabled={disabled}
          ready={ready}
          fetchErrors={errors}
          initialValues={{ images }}
          images={restImages}
          onImageUpload={onImageUpload}
          onSubmit={values => {
            const { addImage, ...updateValues } = values;
            if (idProofImageId && idProofImage && Object.keys(idProofImage).length) {
              updateValues.images.push(idProofImage);
            }
            onSubmit(updateValues);
          }}
          onChange={onChange}
          onUpdateImageOrder={onUpdateImageOrder}
          onRemoveImage={onRemoveImage}
          saveActionMsg={submitButtonText}
          updated={panelUpdated}
          updateInProgress={updateInProgress}
        />
      </div>
    );
  }
}

EditListingPhotosPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  images: [],
  listing: null,
};

EditListingPhotosPanel.propTypes = {
  className: string,
  rootClassName: string,
  errors: object,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  images: array,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  onRemoveImage: func.isRequired,
};

export default EditListingPhotosPanel;
