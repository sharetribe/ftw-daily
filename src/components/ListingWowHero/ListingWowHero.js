import _ from 'lodash'
import React from 'react'
import SelectImage from '../SelectImage/SelectImage'

const ListingWowHero = (props) => {
  const {
    listingId,
    onImageSubmit,
    onImageDelete,
    form,
  } = props

  const addImageToProductAndComposeUpdateObject = (photoId, productId, params = {}) => {
    const t = 'get hero id'
    const b = _.remove(t, (p) => p.id === productId)[0]
    if (b) {
      b.photos = {
        ...b.photos,
        [photoId]: params
      }
    }
    return [...t, b].map((p, idx) => ({
      ...p,
      price: {
        amount: p.price.amount,
        currency: p.price.currency
      },
      order: _.isInteger(p.order) ? p.order : idx
    }))
  }

  const deleteImageFromProductAndComposeUpdateObject = (photoId, productId) => {
    const t = 'get hero id'
    const b = _.remove(t, (p) => p.id === productId)[0]
    if (b) {
      delete b.photos[photoId]
    }
    return [...t, b]
  }

  const updateListingProducts = (products) => {
    // props.updateListingAdHoc({
    //   id: listingId,
    //   publicData: {
    //     products
    //   }
    // })
  }

  return (
    <SelectImage
      onUpload={(photoId) => {
        onImageSubmit(photoId, listingId)
      }}
      onDelete={(photoId) => {
        onImageDelete(photoId, listingId)
      }}
      disabled={form.getState().invalid}
      imagesToDisplay={'img key'}
    />
  )
}
