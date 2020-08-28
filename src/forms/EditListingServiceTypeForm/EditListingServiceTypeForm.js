import React from 'react'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import { compose } from 'redux'
import { Form as FinalForm } from 'react-final-form'
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl'
import classNames from 'classnames'
import { propTypes } from '../../util/types'
import { maxLength, required, composeValidators } from '../../util/validators'
import { Form, Button, FieldTextInput } from '../../components'
import CustomCategorySelectFieldMaybe from './CustomCategorySelectFieldMaybe'

import css from './EditListingServiceTypeForm.css'

const TITLE_MAX_LENGTH = 60

const EditListingServiceTypeFormComponent = (props) => (
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
      } = formRenderProps

      const titleMessage = intl.formatMessage({ id: 'EditListingServiceTypeForm.title' })
      const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingServiceTypeForm.titlePlaceholder',
      })
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingServiceTypeForm.titleRequired',
      })
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingServiceTypeForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        },
      )

      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH)

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {}
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingServiceTypeForm.updateFailed" />
        </p>
      ) : null

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingServiceTypeForm.createListingDraftError" />
        </p>
      ) : null

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingServiceTypeForm.showListingFailed" />
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
            id="title"
            name="title"
            className={css.title}
            type="text"
            label={titleMessage}
            placeholder={titlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus
          />

          <CustomCategorySelectFieldMaybe
            id="category"
            name="category"
            categories={categories}
            intl={intl}
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

EditListingServiceTypeFormComponent.defaultProps = { className: null, fetchErrors: null }

EditListingServiceTypeFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingServiceTypeFormComponent)
