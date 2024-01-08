import React, { Component } from 'react';
import { string, bool, arrayOf, array, func } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import classNames from 'classnames';
import moment from 'moment';
import config from '../../config';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import { required, bookingDatesRequired, composeValidators, requiredFieldArrayCheckbox, bookingDateRequired } from '../../util/validators';
import { START_DATE, END_DATE } from '../../util/dates';
import { propTypes } from '../../util/types';
import { Form, IconSpinner, PrimaryButton, FieldDateRangeInput, FieldCheckbox, FieldRadioButton, FieldTextInput, FieldSelect, FieldDateInput } from '../../components';
import EstimatedBreakdownMaybe from './EstimatedBreakdownMaybe';
import { findOptionsForSelectFilter } from '../../util/search';

import css from './BookingDatesForm.module.css';

const identity = v => v;

export class BookingDatesFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { focusedInput: null, disabledDaytime: false };
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
    let { startDate, endDate, date } = e.bookingDates || {};
    const { serviceSetup } = e;
    const singlebooking = serviceSetup === "dayCareStay"; length == 1;

    if (singlebooking) {
      startDate = date;
      endDate = moment(startDate).add(1, 'day').toDate();
      Object.assign(e.bookingDates, { startDate, endDate });
    }
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
  handleOnChange(formValues,form) {
    let { startDate, endDate, date, endTime, startTime } = formValues.values && formValues.values.bookingDates ? formValues.values.bookingDates : {};

    const { serviceSetup, numberOfPets, dropPick } = formValues.values;
    const singlebooking = serviceSetup === "dayCareStay";
    if (singlebooking) {
      startDate = date;
      endDate = moment(startDate).add(1, 'day').toDate();
    }
   form.change("singlebooking",singlebooking)
   form.change("date",date)

    const { listing, listingId, isOwnListing } = this.props;
    const { pickyes, dropyes, } = (listing && listing.id && listing.attributes.publicData) || {};

    if (startDate && endDate && !this.props.fetchLineItemsInProgress) {
      this.props.onFetchTransactionLineItems({
        bookingData: {
          startDate,
          endDate,
          singlebooking,
          serviceSetup,
          numberOfPets,
          endTime,
          date,
          startTime,
          dropPick,
          pickyes,
          dropyes
        },
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
      const label = category?.find(c => c.key === key);
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
            dayUnitType,
            values,
            search,
            form,
            timeSlots,
            listing,
            filterConfig,
            numberPet,
            fetchTimeSlotsError,
            lineItems,
            fetchLineItemsInProgress,
            fetchLineItemsError,
            firstname,
          } = fieldRenderProps;
          const {
            pricepet,
            serviceSetup: detail,
            discountlengthOfStays: discount,
            lengthOfStays: letofstay,
            dropPick: dropupService
          } = (listing && listing.id && listing.attributes.publicData) || {};

          const { dayCare, overNight } = pricepet || {};
          const { dayCareStay1: dayprice } = dayCare || {};
          const { dayCareStay2: dayprice2 } = dayCare || {};
          const { dayCareStay3: dayprice3 } = dayCare || {};
          const { overnightsStayPrice1: nightprice } = overNight || {};
          const { overnightsStayPrice2: nightprice2 } = overNight || {};
          const { overnightsStayPrice3: nightprice3 } = overNight || {};

          function findMinPrice(var_args) {
            return Array.prototype.reduce.call(arguments, function (prev, current) {
              return prev && current ? Math.min(prev, current) : prev || current;
            });
          }

          let { startDate, endDate, date } = values && values.bookingDates ? values.bookingDates : {};

          const options = findOptionsForSelectFilter('serviceSetup', filterConfig);
          const services = findOptionsForSelectFilter('dropPick', filterConfig);

          const numberPetArray = numberPet && numberPet == 3
            ? [1, 2, 3]
            : numberPet == 2
              ? [1, 2]
              : [1];

          const singlebooking = values.serviceSetup === "dayCareStay";

          if (singlebooking) {
            startDate = date;
            endDate = moment(startDate).add(1, 'day').toDate();
          }

          const bookingStartLabel = intl.formatMessage({
            id: 'BookingDatesForm.bookingStartTitle',
          });
          const bookingEndLabel = intl.formatMessage({
            id: 'BookingDatesForm.bookingEndTitle',
          });
          const requiredMessage = intl.formatMessage({
            id: 'BookingDatesForm.requiredDate',
          });
          const starttimerequiredMessage = intl.formatMessage({
            id: 'BookingDatesForm.startrequiredDate',
          });
          const endtimerequiredMessage = intl.formatMessage({
            id: 'BookingDatesForm.endrequiredDate',
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
                startTime: values.startTime,
                endTime: values.endTime,
                endDate,
                singlebooking,
                date
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
                  this.handleOnChange(values,form);
                }}
              />


              <div className={css.categoryText}>
                <FormattedMessage className={css.description} id="EditListingDescriptionForm.categorytext" />
              </div>
              <div className={css.categoryCheck}>
                {detail?.map((st) => {
                  return (
                    <FieldRadioButton
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
                {letofstay && discount
                  ? <div className={css.discountBooking}>
                    " {firstname} is offering a {discount}% discount if you book more than {letofstay} days "
                  </div>
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

              {dropupService == "dropPick_no"
                ? null
                : <>
                  <div>Would you like to add on a pick up and drop off service to your booking?
                  </div>
                  <div>
                    {services?.map((st) => {
                      return (
                        <FieldRadioButton
                          className={css.features}
                          id={st.key}
                          name={"dropPick"}
                          value={st.key}
                          label={getLabel(services, st.label)}
                        // disabled={submitDisabled}
                        // validate={composeValidators(
                        //   requiredFieldArrayCheckbox(requiredMessage),

                        // )}
                        />
                      )
                    })}

                  </div>
                </>}

              {singlebooking
                ? <FieldDateInput
                  className={css.bookingDates}
                  name="bookingDates"
                  startDatePlaceholderText={startDatePlaceholderText}
                  format={identity}
                   timeSlots={timeSlots?.slice(2, timeSlots?.length)}
                  validate={composeValidators(
                    required(requiredMessage),
                    bookingDateRequired(startDateErrorMessage)
                  )}

                />
                : <FieldDateRangeInput
                  className={css.bookingDates}
                  name="bookingDates"
                  unitType={singlebooking ? dayUnitType : unitType}
                  startDateId={`${formId}.bookingStartDate`}
                  startDateLabel={bookingStartLabel}
                  startDatePlaceholderText={startDatePlaceholderText}
                  endDateId={`${formId}.bookingEndDate`}
                  endDateLabel={bookingEndLabel}
                  endDatePlaceholderText={endDatePlaceholderText}
                  focusedInput={this.state.focusedInput}
                  onFocusedInputChange={this.onFocusedInputChange}
                  format={identity}
                  timeSlots={timeSlots?.slice(2, timeSlots?.length)}
                  useMobileMargins
                  initialValues={{
                      bookingDates:search?.dates?search.dates:null,
      
                  }}
                  validate={composeValidators(
                    required(requiredMessage),
                    bookingDatesRequired(startDateErrorMessage, endDateErrorMessage)
                  )}
                  disabled={fetchLineItemsInProgress}
                />}

              <div>

                <div className={css.rowBox}>
                  <FieldSelect
                    className={css.startTime} // Add a className for styling
                    id={'startTime'} // Give it a unique ID
                    name={'startTime'} // Set a unique name for the field
                    validate={composeValidators(
                      required(starttimerequiredMessage),
             
                    )}
                  >
                    <option disabled value="">
                      Start Time
                    </option>
                    {singlebooking // Check if it's "daysbase" service
                      ? Array.from({ length: 13 }, (_, index) => {
                        const hour = String(index + 7).padStart(2, '0'); // Start from 7 am
                        return (
                          <option key={hour} value={hour + ':00'}>
                            {hour + ':00'}
                          </option>
                        );
                      })
                      : Array.from({ length: 24 }, (_, index) => {
                        const hour = String(index + 7).padStart(2, '0'); // Show 24-hour time options
                        return (
                          <option key={hour} value={hour + ':00'}>
                            {hour + ':00'}
                          </option>
                        );
                      })}
                  </FieldSelect>

                  <FieldSelect
                    className={css.startTime} // Add a className for styling
                    id={'endTime'} // Give it a unique ID
                    name={'endTime'} // Set a unique name for the field
                    validate={composeValidators(
                      required(endtimerequiredMessage),
                    
                    )}
                  >
                    <option disabled value="">
                      End Time
                    </option>
                    {singlebooking
                      // Check if it's "daysbase" service
                      ? Array.from({ length: values && values.startTime && [7, 8].includes(+values.startTime.split(":")[0]) ? (+values.startTime.split(":")[0] == 7 ? 11 : 12) : 13 }, (_, index) => {
                        const hour = String(index + 7).padStart(2, '0'); // Start from 7 am


                        if (values && values.startTime && +values.startTime.split(":")[0] >= (+hour)) {
                          return null;
                        }
                        return (
                          <option key={hour} value={hour + ':00'}>
                            {hour + ':00'}
                          </option>
                        );
                      })
                      :
                      //  Array.from({ length: 24 }, (_, index) => {
                      //   const hour = String(index).padStart(2, '0'); // Show 24-hour time options
                      //   if (values && values.startTime && +values.startTime.split(":")[0] <= (+hour)) {
                      //     return null;
                      //   }
                      //   return (
                      //     <option key={hour} value={hour + ':00'}>
                      //       {hour + ':00'}
                      //     </option>
                      //   );
                      // })
                      Array.from({ length: 24 }, (_, index) => {
                        const hour = String(index).padStart(2, '0'); // Show 24-hour time options
                        if (values && values.startTime && +values.startTime.split(":")[0] <= (+hour)) {
                          return null;
                        }
                        const endTime = String((index + 2) % 24).padStart(2, '0'); // Add 2 hours to the hour and ensure it wraps around
                        return (
                          <option key={hour} value={endTime + ':00'}>
                            {endTime + ':00'}
                          </option>
                        );
                      })
                      
                      }
                  </FieldSelect>
                </div>
              </div>

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
                <div className={css.pricingTitle}>Pricing</div>


                <div>


                  {(detail?.find((e) => e == "overnightsStay")) ?
                    <div className={css.pricingDescription}>
                      <h2 className={css.featuresTitle}>Over night rate Price of</h2>
                      <span>1 pet</span> = AUD{nightprice}.00  per night
                      {
                        nightprice2 > 0 ?

                          <div>
                            <span> 2 pet</span> = AUD{nightprice2}.00  per night
                          </div>


                          : null
                      }
                      {
                        nightprice3 > 0 ? <div>
                          <span> 3 pet</span> = AUD{nightprice3}.00  per night
                        </div> : null
                      }


                    </div> : null}

                  {(detail?.find((e) => e == "dayCareStay")) ?
                    <div className={css.pricingDescription}>
                      <h2 className={css.featuresTitle}>Day care stay Price of</h2>
                      <span> 1 pet</span> = AUD{dayprice}.00  per day
                      {
                        dayprice2 > 0 ?
                          <div>

                            <span > 2 pets</span> = AUD{dayprice2}.00  per day

                          </div> : null
                      }
                      {
                        dayprice3 > 0 ?
                          <div>
                            <span > 3+ pets</span> = AUD{dayprice3}.00  per day

                          </div> : null
                      }


                    </div> : null}

                </div>
                {/* {values?.serviceSetup?.find((e) => e == "overnightsStay")
                      ? <div className={css.pricingDescription}>
                        <span className={css.boldText}>Over night rate</span> = AUD{nightprice}.00  per night </div>
                      : null} */}
                {/* {values?.serviceSetup == "dayCareStay"
                      ?
                      <div className={css.pricingDescription}>

                      <span>Day care stay Price of 1 pet</span> = AUD{dayprice}.00  per day
                      {
                        dayprice2 > 0 ?
                          <div>

                            <span >Day care stay Price of 2 pets</span> = AUD{dayprice2}.00  per day

                          </div> : null
                      }
                      {
                        dayprice3 > 0 ?
                          <div>
                            <span >Day care stay Price of 3+ pets</span> = AUD{dayprice3}.00  per day

                          </div> : null
                      }


                    </div>

                      : null}  */}


                {/* {values?.serviceSetup ?
                  <>
                    {values?.serviceSetup?.find((e) => e == "overnightsStay")
                      ? <div className={css.pricingDescription}>
                        <span className={css.boldText}>Over night rate</span> = AUD{nightprice}.00  per night </div>
                      : null}
                    {values?.serviceSetup?.find((e) => e == "dayCareStay")
                      ? <div className={css.pricingDescription}>
                        <span className={css.boldText}>Day care stay</span> = AUD{dayprice}.00  per day
                        <span className={css.boldText}>Day care stay</span> = AUD{dayprice2}.00  per day
                      </div>

                      : null}
                  </> :

                  <div>


                    {(detail?.find((e) => e == "overnightsStay")) ?
                      <div className={css.pricingDescription}>
                        <span>Over night rate Price of 1 pet</span> = AUD{nightprice}.00  per night
                        {
                          nightprice2 > 0 ?

                            <div>
                              <span>Over night rate Price of 2 pet</span> = AUD{nightprice2}.00  per night
                            </div>


                            : null
                        }
                        {
                          nightprice3 > 0 ? <div>
                            <span>Over night rate Price of 3 pet</span> = AUD{nightprice3}.00  per night
                          </div> : null
                        } */}


                {/* {values?.serviceSetup ?
                  <>
                    {values?.serviceSetup?.find((e) => e == "overnightsStay")
                      ? <div className={css.pricingDescription}>
                        <span className={css.boldText}>Over night rate</span> = AUD{nightprice}.00  per night </div>
                      : null}
                    {values?.serviceSetup?.find((e) => e == "dayCareStay")
                      ? <div className={css.pricingDescription}>
                        <span className={css.boldText}>Day care stay</span> = AUD{dayprice}.00  per day
                        <span className={css.boldText}>Day care stay</span> = AUD{dayprice2}.00  per day
                      </div>

                      : null}
                  </> :

                  <div>


                    {(detail?.find((e) => e == "overnightsStay")) ?
                      <div className={css.pricingDescription}>
                        <span>Over night rate Price of 1 pet</span> = AUD{nightprice}.00  per night
                        {
                          nightprice2 > 0 ?

                            <div>
                              <span>Over night rate Price of 2 pet</span> = AUD{nightprice2}.00  per night
                            </div>


                            : null
                        }
                        {
                          nightprice3 > 0 ? <div>
                            <span>Over night rate Price of 3 pet</span> = AUD{nightprice3}.00  per night
                          </div> : null
                        }


                      </div> : null}

                    {(detail?.find((e) => e == "dayCareStay")) ?
                      <div className={css.pricingDescription}>

                        <span>Day care stay Price of 1 pet</span> = AUD{dayprice}.00  per day
                        {
                          dayprice2 > 0 ?
                            <div>

                              <span >Day care stay Price of 2 pets</span> = AUD{dayprice2}.00  per day

                            </div> : null
                        }
                        {
                          dayprice3 > 0 ?
                            <div>
                              <span >Day care stay Price of 3+ pets</span> = AUD{dayprice3}.00  per day

                            </div> : null
                        }


                      </div> : null}

                  </div>

                }
                } */}

                {/* {values?.serviceSetup
                  ? values?.serviceSetup?.length === 2
                    ? values.serviceSetup
                    // ? <div className={css.pricingDescription}>
                    //   <div>
                    //     <span className={css.boldText}>Over night rate</span> = AUD{nightprice}.00  per night
                    //     <span className={css.boldText}>Over night rate</span> = AUD{nightprice2}.00  per night
                    //     <span className={css.boldText}>Over night rate</span> = AUD{nightprice3}.00  per night
                    //   </div>
                    //   <span className={css.boldText}>Day care stay</span> = AUD{dayprice}.00  per day
                    //   <span className={css.boldText}>Day care stay</span> = AUD{dayprice2}.00  per day
                    //   <span className={css.boldText}>Day care stay</span> = AUD{dayprice3}.00  per day
                    // </div>
                    // : null
                    : <>
                      {values?.serviceSetup?.find((e) => e == "overnightsStay")
                        ? <div className={css.pricingDescription}>
                          <span className={css.boldText}>Over night rate</span> = AUD{nightprice}.00  per night </div>
                        : null}
                      {values?.serviceSetup?.find((e) => e == "dayCareStay")
                        ? <div className={css.pricingDescription}>
                          <span className={css.boldText}>Day care stay</span> = AUD{dayprice}.00  per day
                          <span className={css.boldText}>Day care stay</span> = AUD{dayprice2}.00  per day
                        </div>

                        : null}
                    </>
                  :
                  <div>


                    {(detail?.find((e) => e == "overnightsStay")) ?
                      <div className={css.pricingDescription}>
                        <span>Over night rate Price of 1 pet</span> = AUD{nightprice}.00  per night
                        {
                          nightprice2 > 0 ?

                            <div>
                              <span>Over night rate Price of 2 pet</span> = AUD{nightprice2}.00  per night
                            </div>


                            : null
                        }
                        {
                          nightprice3 > 0 ? <div>
                            <span>Over night rate Price of 3 pet</span> = AUD{nightprice3}.00  per night
                          </div> : null
                        }


                      </div> : null}

                    {(detail?.find((e) => e == "dayCareStay")) ?
                      <div className={css.pricingDescription}>

                        <span>Day care stay Price of 1 pet</span> = AUD{dayprice}.00  per day
                        {
                          dayprice2 > 0 ?
                            <div>

                              <span >Day care stay Price of 2 pets</span> = AUD{dayprice2}.00  per day

                            </div> : null
                        }
                        {
                          dayprice3 > 0 ?
                            <div>
                              <span >Day care stay Price of 3+ pets</span> = AUD{dayprice3}.00  per day

                            </div> : null
                        }


                      </div> : null}

                  </div>

                } */}
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
