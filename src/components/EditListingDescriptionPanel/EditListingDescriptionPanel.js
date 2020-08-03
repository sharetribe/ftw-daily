import React from 'react'
import {
  bool, func, object, string
} from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import { FormattedMessage } from '../../util/reactIntl'
import { ensureOwnListing } from '../../util/data'
import { ListingLink } from '..'
import { LISTING_STATE_DRAFT } from '../../util/types'
import { EditListingDescriptionForm } from '../../forms'
import config from '../../config'

import css from './EditListingDescriptionPanel.css'

const EditListingDescriptionPanel = (props) => {
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
  const { publicData } = currentListing.attributes

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingDescriptionPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingDescriptionPanel.createListingTitle" />
  )

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingDescriptionForm
        className={css.form}
        initialValues={{
          title: currentListing.attributes.title,
          description: currentListing.attributes.description,
          category: publicData.category,
          surf: publicData.surf,
          vibe: publicData.vibe,
          community: publicData.community,
          retreat: publicData.retreat,
          video: publicData.video,
          heroImageId: _.get(publicData, 'heroImage.id', '')
        }}
        saveActionMsg={submitButtonText}
        onSubmit={(values, shouldRedirect) => {
          const {
            title,
            description,
            category,
            surf, vibe, community, wifi, retreat, video, heroImageId
          } = values
          const images = (listing.images || []).map((img) => img.id.uuid)
          const updateValues = {
            title: title.trim(),
            description,
            publicData: {
              category,
              surf,
              vibe,
              community,
              wifi,
              retreat,
              video,
              heroImage: {
                id: heroImageId
              }
            },
            images: _.uniq([...images, heroImageId])
          }

          onSubmit(updateValues, shouldRedirect === 'redirect')
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

EditListingDescriptionPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
}

EditListingDescriptionPanel.propTypes = {
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

export default EditListingDescriptionPanel
