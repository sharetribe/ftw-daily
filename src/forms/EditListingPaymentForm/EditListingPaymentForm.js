import React from 'react'
import { bool, func, shape, string } from 'prop-types'
import { compose } from 'redux'
import { Form as FinalForm } from 'react-final-form'
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl'
import classNames from 'classnames'
import config from '../../config'
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types'
import * as validators from '../../util/validators'
import { formatMoney } from '../../util/currency'
import { types as sdkTypes } from '../../util/sdkLoader'
import { Button, Form, FieldCurrencyInput, FieldTextInput } from '../../components'
import css from './EditListingPaymentForm.css'
import { composeValidators, required } from '../../util/validators'

const { Money } = sdkTypes

export const EditListingPaymentFormComponent = (props) => {
  return (< FinalForm
      {...
        props
      }
      render={(formRenderProps) => {
        const {
          serviceType,
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

        const unitType = config.bookingUnitType
        const isNightly = unitType === LINE_ITEM_NIGHT
        const isDaily = unitType === LINE_ITEM_DAY

        const translationKey = isNightly
          ? 'EditListingPaymentForm.pricePerNight'
          : isDaily
            ? 'EditListingPaymentForm.pricePerDay'
            : 'EditListingPaymentForm.pricePerUnit'

        const pricePerUnitMessage = intl.formatMessage({
          id: translationKey,
        })

        const pricePlaceholderMessage = intl.formatMessage({
          id: 'EditListingPaymentForm.priceInputPlaceholder',
        })

        const priceRequired = validators.required(
          intl.formatMessage({
            id: 'EditListingPaymentForm.priceRequired',
          }),
        )
        const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency)
        const minPriceRequired = validators.moneySubUnitAmountAtLeast(
          intl.formatMessage(
            {
              id: 'EditListingPaymentForm.priceTooLow',
            },
            {
              minPrice: formatMoney(intl, minPrice),
            },
          ),
          config.listingMinimumPriceSubUnits,
        )
        const priceValidators = config.listingMinimumPriceSubUnits
          ? validators.composeValidators(priceRequired, minPriceRequired)
          : priceRequired

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
              id="question_a"
              name="question_a"
              className={css.title}
              type="text"
              label={questionATitle}
              placeholder={questionATitlePlaceholderMessage}
              // validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
              autoFocus
            />

            <FieldTextInput
              id="question_b"
              name="question_b"
              className={css.title}
              type="text"
              label={questionBTitle}
              placeholder={questionBTitlePlaceholderMessage}
              // validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
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
  serviceType: string.isRequired,
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
