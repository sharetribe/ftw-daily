import React, { Component } from 'react'
import {
  array, bool, func, shape, string
} from 'prop-types'
import { compose } from 'redux'
import { useDropzone } from 'react-dropzone'
import { Form as FinalForm, Field } from 'react-final-form'
import isEqual from 'lodash/isEqual'
import classNames from 'classnames'
import IconSpinner from '../../components/IconSpinner/IconSpinner'
import IconSuccess from '../../components/IconSuccess/IconSuccess'
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl'
import { propTypes } from '../../util/types'
import { nonEmptyArray, composeValidators } from '../../util/validators'
import { isUploadImageOverLimitError } from '../../util/errors'
import {
  AddImages, Button, Form, ValidationError
} from '../../components'

import css from './EditListingPhotosForm.css'

const ACCEPT_IMAGES = 'image/*'

export class EditListingPhotosFormComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { imageUploadRequested: false }
    this.onImageUploadHandler = this.onImageUploadHandler.bind(this)
    this.submittedImages = []
  }

  async onImageUploadHandler(file) {
    if (file) {
      this.setState({ imageUploadRequested: true })
      try {
        await this.props.onImageUpload({ id: `${file.name}_${Date.now()}`, file })
        this.setState({ imageUploadRequested: false })
        return
      } catch (e) {
        this.setState({ imageUploadRequested: false })
      }
    }
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        onImageUploadHandler={this.onImageUploadHandler}
        imageUploadRequested={this.state.imageUploadRequested}
        initialValues={{ images: this.props.images }}
        render={(formRenderProps) => {
          const {
            form,
            className,
            fetchErrors,
            handleSubmit,
            images,
            imageUploadRequested,
            intl,
            invalid,
            onImageUploadHandler,
            onRemoveImage,
            disabled,
            ready,
            saveActionMsg,
            updated,
            updateInProgress,
            imagesToDisplay
          } = formRenderProps

          const chooseImageText = (
            <span className={css.chooseImageText}>
              <span className={css.chooseImage}>
                <FormattedMessage id="EditListingPhotosForm.chooseImage" />
              </span>
              <span className={css.imageTypes}>
                <FormattedMessage id="EditListingPhotosForm.imageTypes" />
              </span>
            </span>
          )

          const imageRequiredMessage = intl.formatMessage({
            id: 'EditListingPhotosForm.imageRequired',
          })

          const {
            publishListingError, showListingsError, updateListingError, uploadImageError
          }
            = fetchErrors || {}
          const uploadOverLimit = isUploadImageOverLimitError(uploadImageError)

          let uploadImageFailed = null

          if (uploadOverLimit) {
            uploadImageFailed = (
              <p className={css.error}>
                <FormattedMessage id="EditListingPhotosForm.imageUploadFailed.uploadOverLimit" />
              </p>
            )
          } else if (uploadImageError) {
            uploadImageFailed = (
              <p className={css.error}>
                <FormattedMessage id="EditListingPhotosForm.imageUploadFailed.uploadFailed" />
              </p>
            )
          }

          // NOTE: These error messages are here since Photos panel is the last visible panel
          // before creating a new listing. If that order is changed, these should be changed too.
          // Create and show listing errors are shown above submit button
          const publishListingFailed = publishListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPhotosForm.publishListingFailed" />
            </p>
          ) : null
          const showListingFailed = showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPhotosForm.showListingFailed" />
            </p>
          ) : null

          const submittedOnce = this.submittedImages.length > 0
          // imgs can contain added images (with temp ids) and submitted images with uniq ids.
          const arrayOfImgIds = (imgs) => imgs.map((i) => (typeof i.id === 'string' ? i.imageId : i.id))
          const imageIdsFromProps = arrayOfImgIds(images)
          const imageIdsFromPreviousSubmit = arrayOfImgIds(this.submittedImages)
          const imageArrayHasSameImages = isEqual(imageIdsFromProps, imageIdsFromPreviousSubmit)
          const pristineSinceLastSubmit = submittedOnce && imageArrayHasSameImages

          const submitReady = (updated && pristineSinceLastSubmit) || ready
          const submitInProgress = updateInProgress
          const submitDisabled
            = disabled || submitInProgress || imageUploadRequested || ready

          const classes = classNames(css.root, className)

          return (
            <Form
              id={'photos-form'}
              className={classes}
              onSubmit={(e) => {
                this.submittedImages = images
                handleSubmit(e)
              }}
            >
              {updateListingError ? (
                <p className={css.error}>
                  <FormattedMessage id="EditListingPhotosForm.updateFailed" />
                </p>
              ) : null}
              <AddImages
                className={css.imagesField}
                images={imagesToDisplay}
                thumbnailClassName={css.thumbnail}
                savedImageAltText={intl.formatMessage({
                  id: 'EditListingPhotosForm.savedImageAltText',
                })}
                onRemoveImage={(e) => {
                  onRemoveImage(e)
                  setTimeout(() => {
                    document
                    .getElementById('photos-form')
                    .dispatchEvent(new Event('submit', { cancelable: true }))
                  }, 500)
                }}
              >
                <Field
                  id="addImage"
                  name="addImage"
                  accept={ACCEPT_IMAGES}
                  form={null}
                  label={chooseImageText}
                  type="file"
                  disabled={submitDisabled}
                >
                  {(fieldprops) => {
                    const {
                      accept, input, label, disabled: fieldDisabled
                    } = fieldprops
                    const { name, type } = input
                    const { getRootProps, getInputProps } = useDropzone({
                      accept: 'image/*',
                      onDrop: async (acceptedFiles) => {
                        acceptedFiles.map(async (f, idx) => {
                          form.change('addImage', f)
                          form.blur('addImage')
                          await onImageUploadHandler(f)
                          document
                          .getElementById('photos-form')
                          .dispatchEvent(new Event('submit', { cancelable: true }))
                        })
                      },
                      disabled: submitDisabled
                    })
                    const onChange = async (e) => {
                      const file = e.target.files[0]
                      form.change('addImage', file)
                      form.blur('addImage')
                      await onImageUploadHandler(file)
                      document
                      .getElementById('photos-form')
                      .dispatchEvent(new Event('submit', { cancelable: true }))
                    }

                    const inputProps = {
                      accept, id: name, name, onChange, type, ...getInputProps
                    }
                    return (
                      <div className={css.addImageWrapper}>
                        <div {...getRootProps({ className: css.aspectRatioWrapper })}>
                          {fieldDisabled ? null : (
                            <input {...inputProps} className={css.addImageInput}/>
                          )}
                          <label htmlFor={name} className={css.addImage}>
                            {label}
                          </label>
                        </div>
                      </div>
                    )
                  }}
                </Field>

                <Field
                  component={(props) => {
                    const { input, meta } = props
                    return (
                      <div className={css.imageRequiredWrapper}>
                        <input {...input} />
                        <ValidationError fieldMeta={meta} />
                      </div>
                    )
                  }}
                  name="images"
                  type="hidden"
                  // validate={composeValidators(nonEmptyArray(imageRequiredMessage))}
                />
              </AddImages>
              {uploadImageFailed}

              {publishListingFailed}
              {showListingFailed}
              {/* { */}
              {/*  submitInProgress ? <IconSpinner /> : null */}
              {/* } */}
              {/* { */}
              {/*  submitReady ? <IconSuccess /> : null */}
              {/* } */}
            </Form>
          )
        }}
      />
    )
  }
}

EditListingPhotosFormComponent.defaultProps = { fetchErrors: null, images: [] }

EditListingPhotosFormComponent.propTypes = {
  fetchErrors: shape({
    publishListingError: propTypes.error,
    showListingsError: propTypes.error,
    uploadImageError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  images: array,
  intl: intlShape.isRequired,
  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  onRemoveImage: func.isRequired,
}

export default compose(injectIntl)(EditListingPhotosFormComponent)
