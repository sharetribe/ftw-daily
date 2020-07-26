import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import _ from 'lodash'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { v4 as uuid } from 'uuid'
import { updateListingAdHoc } from '../../containers/EditListingPage/EditListingPage.duck'
import { buildKey, deleteImage, uploadImage } from '../../util/s3_storage'
import RemoveImageButton from '../AddImages/RemoveImageButton'
import IconSpinner from '../IconSpinner/IconSpinner'

import css from './SelectImage.css'

const SelectImage = (props) => {
  const {
    userId,
    rootKeySegments = [],
    onUpload,
    onDelete,
    disabled,
    imagesToDisplay = []
  } = props

  const buildImagesToDisplay = () => {
    return imagesToDisplay.map((img) => ({
      name: img,
      preview: `https://coworksurf.imgix.net/public/${userId}/${img}?fm=jpm&h=100&fit=clip`
    }))
  }

  const [files, setFiles] = useState(buildImagesToDisplay())
  const [workingFiles, setWorkingFiles] = useState([])

  const onImageUploaded = async (file) => {
    let path
    if (rootKeySegments.length > 0) {
      path = `${userId}/${buildKey(rootKeySegments)}/${file.name}`
    } else {
      path = `${userId}/${file.name}`
    }

    await uploadImage(path, file.file)
    onUpload(file.name)
    setWorkingFiles(workingFiles.filter((f) => f !== file.name))
  }

  const onImageDelete = async (fileName) => {
    let path
    if (rootKeySegments.length > 0) {
      path = `${userId}/${buildKey(rootKeySegments)}/${fileName}`
    } else {
      path = `${userId}/${fileName}`
    }
    setFiles(files.filter((f) => f.name !== fileName))
    await deleteImage(path)
    onDelete(fileName)
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png, image/jpg',
    onDrop: async (acceptedFiles) => {
      const keys = []
      const a = acceptedFiles.map((f1) => {
        const id = uuid()
        keys.push(id)
        return {
          file: f1,
          name: id
        }
      })
      setWorkingFiles([...workingFiles, ...keys])
      a.map(async (f, idx) => {
        await onImageUploaded(f)
      })
      setFiles(files.concat(a.map((file, idx) => Object.assign(file, {
        preview: URL.createObjectURL(file.file),
        name: file.name
      }))))
    },
    disabled
  })

  console.log(workingFiles)

  const thumbs = files.map((file) => {
    console.log(workingFiles)
    console.log(file.name)
    console.log(_.includes(workingFiles, file.name))
    return (
      <div className={css.thumb} key={file.name}>
        <div className={css.thumbInner}>
          <img
            src={file.preview}
            className={css.thumbImage}
          />
          {
            _.includes(workingFiles, file.name)
              ? <div className={css.spinnerContainer}>
                <IconSpinner />
              </div>
              : null
          }
        </div>
        <RemoveImageButton onClick={() => onImageDelete(file.name)} />
      </div>
    )
  })

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <section className="container">
      <div {...getRootProps({ className: css.root })}>
        <input {...getInputProps()} />
        {
          disabled ? <p>Enter in the above information before uploading photos</p>
            : <div className={css.textContainer}>
              <p>Drag 'n' drop some photos here, or click to select photos</p>
              <small>JPEG or PNG</small>
            </div>
        }
      </div>
      <aside className={css.thumbContainer}>
        {thumbs}
      </aside>
    </section>
  )
}

const mapStateToProps = (state) => {
  const { currentUser } = state.user
  return {
    userId: _.get(currentUser, 'id.uuid')
  }
}

const SelectImageComponent = compose(
  connect(
    mapStateToProps,
    null
  ),
  injectIntl
)(SelectImage)

export default SelectImageComponent
