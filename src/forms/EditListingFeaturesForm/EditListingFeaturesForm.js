import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import {
  bool, func, shape, string
} from 'prop-types'
import classNames from 'classnames'
import { Form as FinalForm } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { NotificationBanner } from '../../components/NotificationBanner/NotificationBanner'
import { FormattedMessage } from '../../util/reactIntl'

import { propTypes } from '../../util/types'
import config from '../../config'
import {
  Button, FieldBoolean, FieldCheckboxGroup, FieldTextInput, Form
} from '../../components'
import {
  composeValidators, isValidNumber, required, validYouTubeURL
} from '../../util/validators'

import css from './EditListingFeaturesForm.css'

const EditListingFeaturesFormComponent = (props) => (
  <FinalForm
    {...props}
    mutators={{ ...arrayMutators }}
    render={(formRenderProps) => {
      const {
        disabled,
        ready,
        rootClassName,
        className,
        name,
        handleSubmit,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        values,
        intl
      } = formRenderProps

      const classes = classNames(rootClassName || css.root, className)
      const submitReady = (updated && pristine) || ready
      const submitInProgress = updateInProgress
      const submitDisabled = disabled || submitInProgress

      const retreatMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.retreat',
      })
      const retreatCapacityMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.retreatCapacity',
      })
      const retreatCapacityPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.retreatCapacityPlaceholder',
      })
      const retreatCapacityValidMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.retreatCapacityInvalid',
      })
      const retreatDescriptionMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.retreatDescription',
      })
      const retreatDescriptionPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.retreatDescriptionPlaceholder',
      })

      const { updateListingError, showListingsError } = fetchErrors || {}
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingFeaturesForm.updateFailed" />
        </p>
      ) : null

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingFeaturesForm.showListingFailed" />
        </p>
      ) : null

      const showRetreatForm = values.retreat && values.retreat.accepted

      const retreatShowFields = showRetreatForm ? (
        <>
          <FieldTextInput
            id="retreat.capacity"
            name="retreat.capacity"
            className={css.description}
            type="text"
            label={retreatCapacityMessage}
            placeholder={retreatCapacityPlaceholderMessage}
            validate={composeValidators(isValidNumber(retreatCapacityValidMessage))}
          />

          <FieldTextInput
            id="retreat.description"
            name="retreat.description"
            className={css.description}
            type="textarea"
            label={retreatDescriptionMessage}
            placeholder={retreatDescriptionPlaceholderMessage}
          />
        </>
      ) : null

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}
          <Grid container className={classes.root} direction="column" spacing={5}>
            <Grid item xs={12}>
              <FieldCheckboxGroup
                className={css.features}
                id={name}
                name={name}
                options={config.custom.amenities}
              />
            </Grid>
            <Grid item xs={12}>
              <FieldBoolean
                id="retreat.accepted"
                name="retreat.accepted"
                className={css.retreat}
                label={retreatMessage}
                placeholder="Choose yes/no"
                validate={required(intl.formatMessage({ id: 'GenericForm.required' }))}
              />
            </Grid>
            <Grid item xs={12}>
              {retreatShowFields}
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

EditListingFeaturesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
}

EditListingFeaturesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  name: string.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
}

const EditListingFeaturesForm = EditListingFeaturesFormComponent

export default EditListingFeaturesForm
