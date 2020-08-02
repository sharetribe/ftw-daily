import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import { FormattedMessage } from '../../util/reactIntl'
import { LISTING_STATE_DRAFT } from '../../util/types'
import { ListingLink } from '..'
import { EditListingProductsForm } from '../../forms'
import { ensureOwnListing } from '../../util/data'

import css from './EditListingProductsPanel.css'

const EditListingProductsPanel = (props) => {
  const {
    className,
    rootClassName,
    listing,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
    images,
    disabled,
    ready
  } = props

  const classes = classNames(rootClassName || css.root, className)
  const currentListing = ensureOwnListing(listing)
  const { publicData } = currentListing.attributes

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingProductsPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingProductsPanel.createListingTitle" />
  )

  const products = publicData && publicData.products

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingProductsForm
        className={css.form}
        initialValues={{ products: _.sortBy(products, 'order') }}
        onSubmit={(values) => {
          onSubmit({
            publicData: {
              products: values.products.map((p, idx) => {
                return {
                  ...p,
                  price: {
                    amount: p.price.amount,
                    currency: p.price.currency
                  },
                  order: _.isInteger(p.order) ? p.order : idx
                }
              })
            }
          })
        }}
        onImageSubmit={(values, prods) => {
          const { addImage, ...updateValues } = values
          onSubmit({
            ...updateValues,
            publicData: {
              products: prods
            }
          })
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        images={images}
        panelUpdated={panelUpdated}
        updateInProgress={updateInProgress}
        disabled={disabled}
        ready={ready}
        fetchErrors={errors}
        listing={listing}
        products={products || []}
      />
    </div>
  )
}

const {
  func, object, string, bool
} = PropTypes

EditListingProductsPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
}

EditListingProductsPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
}

export default EditListingProductsPanel
