import React from 'react'
import { bool, func, object, string } from 'prop-types'
import classNames from 'classnames'
import { FormattedMessage } from '../../util/reactIntl'
import { ensureOwnListing } from '../../util/data'
import { LISTING_STATE_DRAFT } from '../../util/types'
import { ListingLink } from '../../components'
import { EditListingTermsOfUseForm } from '../../forms'

import css from './EditListingTermsOfUsePanel.css'

const EditListingTermsOfUsePanel = (props) => {
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
  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT

  return (
    <div className={classes}>
      <h1 className={css.title}>
        {isPublished ? (
          <FormattedMessage
            id="EditListingTermsOfUsePanel.title"
            values={{ listingTitle: <ListingLink listing={listing} /> }}
          />
        ) : (
          <FormattedMessage id="EditListingTermsOfUsePanel.createListingTitle" />
        )}
      </h1>
      <p style={{fontSize: 14}}>Nashville For Hire does not use any blanket license of ownership for the musical works made through our website.
        <br /><br />
        You (the seller) can set up terms with your customers (work for hire's, percentage ownerships, royalties, etc.) as you feel the need to.
        <br /><br />
        Unless otherwise specified between yourself and the buyer,  purchases of your services are assumed to be a work for hire that attributes all rights to the buyer.
        <br /><br />
        Nashville For Hire receives no ownership or intellectual rights to the products, lyrics, songs, recordings, etc. that are transferred via nashvilleforhire.com
        <br /><br />
        You are a freelancer and not employed by Nashville For Hire.
        <br /><br />
        All orders that are initiated through Nashville For Hire must be processed and paid for through Nashville For Hire. We hate the culture of distrust that can exist in online communities, so we proactively extend trust to you that as a seller you will abide by that rule so we can have money to advertise and br /ing you more work and keep our business going.
        <br /><br />
        Nashville for Hire is free to use but keeps 7% of each transaction made.  In addition, there is a standard 2.9% fee that PayPal and Credit Card Processors charge for usage. Both these percentages come OUT of your set price of product and are NOT IN ADDITION TO your set price, so your set prices remain what each customer will pay.
        <br /><br />
        If you “Agree” to these terms, you are claiming to live within 1 hour (driving) of Nashville, Tennessee.
        <br /><br />
        Thank you for reading through these riveting terms of use and we are pumped to have you and your sweet skills on the roster.
        <br /><br />
        AGREE:<br />
      </p>
      <EditListingTermsOfUseForm
        className={css.form}
        listingId={currentListing.id}
        initialValues={[
          {
            key: 'agree',
            label: 'I agree to Terms of Use',
          }
        ]}
        name={'agree'}
        onSubmit={onSubmit}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateError={errors.updateListingError}
        updateInProgress={updateInProgress}
      />
    </div>
  )
}

EditListingTermsOfUsePanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
}

EditListingTermsOfUsePanel.propTypes = {
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

export default EditListingTermsOfUsePanel
