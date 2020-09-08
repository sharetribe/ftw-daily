import React from 'react'
import { bool, func, object, string } from 'prop-types'
import classNames from 'classnames'
import { FormattedMessage } from '../../util/reactIntl'
import { ensureOwnListing } from '../../util/data'
import { findOptionsForSelectFilter } from '../../util/search'
import { LISTING_STATE_DRAFT } from '../../util/types'
import { ListingLink } from '../../components'
import { EditListingAboutYouForm } from '../../forms'
import config from '../../config'

import css from './EditListingAboutYouPanel.css'

const EditListingAboutYouPanel = (props) => {
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
      id="EditListingAboutYouPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingAboutYouPanel.createListingTitle" />
  )

  const categoryOptions = findOptionsForSelectFilter('category', config.custom.filters)
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingAboutYouForm
        className={css.form}
        initialValues={{ title, description, category: publicData.category }}
        saveActionMsg={submitButtonText}
        onSubmit={(values) => {
          const { title, category } = values
          const updateValues = {
            title: title.trim(),
            publicData: { category },
          }

          onSubmit(updateValues)
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        categories={categoryOptions}
      />
    </div>
  )
}

EditListingAboutYouPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
}

EditListingAboutYouPanel.propTypes = {
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

export default EditListingAboutYouPanel
