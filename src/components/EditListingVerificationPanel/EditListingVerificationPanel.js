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
    const { publicData } = currentListing.attributes || {};
    const { idProofImage,idPoliceImage } = publicData || {}; //, idProofImageId
    const { policeCheck } = publicData || {};
    const isPublished =
      currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
    const panelTitle = isPublished ? (
      <FormattedMessage
        id="EditListingVeificationPanel.title"
        values={{ listingTitle: <ListingLink listing={listing} /> }}
      />
    ) : (
      <FormattedMessage id="EditListingVeificationPanel.createListingTitle" />
    );

   

    return (
      <div className={classes}>
        <h1 className={css.title}>{panelTitle}</h1>

        <EditListingVerificationForm
          className={css.form}
          disabled={disabled}
          ready={ready}
          fetchErrors={errors}
          // mainImageId={idProofImage}
          initialValues={{ idProofImage,policeCheck ,idPoliceImage}}
          images={images}
          onImageUpload={onImageUpload}
          onSubmit={values => {
            const { idProofImage,policeCheck,idPoliceImage } = values;
            const updateValues = {
              publicData: {
                idProofImage,
                idPoliceImage,
                policeCheck
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
