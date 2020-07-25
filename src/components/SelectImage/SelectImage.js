import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import _ from 'lodash'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { v4 as uuid } from 'uuid'
import { updateListingAdHoc } from '../../containers/EditListingPage/EditListingPage.duck';
import { buildKey, uploadImage } from '../../util/s3_storage'

import css from './SelectImage.css'

const SelectImage = (props) => {
  const {
    userId,
    rootKeySegments,
    onUpload
  } = props

  const [files, setFiles] = useState([])

  const onImageUploaded = async (file) => {
    const pid = uuid()
    console.log(pid)
    await uploadImage(`${userId}/${buildKey(rootKeySegments)}/${pid}`, file)
    onUpload(pid)
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: async (acceptedFiles) => {
      acceptedFiles.map(async (f, idx) => {
        await onImageUploaded(f)
      })
      setFiles(files.concat(acceptedFiles.map((file, idx) => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))))
    }
  })

  const thumbs = files.map((file) => (
    <div className={css.thumb} key={file.name}>
      <div className={css.thumbInner}>
        <img
          src={file.preview}
          className={css.thumbImage}
        />
      </div>
    </div>
  ))

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <section className="container">
      <div {...getRootProps({ className: css.root })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
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
