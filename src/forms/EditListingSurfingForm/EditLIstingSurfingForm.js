import Grid from '@material-ui/core/Grid'
import React from 'react'
import {
  arrayOf, bool, func, shape, string
} from 'prop-types'
import { compose } from 'redux'
import { Form as FinalForm } from 'react-final-form'
import classNames from 'classnames'
import ListingImageSelectBlock
  from '../../components/ListingImageSelectBlock/ListingImageSelectBlock'
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl'
import { propTypes } from '../../util/types'
import {
  required
} from '../../util/validators'
import {
  Form, Button, FieldTextInput
} from '../../components'

import css from './EditListingSurfingForm.css'

const EditListingSurfingFormComponent = (props) => (
  <FinalForm
    {...props}
    render={(formRenderProps) => {
      const {
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

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <Grid container className={classes.root} direction="column" spacing={5}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2} direction="column">
                <Grid item xs={12}>
                  <FieldTextInput
                    id="surfing.description"
                    name="surfing.description"
                    type="textarea"
                    label={intl.formatMessage({
                      id: 'EditListingSurfingForm.description',
                    })}
                    placeholder={intl.formatMessage({
                      id: 'EditListingSurfingForm.descriptionPlaceholder',
                    })}
                    validate={required(intl.formatMessage({ id: 'GenericForm.required' }))}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <h3 className={css.subTitle}>Surfing Photos</h3>
              <ListingImageSelectBlock
                form={form}
                values={values}
                formValuesKey={'surfing'}
                disabled={form.getState().invalid}
              />
            </Grid>
          </Grid>
          <Button
            className={css.submitButton}
            onClick={() => props.onSubmit(values, 'redirect')}
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

EditListingSurfingFormComponent.defaultProps = { className: null, fetchErrors: null }

EditListingSurfingFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingSurfingFormComponent)
