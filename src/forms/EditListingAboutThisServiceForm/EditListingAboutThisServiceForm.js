import React from 'react'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import { compose } from 'redux'
import { Form as FinalForm } from 'react-final-form'
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl'
import classNames from 'classnames'
import { propTypes } from '../../util/types'
import { maxLength, required, composeValidators } from '../../util/validators'
import { Form, Button, FieldTextInput } from '../../components'

import css from './EditListingAboutThisServiceForm.css'

const TITLE_MAX_LENGTH = 60

const EditListingAboutThisServiceFormComponent = (props) => (
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
      } = formRenderProps

      const questionATitle = intl.formatMessage({ id: 'EditListingAboutThisServiceForm.questionATitle' })
      const questionATitlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingAboutThisServiceForm.questionATitlePlaceholder',
      })
      const questionBTitle = intl.formatMessage({ id: 'EditListingAboutThisServiceForm.questionBTitle' })
      const questionBTitlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingAboutThisServiceForm.questionBTitlePlaceholder',
      })
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingAboutThisServiceForm.titleRequired',
      })
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingAboutThisServiceForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        },
      )

      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH)

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {}
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingAboutThisServiceForm.updateFailed" />
        </p>
      ) : null

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingAboutThisServiceForm.createListingDraftError" />
        </p>
      ) : null

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingAboutThisServiceForm.showListingFailed" />
        </p>
      ) : null

      const classes = classNames(css.root, className)
      const submitReady = (updated && pristine) || ready
      const submitInProgress = updateInProgress
      const submitDisabled = invalid || disabled || submitInProgress

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <FieldTextInput
            id="question_a"
            name="question_a"
            className={css.title}
            type="text"
            label={questionATitle}
            placeholder={questionATitlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus
          />

          <FieldTextInput
            id="question_b"
            name="question_b"
            className={css.title}
            type="text"
            label={questionBTitle}
            placeholder={questionBTitlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
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
    }}
  />
)

EditListingAboutThisServiceFormComponent.defaultProps = { className: null, fetchErrors: null }

EditListingAboutThisServiceFormComponent.propTypes = {
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
    }),
  ),
}

export default compose(injectIntl)(EditListingAboutThisServiceFormComponent)
