import React, { Component } from 'react'
import {
  array, bool, func, object, string
} from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import { FormattedMessage } from '../../util/reactIntl'
import { LISTING_STATE_DRAFT } from '../../util/types'
import { EditListingPhotosForm } from '../../forms'
import { ensureOwnListing } from '../../util/data'
import { ListingLink } from '..'

import css from './EditListingPhotosPanel.css'

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
    } = this.props

    const rootClass = rootClassName || css.root
    const classes = classNames(rootClass, className)
    const currentListing = ensureOwnListing(listing)
    const surfPhotos = _.get(currentListing.attributes.publicData, 'surfing.images', {})
    const colivingPhotos = _.get(currentListing.attributes.publicData, 'coliving.images', {})
    const coworkingPhotos = _.get(currentListing.attributes.publicData, 'coworking.images', {})
    const heroPhoto = _.get(currentListing.attributes.publicData, 'heroImage.id', {})
    let roomPhotos = {}
    _.get(currentListing.attributes.publicData, 'products', []).forEach((v) => { roomPhotos = { ...roomPhotos, ...v.photos || {} } })
    const allOtherPhotos = _.concat(_.keys(surfPhotos), _.keys(colivingPhotos), _.keys(coworkingPhotos), _.keys(roomPhotos), [heroPhoto])
    const imagesToShow = {}
    _.filter(images, (img) => !_.includes(allOtherPhotos, img.id.uuid)).forEach((v) => { imagesToShow[v.id.uuid] = {} })

    const isPublished
      = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT
    const panelTitle = isPublished ? (
      <FormattedMessage
        id="EditListingPhotosPanel.title"
        values={{ listingTitle: <ListingLink listing={listing} /> }}
      />
    ) : (
      <FormattedMessage id="EditListingPhotosPanel.createListingTitle" />
    )

    return (
      <div className={classes}>
        <h1 className={css.title}>{panelTitle}</h1>
        <EditListingPhotosForm
          className={css.form}
          disabled={disabled}
          ready={ready}
          fetchErrors={errors}
          initialValues={{ main: { images: imagesToShow } }}
          imagesToDisplay={imagesToShow}
          onImageUpload={onImageUpload}
          onSubmit={(values, shouldRedirect) => {
            const existingImages = _.get(listing, 'images', []).map((li) => li.id.uuid)
            const t = _.concat(existingImages, _.keys(values.main.images))
            const updateValues = {
              images: _.uniq(t)
            }
            onSubmit(updateValues, shouldRedirect === 'redirect')
          }}
          onChange={onChange}
          onUpdateImageOrder={onUpdateImageOrder}
          onRemoveImage={onRemoveImage}
          saveActionMsg={submitButtonText}
          updated={panelUpdated}
          updateInProgress={updateInProgress}
          showSubmitButton={true}
          readyForUpload={true}
        />
      </div>
    )
  }
}

EditListingPhotosPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  images: [],
  listing: null,
}

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
}

export default EditListingPhotosPanel
