import React from 'react'
import {
  bool, func, object, string
} from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import EditListingColivingForm
  from '../../forms/EditListingColivingForm/EditListingColivingForm'
import { FormattedMessage } from '../../util/reactIntl'
import { ensureOwnListing } from '../../util/data'
import { ListingLink } from '..'
import { LISTING_STATE_DRAFT } from '../../util/types'
import config from '../../config'

import css from './EditListingColivingPanel.css'

const EditListingColivingPanel = (props) => {
  const {
    className,
    rootClassName,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props

  const classes = classNames(rootClassName || css.root, className)
  const currentListing = ensureOwnListing(listing)
  const { description, title, publicData } = currentListing.attributes

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingColivingPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingColivingPanel.createListingTitle" />
  )

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingColivingForm
        className={css.form}
        initialValues={{
          coliving: publicData.coliving
        }}
        saveActionMsg={submitButtonText}
        onSubmit={(values) => {
          console.log(listing)
          const existingImages = _.get(listing, 'images', []).map((li) => li.id.uuid)
          console.log(existingImages)
          console.log(_.concat(existingImages, _.keys(values.coliving.images)))
          const t = _.concat(existingImages, _.keys(values.coliving.images))
          const updateValues = {
            publicData: {
              coliving: {
                ...values.coliving
              },
            },
            images: t
          }
          onSubmit(updateValues)
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        categories={config.custom.categories}
        listing={currentListing}
      />
    </div>
  )
}

EditListingColivingPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
}

EditListingColivingPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
}

export default EditListingColivingPanel
