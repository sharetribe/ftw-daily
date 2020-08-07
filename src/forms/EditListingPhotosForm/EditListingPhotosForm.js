import React, { Component } from 'react'
import {
  array, bool, func, shape, string
} from 'prop-types'
import { compose } from 'redux'
import { useDropzone } from 'react-dropzone'
import { Form as FinalForm, Field } from 'react-final-form'
import isEqual from 'lodash/isEqual'
import random from 'lodash/random'
import classNames from 'classnames'
import ListingImageSelectBlock
  from '../../components/ListingImageSelectBlock/ListingImageSelectBlock'
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
        render={(formRenderProps) => {
          const {
            form,
            className,
            fetchErrors,
            handleSubmit,
            images,
            imageUploadRequested,
            intl,
            disabled,
            ready,
            saveActionMsg,
            updated,
            updateInProgress,
            showSubmitButton,
            readyForUpload,
            values
          } = formRenderProps

          const chooseImageText = (
            <span className={css.chooseImageText}>
              <span className={css.chooseImage}>
                {
                  readyForUpload ? <FormattedMessage id="EditListingPhotosForm.chooseImage" />
                    : <FormattedMessage id="EditListingPhotosForm.imageUploadDisabledUntilPreviousFieldsFilled" />
                }
              </span>
              {
                readyForUpload
                  ? <span className={css.imageTypes}>
                    <FormattedMessage id="EditListingPhotosForm.imageTypes" />
                  </span>
                  : null
              }
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
            = !readyForUpload || disabled || submitInProgress || imageUploadRequested || ready

          const classes = classNames(css.root, className)
          const formId = `photos-form-${random(0, 99999)}`
          console.log(values)
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
              <ListingImageSelectBlock
                form={form}
                values={values}
                formValuesKey={'main'}
                disabled={form.getState().invalid}
              />
              {uploadImageFailed}

              {publishListingFailed}
              {showListingFailed}
              {
                showSubmitButton
                  ? <Button
                    className={css.submitButton}
                    onClick={() => this.props.onSubmit(values, 'redirect')}
                    inProgress={submitInProgress}
                    disabled={submitDisabled}
                    ready={submitReady}
                  >
                    {saveActionMsg}
                  </Button>
                  : null
              }
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
