import React from 'react'
import { bool, func, shape, string } from 'prop-types'
import { compose } from 'redux'
import { Form as FinalForm } from 'react-final-form'
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl'
import classNames from 'classnames'
import { propTypes } from '../../util/types'
import { Button, Form, FieldTextInput } from '../../components'
import css from './EditListingPaymentForm.css'

export const EditListingPaymentFormComponent = (props) => {
  return (< FinalForm
      {...
        props
      }
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
        } = formRenderProps

        const classes = classNames(css.root, className)
        const submitReady = (updated && pristine) || ready
        const submitInProgress = updateInProgress
        const submitDisabled = invalid || disabled || submitInProgress
        const { updateListingError, showListingsError } = fetchErrors || {}

        const questionATitle = intl.formatMessage({ id: 'EditListingPaymentForm.questionATitle' })
        const questionATitlePlaceholderMessage = intl.formatMessage({
          id: 'EditListingPaymentForm.questionATitlePlaceholder',
        })
        const questionBTitle = intl.formatMessage({ id: 'EditListingPaymentForm.questionBTitle' })
        const questionBTitlePlaceholderMessage = intl.formatMessage({
          id: 'EditListingPaymentForm.questionBTitlePlaceholder',
        })

        return (
          <Form onSubmit={handleSubmit} className={classes}>
            {updateListingError ? (
              <p className={css.error}>
                <FormattedMessage id="EditListingPaymentForm.updateFailed"/>
              </p>
            ) : null}
            {showListingsError ? (
              <p className={css.error}>
                <FormattedMessage id="EditListingPaymentForm.showListingFailed"/>
              </p>
            ) : null}

            <FieldTextInput
              id="paypalEMail"
              name="paypalEMail"
              className={css.title}
              type="text"
              label={questionATitle}
              placeholder={questionATitlePlaceholderMessage}
              autoFocus
            />

            <FieldTextInput
              id="phoneNumber"
              name="phoneNumber"
              className={css.title}
              type="text"
              label={questionBTitle}
              placeholder={questionBTitlePlaceholderMessage}
              autoFocus
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
      }
      }
    />
  )
}
EditListingPaymentFormComponent.defaultProps = { fetchErrors: null }

EditListingPaymentFormComponent.propTypes = {
  intl: intlShape.isRequired,
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

export default compose(injectIntl)(EditListingPaymentFormComponent)
