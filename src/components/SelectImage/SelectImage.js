import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { uploadImage } from '../../util/s3_storage'

import css from './SelectImage.css'

const SelectImage = (props) => {

  const { rootKey } = props

  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: async (acceptedFiles) => {
      setFiles(files.concat(acceptedFiles.map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))))
      acceptedFiles.map(async (f) => { await uploadImage(`${rootKey}/listings/`f) })
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
    currentUser
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
