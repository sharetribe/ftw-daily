import React, { useEffect, useState } from 'react'
import PropTypes, {
  bool, func, object, string
} from 'prop-types'
import { useDropzone } from 'react-dropzone'
import _ from 'lodash'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { v4 as uuid } from 'uuid'
import {
  asyncRequestImageUpload,
} from '../../containers/EditListingPage/EditListingPage.duck'
import { uploadImage } from '../../util/s3_storage'
import RemoveImageButton from '../AddImages/RemoveImageButton'
import IconSpinner from '../IconSpinner/IconSpinner'

import css from './SelectImage.css'

const SelectImage = (props) => {
  const {
    rootKeySegments = [],
    onUpload,
    onDelete,
    disabled,
    imagesToDisplay = [],
    showThumbnails = true,
    onProgressCallback,
    uploadImageToST,
    allImages,
    multiple,
    uploadToS3

  } = props

  const sleep = async () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 5000)
    })
    return promise
  }

  const s3Upload = async (id, file) => {
    await uploadImage(id, file)
    // await sleep()
  }

  const buildImagesToDisplay = () => {
    return imagesToDisplay.map((img) => {
      const url = _.get(allImages, `[${img}].attributes.variants["scaled-small"].url`)
      return {
        name: img,
        preview: url
      }
    })
  }

  const runOnProgressCallback = (workingFiles) => {
    if (onProgressCallback) {
      onProgressCallback(workingFiles)
    }
  }

  const [files, setFiles] = useState(buildImagesToDisplay())
  const [workingFiles, setWorkingFiles] = useState([])

  const onImageDelete = async (fileName) => {
    setFiles(files.filter((f) => f.name !== fileName))
    onDelete(fileName)
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png, image/jpg',
    multiple,
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
      const wf = [...workingFiles, ...keys]
      setWorkingFiles(wf)
      runOnProgressCallback(wf)

      // upload ALL images to the backend first
      const b = a.map((f, idx) => {
        return uploadImageToST({ file: f.file, id: f.name })
      })
      // once all the promises resolve then we save them to the listing
      // and the product
      Promise.all(b).then(async (r) => {
        const ids = r.map((rsp) => rsp.uuid)
        if (uploadToS3) {
          try {
            await s3Upload(ids[0], a[0].file)
          } catch (e) {
            console.log(`Unable to upload temp image: ${e}`)
          }
        }
        await onUpload(ids)
        const newWorkingFiles = _.difference(workingFiles, ids)
        setWorkingFiles(newWorkingFiles)
        runOnProgressCallback(newWorkingFiles)
      })
      if (showThumbnails) {
        setFiles(files.concat(a.map((file, idx) => Object.assign(file, {
          preview: URL.createObjectURL(file.file),
          name: file.name
        }))))
      }
    },
    disabled
  })

  const thumbs = files.map((file) => {
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
        {
          _.includes(workingFiles, file.name)
            ? null
            : <RemoveImageButton onClick={() => onImageDelete(file.name)} />
        }
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
          disabled ? <p>Please enter in the above information before uploading photos</p>
            : <div className={css.textContainer}>
              <p>Drag 'n drop photos here, or click to select files</p>
              <small>JPEG or PNG</small>
            </div>
        }
      </div>
      <aside className={css.thumbContainer}>
        { showThumbnails ? thumbs : null}
      </aside>
    </section>
  )
}

const mapStateToProps = (state) => {
  const { currentUser } = state.user

  return {
    userId: _.get(currentUser, 'id.uuid'),
    allImages: _.get(state.marketplaceData, 'entities.image')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImageToST: (params) => dispatch(asyncRequestImageUpload(params))
  }
}

const SelectImageComponent = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(SelectImage)

export default SelectImageComponent
