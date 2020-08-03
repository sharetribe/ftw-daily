import React from 'react'
import _ from 'lodash'
import SelectImage from '../SelectImage/SelectImage'

const ListingImageSelectBlock = (props) => {
  const {
    form,
    values,
    formValuesKey,
    disabled
  } = props

  const key = `${formValuesKey}.images`

  form.registerField(
    key,
    (fieldState) => fieldState,
    {}
  )

  const updatePhotos = async (photoIds) => {
    const formState = form.getState().values
    const images = _.get(formState, key, {})
    const ids = _.xor(_.keys(images), photoIds)
    const newImages = {}
    ids.forEach((v) => {
      newImages[v] = {}
    })
    const update = _.defaults(images, newImages)
    form.change(key, update)
    await form.submit()
  }

  const deletePhoto = async (photoid) => {
    const formState = form.getState().values
    const images = _.get(formState, key, {})
    delete images[photoid]
    form.change(key, images)
    await form.submit()
  }

  return (
    <SelectImage
      onUpload={ async (photoIds) => {
        await updatePhotos(photoIds)
      }}
      onDelete={ async (photoId) => {
        await deletePhoto(photoId)
      }}
      imagesToDisplay={_.keys((values[formValuesKey] || {}).images)}
      disabled={disabled}
      showThumbnails={true}
    />
  )
}

export default ListingImageSelectBlock
