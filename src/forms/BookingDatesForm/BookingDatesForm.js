import React, { Component } from 'react';
import { string, bool, arrayOf, array, func } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import classNames from 'classnames';
import moment from 'moment';
import config from '../../config';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import { required, bookingDatesRequired, composeValidators, requiredFieldArrayCheckbox } from '../../util/validators';
import { START_DATE, END_DATE } from '../../util/dates';
import { propTypes } from '../../util/types';
import { Form, IconSpinner, PrimaryButton, FieldDateRangeInput, FieldCheckbox, FieldRadioButton, FieldTextInput, FieldSelect } from '../../components';
import EstimatedBreakdownMaybe from './EstimatedBreakdownMaybe';
import { findOptionsForSelectFilter } from '../../util/search';

import css from './BookingDatesForm.module.css';

const identity = v => v;

export class BookingDatesFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { focusedInput: null };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onFocusedInputChange = this.onFocusedInputChange.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  // Function that can be passed to nested components
  // so that they can notify this component when the
  // focused input changes.
  onFocusedInputChange(focusedInput) {
    this.setState({ focusedInput });
  }

  // In case start or end date for the booking is missing
  // focus on that input, otherwise continue with the
  // default handleSubmit function.
  handleFormSubmit(e) {
    const { startDate, endDate } = e.bookingDates || {};
    if (!startDate) {
      e.preventDefault();
      this.setState({ focusedInput: START_DATE });
    } else if (!endDate) {
      e.preventDefault();
      this.setState({ focusedInput: END_DATE });
    } else {
      this.props.onSubmit(e);
    }
  }

  // When the values of the form are updated we need to fetch
  // lineItems from FTW backend for the EstimatedTransactionMaybe
  // In case you add more fields to the form, make sure you add
  // the values here to the bookingData object.
  handleOnChange(formValues) {
    const { startDate, endDate } =
      formValues.values && formValues.values.bookingDates ? formValues.values.bookingDates : {};

    const { serviceSetup } = formValues.values;
    const { numberOfPets } = formValues.values;

    const listingId = this.props.listingId;
    const isOwnListing = this.props.isOwnListing;

    if (startDate && endDate && !this.props.fetchLineItemsInProgress) {
      this.props.onFetchTransactionLineItems({
        bookingData: { startDate, endDate, serviceSetup, numberOfPets },
        listingId,
        isOwnListing,
      });
    }
  }

  render() {
    const { rootClassName, className, price: unitPrice, ...rest } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    if (!unitPrice) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingPriceMissing" />
          </p>
        </div>
      );
    }
    if (unitPrice.currency !== config.currency) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingCurrencyInvalid" />
          </p>
        </div>
      );
    }
    const getLabel = (category, key) => {
      const label = category.find(c => c.key === key);
      return label ? label.label : key;
    };

    return (
      <FinalForm
        {...rest}
        unitPrice={unitPrice}
        onSubmit={this.handleFormSubmit}
        render={fieldRenderProps => {
          const {
            endDatePlaceholder,
            startDatePlaceholder,
            formId,
            handleSubmit,
            intl,
            isOwnListing,
            submitButtonWrapperClassName,
            unitType,
            values,
            timeSlots,
            listing,
            filterConfig,
            numberPet,
            fetchTimeSlotsError,
            lineItems,
            fetchLineItemsInProgress,
            fetchLineItemsError,
            dayUnitType,
            firstname,
          } = fieldRenderProps;


          const pricepet = listing?.attributes?.publicData?.pricepet

          const dayprice = listing.attributes.publicData.pricepet.dayCare.dayCareStay1


          const nightprice = listing?.attributes?.publicData?.pricepet?.overNight.overnightsStayPrice1
          function findMinPrice(var_args) {
            return Array.prototype.reduce.call(arguments, function (prev, current) {
              return prev && current ? Math.min(prev, current) : prev || current;
            });
          }
          const min = findMinPrice(nightprice, dayprice)
          const { startDate, endDate } = values && values.bookingDates ? values.bookingDates : {};

          const options = findOptionsForSelectFilter('serviceSetup', filterConfig);
          //const numberPet = findOptionsForSelectFilter('numberOfPets', filterConfig);


          const numberPetArray = numberPet && numberPet == 3
            ? [1, 2, 3]
            : numberPet == 2
              ? [1, 2]
              : [1];


          const detail = listing?.attributes?.publicData?.serviceSetup;
          const discount = listing.attributes.publicData.discountlengthOfStays

          const letofstay = listing.attributes.publicData.lengthOfStays


          const phoneRequiredMessage = intl.formatMessage({
            id: 'EditListingDescriptionForm.phoneRequired',
          });

          const bookingStartLabel = intl.formatMessage({
            id: 'BookingDatesForm.bookingStartTitle',
          });
          const bookingEndLabel = intl.formatMessage({
            id: 'BookingDatesForm.bookingEndTitle',
          });
          const requiredMessage = intl.formatMessage({
            id: 'BookingDatesForm.requiredDate',
          });

          const requiredpetMessage = intl.formatMessage({
            id: 'BookingDatesForm.requiredNumberofpet',
          });
          const startDateErrorMessage = intl.formatMessage({
            id: 'FieldDateRangeInput.invalidStartDate',
          });
          const endDateErrorMessage = intl.formatMessage({
            id: 'FieldDateRangeInput.invalidEndDate',
          });
          const timeSlotsError = fetchTimeSlotsError ? (
            <p className={css.sideBarError}>
              <FormattedMessage id="BookingDatesForm.timeSlotsError" />
            </p>
          ) : null;

          // This is the place to collect breakdown estimation data.
          // Note: lineItems are calculated and fetched from FTW backend
          // so we need to pass only booking data that is needed otherwise
          // If you have added new fields to the form that will affect to pricing,
          // you need to add the values to handleOnChange function
          const bookingData =
            startDate && endDate
              ? {
                unitType,
                dayUnitType,
                startDate,
                endDate,
              }
              : null;

          const showEstimatedBreakdown =
            bookingData && lineItems && !fetchLineItemsInProgress && !fetchLineItemsError;

          const bookingInfoMaybe = showEstimatedBreakdown ? (
            <div className={css.priceBreakdownContainer}>
              <h3 className={css.priceBreakdownTitle}>
                <FormattedMessage id="BookingDatesForm.priceBreakdownTitle" />
              </h3>
              <EstimatedBreakdownMaybe bookingData={bookingData} lineItems={lineItems} />
            </div>
          ) : null;

          const loadingSpinnerMaybe = fetchLineItemsInProgress ? (
            <IconSpinner className={css.spinner} />
          ) : null;

          const bookingInfoErrorMaybe = fetchLineItemsError ? (
            <span className={css.sideBarError}>
              <FormattedMessage id="BookingDatesForm.fetchLineItemsError" />
            </span>
          ) : null;

          const dateFormatOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          };

          const now = moment();
          const today = now.startOf('day').toDate();
          const tomorrow = now
            .startOf('day')
            .add(1, 'days')
            .toDate();
          const startDatePlaceholderText =
            startDatePlaceholder || intl.formatDate(today, dateFormatOptions);
          const endDatePlaceholderText =
            endDatePlaceholder || intl.formatDate(tomorrow, dateFormatOptions);
          const submitButtonClasses = classNames(
            submitButtonWrapperClassName || css.submitButtonWrapper
          );
          const submitDisabled = !detail || !numberPetArray;

          return (
            <Form onSubmit={handleSubmit} className={classes} enforcePagePreloadFor="CheckoutPage">
              {timeSlotsError}
              <FormSpy
                subscription={{ values: true }}
                onChange={values => {
                  this.handleOnChange(values);
                }}
              />


              <div className={css.categoryText}>
                <FormattedMessage className={css.description} id="EditListingDescriptionForm.categorytext" />
              </div>
              <div className={css.categoryCheck}>
                {detail.map((st) => {
                  return (
                    <FieldCheckbox
                      className={css.features}
                      id={st}
                      name={"serviceSetup"}
                      value={st}
                      label={getLabel(options, st)}
                      disabled={submitDisabled}
                      validate={composeValidators(
                        requiredFieldArrayCheckbox(requiredMessage),

                      )}
                    />
                  )
                })}
                {/* {values.serviceSetup ? "required this field" :null} */}
                {letofstay && discount ?
                
                  <div className={css.discountBooking}>" {firstname} is offering a {discount}% discount if you book more than {letofstay} days "</div>
                  : null}
              </div>
              <FieldSelect
                className={css.numberPets}
                id="numberOfPets"
                name="numberOfPets"
                label={"How many Pets?"}
                disabled={submitDisabled}
                validate={composeValidators(
                  required(requiredpetMessage),

                )}
              >

                <option value={""}>select</option>
                {/* {new Array(numberPetArray).fill('0').map((st) => <option key={st} value={st}>{st}</option>)} */}
                {numberPetArray.map((st) => {
                  return (
                    <option key={st} value={st}>{st}</option>
                  )
                })}

              </FieldSelect>

              <FieldDateRangeInput
                className={css.bookingDates}
                name="bookingDates"
                unitType={unitType}
                dayUnitType={dayUnitType}
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
                disabled={fetchLineItemsInProgress}
              />

              {bookingInfoMaybe}
              {loadingSpinnerMaybe}
              {bookingInfoErrorMaybe}

              <p className={css.smallPrint}>
                <FormattedMessage
                  id={
                    isOwnListing
                      ? 'BookingDatesForm.ownListing'
                      : 'BookingDatesForm.youWontBeChargedInfo'
                  }
                />
              </p>
              <div className={submitButtonClasses}>
                <PrimaryButton type="submit" disabled={submitDisabled}>
                  <FormattedMessage id="BookingDatesForm.requestToBook" />
                </PrimaryButton>
              </div>

              <div className={css.serviceNameHeading}>
                <FormattedMessage id="BookingPanel.servicetect" values={{ name: firstname }} />
              </div>

              <div className={css.pricingBox}>
                 <div className={css.pricingHeading}>Pricing</div>

                 <div className={css.pricingDescription}>
                          <span>Minimum_Price</span> = AUD{min}.00
                        </div> 
                        <div className={css.pricingDescription}>
                          <span>Over night rate</span> = AUD{nightprice}.00  per night </div>
                          <div className={css.pricingDescription}>
                          <span>Day care stay</span> = AUD{dayprice}.00  per day</div>
                
                {
                  values?.serviceSetup?.length === 2 ?
                    <>
                      {(values.serviceSetup) ?
                        <div className={css.pricingDescription}>
                          <span>Minimum_Price</span> = AUD{min}.00
                        </div> : null}
                    </>
                    :
                    <>
                      {(values?.serviceSetup?.find((e) => e == "overnightsStay")) ?
                        <div className={css.pricingDescription}>
                          <span>Over night rate</span> = AUD{nightprice}.00  per night </div> : null}

                      {(values?.serviceSetup?.find((e) => e == "dayCareStay")) ?
                        <div className={css.pricingDescription}>
                          <span>Day care stay</span> = AUD{dayprice}.00  per day</div> : null}
                    </>
                }
              </div>



            </Form>
          );
        }}
      />
    );
  }
}

BookingDatesFormComponent.defaultProps = {
  filterConfig: config.custom.filters,
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  price: null,
  isOwnListing: false,
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  timeSlots: null,
  lineItems: null,
  fetchLineItemsError: null,
};

BookingDatesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  unitType: propTypes.bookingUnitType.isRequired,
  price: propTypes.money,
  isOwnListing: bool,
  timeSlots: arrayOf(propTypes.timeSlot),

  onFetchTransactionLineItems: func.isRequired,
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,
  filterConfig: propTypes.filterConfig,
  // from injectIntl
  intl: intlShape.isRequired,

  // for tests
  startDatePlaceholder: string,
  endDatePlaceholder: string,
};

const BookingDatesForm = compose(injectIntl)(BookingDatesFormComponent);
BookingDatesForm.displayName = 'BookingDatesForm';

export default BookingDatesForm;
