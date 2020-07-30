import React from 'react'
import { ResponsiveImage } from '../../components'
import ActionBarMaybe from './ActionBarMaybe'

import css from './ListingPage.css'

const ListingHero = (props) => {
  const {
    title,
    listing,
    isOwnListing,
    editParams
  } = props

  const hasImages = listing.images && listing.images.length > 0
  const firstImage = hasImages ? listing.images[0] : null

  const actionBar = listing.id ? (
    <div onClick={(e) => e.stopPropagation()}>
      <ActionBarMaybe isOwnListing={isOwnListing} listing={listing} editParams={editParams} />
    </div>
  ) : null

  return (
    <div className={css.heroContainer}>
      {actionBar}
      <ResponsiveImage
        rootClassName={css.heroImage}
        alt={title}
        image={firstImage}
        variants={[
          'scaled-medium',
          'scaled-large',
        ]}
      />
      <div className={css.heroTextContainer}>
        <h1 className={css.heroTitle}>{title}</h1>
        <h2 className={css.heroDescription}>{listing.attributes.description}</h2>
      </div>
    </div>
  )
}

export default ListingHero
