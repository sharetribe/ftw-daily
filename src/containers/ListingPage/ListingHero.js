import React from 'react'
import get from 'lodash/get'
import { FormattedMessage } from '../../util/reactIntl'
import { ResponsiveImage } from '../../components'
import ActionBarMaybe from './ActionBarMaybe'

import css from './ListingPage.css'

const ListingHero = (props) => {
  const {
    title,
    listing,
    isOwnListing,
    editParams,
    handleViewPhotosClick
  } = props

  const hasImages = listing.images && listing.images.length > 0
  const firstImage = hasImages ? listing.images[0] : null

  const actionBar = listing.id ? (
    <div onClick={(e) => e.stopPropagation()}>
      <ActionBarMaybe isOwnListing={isOwnListing} listing={listing} editParams={editParams} />
    </div>
  ) : null

  const viewPhotosButton = hasImages ? (
    <button className={css.viewPhotos} onClick={handleViewPhotosClick}>
      <FormattedMessage
        id="ListingPage.viewImagesButton"
        values={{ count: listing.images.length }}
      />
    </button>
  ) : null

  return (
    <div className={css.heroContainer}>
      {actionBar}
      <ResponsiveImage
        rootClassName={css.heroImage}
        alt={title}
        image={firstImage}
        variants={[
          'landscape-crop',
          'landscape-crop2x',
          'landscape-crop4x',
          'landscape-crop6x',
        ]}
      />
      <div className={css.heroDarkener}/>
      <div className={css.heroTextContainer}>
        <h1 className={css.heroTitle}>{title}</h1>
        <h2 className={css.heroDescription}>{get(listing, 'attributes.publicData.heroSubtitle')}</h2>
      </div>
      {viewPhotosButton}
    </div>
  )
}

export default ListingHero
