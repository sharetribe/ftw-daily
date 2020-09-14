import React from 'react'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import { compose } from 'redux'
import { Form as FinalForm } from 'react-final-form'
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl'
import classNames from 'classnames'
import { propTypes } from '../../util/types'
import { maxLength, required, composeValidators } from '../../util/validators'
import { Form, Button, FieldTextInput } from '../../components'

import css from './EditListingAboutYouForm.css'

const TITLE_MAX_LENGTH = 60

const EditListingAboutYouFormComponent = (props) => (
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

      const questionATitle = intl.formatMessage({ id: 'EditListingAboutYouForm.questionATitle' })
      const questionATitlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingAboutYouForm.questionATitlePlaceholder',
      })
      const questionBTitle = intl.formatMessage({ id: 'EditListingAboutYouForm.questionBTitle' })
      const questionBTitlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingAboutYouForm.questionBTitlePlaceholder',
      })
      const questionCTitle = intl.formatMessage({ id: 'EditListingAboutYouForm.questionCTitle' })
      const questionCTitlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingAboutYouForm.questionCTitlePlaceholder',
      })
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingAboutYouForm.titleRequired',
      })
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingAboutYouForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        },
      )

      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH)

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {}
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingAboutYouForm.updateFailed" />
        </p>
      ) : null

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingAboutYouForm.createListingDraftError" />
        </p>
      ) : null

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingAboutYouForm.showListingFailed" />
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
            id="whyAreYouTheRightFit"
            name="whyAreYouTheRightFit"
            className={css.title}
            type="text"
            label={questionATitle}
            placeholder={questionATitlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus
          />

          <FieldTextInput
            id="primaryGenres"
            name="primaryGenres"
            className={css.title}
            type="text"
            label={questionBTitle}
            placeholder={questionBTitlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus
          />

          <FieldTextInput
            id="experience"
            name="experience"
            className={css.title}
            type="text"
            label={questionCTitle}
            placeholder={questionCTitlePlaceholderMessage}
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

EditListingAboutYouFormComponent.defaultProps = { className: null, fetchErrors: null }

EditListingAboutYouFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingAboutYouFormComponent)
