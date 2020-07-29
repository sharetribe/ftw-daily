import _ from 'lodash'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  requestImageUpload,
  updateListingAdHoc,
} from '../../containers/EditListingPage/EditListingPage.duck'
import IconSpinner from '../IconSpinner/IconSpinner'
import ResponsiveImage from '../ResponsiveImage/ResponsiveImage'
import SelectImage from '../SelectImage/SelectImage'
import { types as sdkTypes } from '../../util/sdkLoader'

import css from './ListingEditWowHero.css'

const { UUID } = sdkTypes

const ListingEditWowHero = (props) => {
  const [tempImageId, setTempImageId] = useState('5ee3b41b-72d7-4d66-b50d-71508891f5cb')
  const [isUploading, setIsUploading] = useState(false)

  const {
    listing,
    form,
    values
  } = props

  const addImageToProductAndComposeUpdateObject = async (photoId) => {
    const images = (listing.images || []).map((img) => img.id)
    images.unshift(new UUID(photoId))
    if (listing.id) {
      await props.updateListingAdHoc({
        id: listing.id.uuid,
        publicData: {
          heroImage: {
            id: photoId
          }
        },
        images
      })
    } else {
      setTempImageId(photoId)
    }
  }

  const firstImage
    = listing.images && listing.images.length > 0 ? listing.images[0] : null

  return (
    <div>
      <div className={css.heroContainer}>
        <ResponsiveImage
          rootClassName={css.rootForImage}
          alt={'The hero image that will be the first thing users see in searches and on the listing page'}
          image={firstImage}
          variants={[
            'landscape-crop',
            'landscape-crop2x',
            'landscape-crop4x',
            'landscape-crop6x',
          ]}
        />
        <div className={css.heroTextContainer}>
          <h1 className={css.heroTitle}>{values.title || 'Titles On Titles'}</h1>
          <h2 className={css.heroDescription}>{values.description || 'Set the scene with a reason why you love where you live'}</h2>
        </div>
        {
          isUploading
            ? <div className={css.spinnerContainer}>
              <IconSpinner />
            </div>
            : null
        }
      </div>
      <SelectImage
        onUpload={(photoId) => {
          addImageToProductAndComposeUpdateObject(photoId)
        }}
        showThumbnails={false}
        onProgressCallback={(wfs) => {
          console.log(wfs)
          setIsUploading(wfs.length)
        }}
      />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateListingAdHoc: (update) => dispatch(updateListingAdHoc(update)),
    uploadImage: (params) => dispatch(requestImageUpload(params))
  }
}

export default connect(null, mapDispatchToProps)(ListingEditWowHero)
