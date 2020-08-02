import React from 'react'
import {
  arrayOf, bool, func, shape, string
} from 'prop-types'
import _ from 'lodash'
import { compose } from 'redux'
import { Form as FinalForm } from 'react-final-form'
import classNames from 'classnames'
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl'
import { propTypes } from '../../util/types'
import {
  maxLength, required, isValidNumber, validYouTubeURL, composeValidators
} from '../../util/validators'
import {
  Form, Button, FieldTextInput, FieldBoolean
} from '../../components'

import css from './EditListingCoworkingForm.css'

const EditListingCoworkingFormComponent = (props) => (
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

      const wifiMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.wifi',
      })
      const wifiPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.wifiPlaceholder',
      })
      const wifiValidMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.wifiInvalid',
      })

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
          <FieldTextInput
            id="wifi"
            name="wifi"
            className={css.wifi}
            type="text"
            label={wifiMessage}
            placeholder={wifiPlaceholderMessage}
            validate={composeValidators(isValidNumber(wifiValidMessage))}
          />
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

EditListingCoworkingFormComponent.defaultProps = { className: null, fetchErrors: null }

EditListingCoworkingFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingCoworkingFormComponent)
