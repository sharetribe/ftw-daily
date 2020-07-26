import React from 'react'
import {
  bool, func, shape, string
} from 'prop-types'
import { compose } from 'redux'
import { Form as FinalForm } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl'
import { propTypes } from '../../util/types'
import { Button, Form } from '../../components'

import css from './EditListingProductsForm.css'

import EditListingProductsAdditionalProducts from './EditListingProductsAdditionalProducts'

export const EditListingProductsFormComponent = (props) => (
  <FinalForm
    {...props}
    mutators={{ ...arrayMutators }}
    render={(fieldRenderProps) => {
      const {
        form,
        disabled,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        values,
        listingId,
        ready,
        errors,
        images,
        onChange,
        onUpdateImageOrder,
        onRemoveImage,
        submitButtonText,
        panelUpdated,
        onImageUpload,
        onImageSubmit,
        products
      } = fieldRenderProps

      const { push } = form && form.mutators ? form.mutators : {}
      const submitReady = updated && pristine
      const submitInProgress = updateInProgress
      const submitDisabled = invalid || disabled || submitInProgress
      const { updateListingError, showListingsError } = fetchErrors || {}

      return (
        <Form onSubmit={handleSubmit}>
          <EditListingProductsAdditionalProducts
            otherSubmit={handleSubmit}
            disabled={disabled}
            fieldId="products"
            intl={intl}
            push={push}
            values={values}
            listingId={listingId}
            ready={ready}
            fetchErrors={errors}
            initialValues={{ images }}
            images={images}
            onImageUpload={onImageUpload}
            onChange={onChange}
            onUpdateImageOrder={onUpdateImageOrder}
            onRemoveImage={onRemoveImage}
            saveActionMsg={submitButtonText}
            updated={panelUpdated}
            updateInProgress={updateInProgress}
            onImageSubmit={onImageSubmit}
            form={form}
            products={products}
          />

          {updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.updateFailed" />
            </p>
          ) : null}
          {showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.showListingFailed" />
            </p>
          ) : null}

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

EditListingProductsFormComponent.defaultProps = {
  fetchErrors: null
}

EditListingProductsFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
}

export default compose(injectIntl)(EditListingProductsFormComponent)
