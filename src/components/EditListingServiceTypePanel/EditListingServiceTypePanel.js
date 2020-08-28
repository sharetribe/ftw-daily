import React from 'react'
import { bool, func, object, string } from 'prop-types'
import classNames from 'classnames'
import { FormattedMessage } from '../../util/reactIntl'
import { ensureOwnListing } from '../../util/data'
import { findOptionsForSelectFilter } from '../../util/search'
import { LISTING_STATE_DRAFT } from '../../util/types'
import { ListingLink } from '../../components'
import { EditListingServiceTypeForm } from '../../forms'
import config from '../../config'

import css from './EditListingServiceTypePanel.css'

const EditListingServiceTypePanel = (props) => {
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
      id="EditListingServiceTypePanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingServiceTypePanel.createListingTitle" />
  )

  // TODO: Extract this similar to <FormattedMessage />
  const panelInformation = (<p style={{fontSize: 14}}><em>Please choose only one Service Type for this listing. If you have been approved to list multiple services on the site, you can complete a separate listing for the other services.</em></p>)

  const categoryOptions = findOptionsForSelectFilter('category', config.custom.filters)
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      {panelInformation}
      <EditListingServiceTypeForm
        className={css.form}
        initialValues={{ title, description, category: publicData.category }}
        saveActionMsg={submitButtonText}
        onSubmit={(values) => {
          const { title, description, category } = values
          const updateValues = {
            title: title.trim(),
            description,
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

EditListingServiceTypePanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
}

EditListingServiceTypePanel.propTypes = {
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

export default EditListingServiceTypePanel
