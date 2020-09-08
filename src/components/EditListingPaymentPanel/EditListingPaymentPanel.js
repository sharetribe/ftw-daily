import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FormattedMessage } from '../../util/reactIntl'
import { LISTING_STATE_DRAFT } from '../../util/types'
import { ListingLink } from '../../components'
import { EditListingPaymentForm } from '../../forms'
import { ensureOwnListing } from '../../util/data'
import { types as sdkTypes } from '../../util/sdkLoader'
import config from '../../config'
import { ServiceTypeContext } from '../../context/ServiceTypeProvider'

import css from './EditListingPaymentPanel.css'

const { Money } = sdkTypes

const EditListingPaymentPanel = (props) => {
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

  // eslint-disable-next-line
  const [serviceType, setServiceType] = useContext(ServiceTypeContext)

  const classes = classNames(rootClassName || css.root, className)
  const currentListing = ensureOwnListing(listing)
  const { price } = currentListing.attributes

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingPaymentPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingPaymentPanel.createListingTitle" />
  )

  const priceCurrencyValid = price instanceof Money ? price.currency === config.currency : true
  const form = priceCurrencyValid ? (
    <EditListingPaymentForm
      serviceType={serviceType}
      className={css.form}
      initialValues={{ price }}
      onSubmit={onSubmit}
      onChange={onChange}
      saveActionMsg={submitButtonText}
      disabled={disabled}
      ready={ready}
      updated={panelUpdated}
      updateInProgress={updateInProgress}
      fetchErrors={errors}
    />
  ) : (
    <div className={css.priceCurrencyInvalid}>
      <FormattedMessage id="EditListingPaymentPanel.listingPriceCurrencyInvalid" />
    </div>
  )

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      {form}
    </div>
  )
}

const { func, object, string, bool } = PropTypes

EditListingPaymentPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
}

EditListingPaymentPanel.propTypes = {
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

export default EditListingPaymentPanel
