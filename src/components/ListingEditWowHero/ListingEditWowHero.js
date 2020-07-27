import _ from 'lodash'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateListingAdHoc } from '../../containers/EditListingPage/EditListingPage.duck'
import IconSpinner from '../IconSpinner/IconSpinner'
import SelectImage from '../SelectImage/SelectImage'

import css from './ListingEditWowHero.css'

const ListingEditWowHero = (props) => {
  const [tempImageId, setTempImageId] = useState('5ee3b41b-72d7-4d66-b50d-71508891f5cb')
  const [isUploading, setIsUploading] = useState([])

  const {
    listing,
    form,
    values
  } = props

  const publicData = _.get(listing, 'attributes.publicData')

  const addImageToProductAndComposeUpdateObject = (photoId, params = {}) => {
    if (listing.id) {
      props.updateListingAdHoc({
        id: listing.id.uuid,
        publicData: {
          heroImage: {
            id: photoId
          }
        }
      })
    } else {
      setTempImageId(photoId)
    }
  }

  const buildImageUrl = () => {
    let width
    let height
    if (window) {
      if (window.innerWidth <= 1024) {
        width = window.innerWidth
        height = 500
      } else {
        width = 836
        height = Math.round((width / 16) * 9)
      }
    }
    if (publicData.heroImage) {
      return `${process.env.REACT_APP_IMGIX_URL}/${publicData.heroImage.id}?fm=jpm&h=${height}&w=${width}&fit=crop`
    }
    return `${process.env.REACT_APP_IMGIX_URL}/${tempImageId}?fm=jpm&h=${height}&w=${width}&fit=crop`
  }

  return (
    <div>
      <div className={css.heroContainer}>
        <img className={css.heroImage} src={buildImageUrl()} alt="Hero image for demonstration"/>
        <div className={css.heroTextContainer}>
          <h1 className={css.heroTitle}>{values.title || 'Titles On Titles'}</h1>
          <h2 className={css.heroDescription}>{values.description || 'Set the scene with a reason why you love where you live'}</h2>
        </div>
        {
          isUploading.length
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
        onProgressCallback={setIsUploading}
      />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateListingAdHoc: (update) => dispatch(updateListingAdHoc(update))
  }
}

export default connect(null, mapDispatchToProps)(ListingEditWowHero)
