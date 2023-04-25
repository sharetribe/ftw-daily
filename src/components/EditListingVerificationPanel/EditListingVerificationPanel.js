import React, { Component } from 'react';
import { array, bool, func, object, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { EditListingVerificationForm } from '../../forms';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '..';

import css from './EditListingVerificationPanel.module.css';

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
      onImageUpload,
      onUpdateImageverificationOrder,
      submitButtonText,
      panelUpdated,
      updateInProgress,
      onChange,
      onSubmit,
     
      onRemoveImageverification,
    } = this.props;

    const rootClass = rootClassName || css.root;
    const classes = classNames(rootClass, className);
    const currentListing = ensureOwnListing(listing);
    console.log('currentListing', currentListing)
    const { publicData } = currentListing.attributes || {};
   // const { idProofImageId } = publicData || {};

   const viewimage = publicData && publicData.idProofImage?.link
   console.log('viewimage', viewimage)

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

    // const idProofImage = images && images.length
    //   ? images.filter(image => image.imageType == 'idProofImage').length
    //     ? images.filter(image => image.imageType == 'idProofImage')[images.filter(image => image.imageType == 'idProofImage').length - 1]
    //     : images.filter(image => idProofImageId && image.id && image.id.uuid == idProofImageId).length
    //       ? images.filter(image => idProofImageId && image.id && image.id.uuid == idProofImageId)[0]
    //       : []
    //   : [];

    return (
      <div className={classes}>
        <h1 className={css.title}>{panelTitle}</h1>

        <EditListingVerificationForm
          className={css.form}
          disabled={disabled}
          ready={ready}
          fetchErrors={errors}
         // mainImageId={idProofImage}
          initialValues={{ images,publicData:publicData.idProofImage }}
          images={images}
          viewimage={viewimage}
          onImageUpload={onImageUpload}
          onSubmit={values => {
            const { idProofImage} = values;

           const updateValues = {
              publicData: {
                idProofImage
              },
            };
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
  images: [],
  listing: null,
};

EditListingVerificationPanel.propTypes = {
  className: string,
  rootClassName: string,
  errors: object,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  images: array,

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
