import Grid from '@material-ui/core/Grid'
import React from 'react'
import {
  arrayOf, bool, func, shape, string
} from 'prop-types'
import _ from 'lodash'
import { compose } from 'redux'
import { Form as FinalForm } from 'react-final-form'
import classNames from 'classnames'
import SelectImage from '../../components/SelectImage/SelectImage'
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl'
import { propTypes } from '../../util/types'
import {
  maxLength, required, isValidNumber, validYouTubeURL, composeValidators
} from '../../util/validators'
import {
  Form, Button, FieldTextInput, FieldBoolean
} from '../../components'

import css from './EditListingColivingForm.css'

const EditListingColivingFormComponent = (props) => (
  <FinalForm
    {...props}
    render={(formRenderProps) => {
      const {
        categories,
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        values,
        form,
      } = formRenderProps

      const { updateListingError, showListingsError } = fetchErrors || {}
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
        </p>
      ) : null

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
        </p>
      ) : null

      const classes = classNames(css.root, className)
      const submitReady = (updated && pristine) || ready
      const submitInProgress = updateInProgress
      const submitDisabled = invalid || disabled || submitInProgress

      form.registerField(
        'coliving.images',
        (fieldState) => fieldState,
        {}
      )

      const updatePhotos = (photoIds) => {
        const formState = form.getState().values
        const images = _.get(formState, 'coliving.images', {})
        const ids = _.xor(_.keys(images), photoIds)
        const newImages = {}
        ids.forEach((v) => {
          newImages[v] = {}
        })
        const update = _.defaults(images, newImages)
        form.change('coliving.images', update)
        form.submit()
      }

      console.log(values)
      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <Grid container className={classes.root} direction="column" spacing={5}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2} direction="column">
                <Grid item xs={12}>
                  <FieldTextInput
                    id="coliving.description"
                    name="coliving.description"
                    type="textarea"
                    label={intl.formatMessage({
                      id: 'EditListingColivingForm.description',
                    })}
                    placeholder={intl.formatMessage({
                      id: 'EditListingColivingForm.descriptionPlaceholder',
                    })}
                    validate={required(intl.formatMessage({ id: 'GenericForm.required' }))}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <h3 className={css.subTitle}>Coliving Photos</h3>
              <SelectImage
                onUpload={(photoIds) => {
                  updatePhotos(photoIds)
                }}
                onDelete={(photoIds) => {
                  updatePhotos(photoIds)
                }}
                disabled={form.getState().invalid}
                imagesToDisplay={_.keys(values.coliving.images)}
                showThumbnails={true}
              />
            </Grid>
          </Grid>
          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      )
    }}
  />
)

EditListingColivingFormComponent.defaultProps = { className: null, fetchErrors: null }

EditListingColivingFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  categories: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
}

export default compose(injectIntl)(EditListingColivingFormComponent)
