import React, { Component } from 'react'
import {
  string, object, bool, arrayOf
} from 'prop-types'
import { compose } from 'redux'
import { Form as FinalForm } from 'react-final-form'
import classNames from 'classnames'
import moment from 'moment'
import keys from 'lodash/keys'
import get from 'lodash/get'
import includes from 'lodash/includes'
import find from 'lodash/find'
import BookingProductRadioButton
  from '../../components/BookingProductRadioButton/BookingProductRadioButton'
import { getPrice } from '../../util/price';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl'
import {
  required, bookingDatesRequired, composeValidators
} from '../../util/validators'
import { START_DATE, END_DATE, nightsBetween } from '../../util/dates';
import { propTypes } from '../../util/types'
import {
  Form, PrimaryButton, FieldDateRangeInput, FieldSelect
} from '../../components'
import EstimatedBreakdownMaybe from './EstimatedBreakdownMaybe'
import { types as sdkTypes } from '../../util/sdkLoader'

import css from './BookingDatesForm.css'

const { Money } = sdkTypes
const identity = (v) => v

export class BookingDatesFormComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { focusedInput: null }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.onFocusedInputChange = this.onFocusedInputChange.bind(this)
  }

  // Function that can be passed to nested components
  // so that they can notify this component when the
  // focused input changes.
  onFocusedInputChange(focusedInput) {
    this.setState({ focusedInput })
  }

  // In case start or end date for the booking is missing
  // focus on that input, otherwise continue with the
  // default handleSubmit function.
  handleFormSubmit(e) {
    const { startDate, endDate } = e.bookingDates || {}
    if (!startDate) {
      e.preventDefault()
      this.setState({ focusedInput: START_DATE })
    } else if (!endDate) {
      e.preventDefault()
      this.setState({ focusedInput: END_DATE })
    } else {
      this.props.onSubmit(e)
    }
  }

  render() {
    const { rootClassName, className, ...rest } = this.props
    const classes = classNames(rootClassName || css.root, className)

    return (
      <FinalForm
        {...rest}
        onSubmit={this.handleFormSubmit}
        render={(fieldRenderProps) => {
          const {
            endDatePlaceholder,
            startDatePlaceholder,
            formId,
            handleSubmit,
            intl,
            isOwnListing,
            submitButtonWrapperClassName,
            unitType,
            listing,
            values,
            timeSlots,
            fetchTimeSlotsError,
          } = fieldRenderProps

          const { publicData = {} } = listing.attributes

          const productId = get(values, 'bookingProduct')
          const productPrice = values && productId
            ? publicData.products.find((p) => p.id === productId).price
            : undefined

          const unitPrice = productPrice
            ? new Money(productPrice.amount, productPrice.currency)
            : listing.attributes.price

          const { startDate, endDate } = values && values.bookingDates ? values.bookingDates : {}
          const numberOfDaysSelected = nightsBetween(startDate, endDate) || 1

          // This is the place to collect breakdown estimation data. See the
          // EstimatedBreakdownMaybe component to change the calculations
          // for customized payment processes.
          const bookingData
            = startDate && endDate
              ? {
                unitType,
                unitPrice,
                startDate,
                endDate,

                // NOTE: If unitType is `line-item/units`, a new picker
                // for the quantity should be added to the form.
                quantity: 1,
                discount: get(getPrice(publicData.products.find((p) => p.id === productId), numberOfDaysSelected), 'discount', null)
              }
              : null

          const bookingInfo = bookingData ? (
            <div className={css.priceBreakdownContainer}>
              <h3 className={css.priceBreakdownTitle}>
                <FormattedMessage id="BookingDatesForm.priceBreakdownTitle" />
              </h3>
              <EstimatedBreakdownMaybe bookingData={bookingData} />
            </div>
          ) : null

          const dateFormatOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          }

          const now = moment()
          const today = now.startOf('day').toDate()
          const tomorrow = now
          .startOf('day')
          .add(1, 'days')
          .toDate()
          const startDatePlaceholderText
            = startDatePlaceholder || intl.formatDate(today, dateFormatOptions)
          const endDatePlaceholderText
            = endDatePlaceholder || intl.formatDate(tomorrow, dateFormatOptions)
          const submitButtonClasses = classNames(
            submitButtonWrapperClassName || css.submitButtonWrapper
          )

          const bookingStartLabel = intl.formatMessage({
            id: 'BookingDatesForm.bookingStartTitle',
          })
          const bookingEndLabel = intl.formatMessage({ id: 'BookingDatesForm.bookingEndTitle' })
          const requiredMessage = intl.formatMessage({ id: 'BookingDatesForm.requiredDate' })
          const startDateErrorMessage = intl.formatMessage({
            id: 'FieldDateRangeInput.invalidStartDate',
          })
          const endDateErrorMessage = intl.formatMessage({
            id: 'FieldDateRangeInput.invalidEndDate',
          })
          const timeSlotsError = fetchTimeSlotsError ? (
            <p className={css.timeSlotsError}>
              <FormattedMessage id="BookingDatesForm.timeSlotsError" />
            </p>
          ) : null

          const productRequired = intl.formatMessage({
            id: 'BookingDatesForm.requiredDate',
          })
          const productTitle = intl.formatMessage({
            id: 'BookingDatesForm.roomTypePlaceholder',
          })

          const products = listing.attributes.publicData && listing.attributes.publicData.products

          return (
            <Form onSubmit={handleSubmit} className={classes}>
              <FieldDateRangeInput
                className={css.bookingDates}
                name="bookingDates"
                unitType={unitType}
                startDateId={`${formId}.bookingStartDate`}
                startDateLabel={bookingStartLabel}
                startDatePlaceholderText={startDatePlaceholderText}
                endDateId={`${formId}.bookingEndDate`}
                endDateLabel={bookingEndLabel}
                endDatePlaceholderText={endDatePlaceholderText}
                focusedInput={this.state.focusedInput}
                onFocusedInputChange={this.onFocusedInputChange}
                format={identity}
                timeSlots={timeSlots}
                useMobileMargins
                validate={composeValidators(
                  required(requiredMessage),
                  bookingDatesRequired(startDateErrorMessage, endDateErrorMessage)
                )}
              />
              {
                products && products.length
                  ? <ul className={css.bookingProductListWrapper}>
                    <h4 style={{ fontWeight: 600 }}>{productTitle}</h4>
                    {
                      products.map((prod) => {
                        return (
                          <BookingProductRadioButton
                            id={prod.id}
                            name="bookingProduct"
                            intl={intl}
                            label={prod.type}
                            value={prod.id}
                            showAsRequired={true}
                            product={prod}
                            images={listing.images.filter((img) => includes(keys(prod.photos), img.id.uuid))}
                            price={getPrice(prod, numberOfDaysSelected).price}
                            useMobileMargins
                            validate={required(productRequired)}
                            fieldMeta={fieldRenderProps}
                          />
                        )
                      })
                    }
                  </ul>
                  : null
              }
              {timeSlotsError}
              {bookingInfo}
              <div className={submitButtonClasses}>
                <PrimaryButton type="submit">
                  <FormattedMessage id="BookingDatesForm.requestToBook" />
                </PrimaryButton>
              </div>
              <p className={css.smallPrint}>
                <FormattedMessage
                  id={
                    isOwnListing
                      ? 'BookingDatesForm.ownListing'
                      : 'BookingDatesForm.youWontBeChargedInfo'
                  }
                />
              </p>
            </Form>
          )
        }}
      />
    )
  }
}

BookingDatesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  isOwnListing: false,
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  timeSlots: null,
}

BookingDatesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  unitType: propTypes.bookingUnitType.isRequired,
  listing: object.isRequired,
  isOwnListing: bool,
  timeSlots: arrayOf(propTypes.timeSlot),

  // from injectIntl
  intl: intlShape.isRequired,

  // for tests
  startDatePlaceholder: string,
  endDatePlaceholder: string,
}

const BookingDatesForm = compose(injectIntl)(BookingDatesFormComponent)
BookingDatesForm.displayName = 'BookingDatesForm'

export default BookingDatesForm
