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
import { Button, Form, FieldCurrencyInput } from '../../components'
import css from './EditListingPricingForm.css'
import pricingOptions from '../../util/pricingOptions'

const { Money } = sdkTypes

export const EditListingPricingFormComponent = (props) => {
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
          ? 'EditListingPricingForm.pricePerNight'
          : isDaily
            ? 'EditListingPricingForm.pricePerDay'
            : 'EditListingPricingForm.pricePerUnit'

        const pricePerUnitMessage = intl.formatMessage({
          id: translationKey,
        })

        const pricePlaceholderMessage = intl.formatMessage({
          id: 'EditListingPricingForm.priceInputPlaceholder',
        })

        const priceRequired = validators.required(
          intl.formatMessage({
            id: 'EditListingPricingForm.priceRequired',
          }),
        )
        const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency)
        const minPriceRequired = validators.moneySubUnitAmountAtLeast(
          intl.formatMessage(
            {
              id: 'EditListingPricingForm.priceTooLow',
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

        const priceOptionFields = pricingOptions[serviceType]

        const checkBeforeSubmit = val => {
          val.persist()
          const prices = {
            test: '299.99',
            testy: '399.22'
          }
          console.log(val)
          handleSubmit(prices)
        }

        return (
          <Form onSubmit={handleSubmit} className={classes}>
            {updateListingError ? (
              <p className={css.error}>
                <FormattedMessage id="EditListingPricingForm.updateFailed"/>
              </p>
            ) : null}
            {showListingsError ? (
              <p className={css.error}>
                <FormattedMessage id="EditListingPricingForm.showListingFailed"/>
              </p>
            ) : null}
            {priceOptionFields && priceOptionFields.map(({label, placeholder}, index) => {
              return <FieldCurrencyInput
                key={label}
                // id={`price_option_${index}`} // it doesn't like this because it assumes one listing = one price
                id="price"
                name="price"
                // name={`price_option_${index}`}
                className={css.priceInput}
                autoFocus
                label={label}
                placeholder={placeholder}
                currencyConfig={config.currencyConfig}
                validate={priceValidators}
              />
            })}
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
EditListingPricingFormComponent.defaultProps = { fetchErrors: null }

EditListingPricingFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingPricingFormComponent)
