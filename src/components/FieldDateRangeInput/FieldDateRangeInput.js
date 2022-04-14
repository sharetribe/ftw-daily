/**
 * Provides a date picker for Final Forms (using https://github.com/airbnb/react-dates)
 *
 * NOTE: If you are using this component inside BookingDatesForm,
 * you should convert value.date to start date and end date before submitting it to API
 */

import React, { Component } from 'react';
import { bool, func, object, oneOf, string, number, arrayOf } from 'prop-types';
import { Field } from 'react-final-form';
import classNames from 'classnames';
import { START_DATE, END_DATE } from '../../util/dates';
import {
  DAILY_BOOKING,
  DAILY_PRICE,
  MONTHLY_BOOKING,
  MONTHLY_PRICE,
  propTypes,
  WEEKLY_BOOKING,
  WEEKLY_PRICE
} from '../../util/types';
import { ValidationError } from '../../components';
import moment from 'moment';
import DateRangeInput from './DateRangeInput';
import css from './FieldDateRangeInput.module.css';
import {discountTypes} from "../../marketplace-custom-config";
import {FormattedMessage} from "../../util/reactIntl";

const MAX_MOBILE_SCREEN_WIDTH = 768;

export const currentTypeBook = bookingType => {
  switch(bookingType){
    case DAILY_PRICE:
      return DAILY_BOOKING;
    case WEEKLY_PRICE:
      return WEEKLY_BOOKING;
    case MONTHLY_PRICE:
      return MONTHLY_BOOKING;
    default:
      return null;
  }
}

class FieldDateRangeInputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { focusedInput: null };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Update focusedInput in case a new value for it is
    // passed in the props. This may occur if the focus
    // is manually set to the date picker.
    if (this.props.focusedInput && this.props.focusedInput !== prevProps.focusedInput) {
      this.setState({ focusedInput: this.props.focusedInput });
    }
  }

  handleBlur(focusedInput) {
    this.setState({ focusedInput: null });
    this.props.input.onBlur(focusedInput);
    // Notify the containing component that the focused
    // input has changed.
    if (this.props.onFocusedInputChange) {
      this.props.onFocusedInputChange(null);
    }
  }

  handleFocus(focusedInput) {
    this.setState({ focusedInput });
    this.props.input.onFocus(focusedInput);
  }


  getPreparedDates(values){
    const { offsetLength } = this.props;

    if (!offsetLength || !values.startDate || !values.endDate){
      return values;
    }

    const {startDate, endDate} = values;

    return {
      startDate,
      endDate: moment(endDate).subtract(moment(endDate).diff(moment(startDate), 'days')%offsetLength, 'days').toDate()
    }
  }

  render() {
    /* eslint-disable no-unused-vars */
    const {
      className,
      rootClassName,
      unitType,
      minimumLength,
      offsetLength,
      startDateId,
      startDateLabel,
      endDateId,
      endDateLabel,
      input,
      meta,
      useMobileMargins,
      // Extract focusedInput and onFocusedInputChange so that
      // the same values will not be passed on to subcomponents.
      focusedInput,
      onFocusedInputChange,
      minBookingCount,
      minBookingType,
      bookingType,
      ...rest
    } = this.props;
    /* eslint-disable no-unused-vars */

    // console.log('11111111', this.props)
    const textForMinBook = discountTypes.filter( el => el.key === minBookingType)[0] || ''
    const minBookText = minBookingType && `${minBookingCount} ${textForMinBook?.label}`
    // const minBookText = null

    if (startDateLabel && !startDateId) {
      throw new Error('startDateId required when a startDateLabel is given');
    }

    if (endDateLabel && !endDateId) {
      throw new Error('endDateId required when a endDateLabel is given');
    }

    const { touched, error } = meta;
    const value = input.value;

    // If startDate is valid label changes color and bottom border changes color too
    const startDateIsValid = value && value.startDate instanceof Date;
    const startDateLabelClasses = classNames(css.startDateLabel, {
      [css.labelSuccess]: false, //startDateIsValid,
    });
    const startDateBorderClasses = classNames(css.input, {
      [css.inputSuccess]: startDateIsValid,
      [css.inputError]: touched && !startDateIsValid && typeof error === 'string',
      [css.hover]: this.state.focusedInput === START_DATE,
    });

    // If endDate is valid label changes color and bottom border changes color too
    const endDateIsValid = value && value.endDate instanceof Date;
    const endDateLabelClasses = classNames(css.endDateLabel, {
      [css.labelSuccess]: false, //endDateIsValid,
    });
    const endDateBorderClasses = classNames(css.input, {
      [css.inputSuccess]: endDateIsValid,
      [css.inputError]: touched && !endDateIsValid && typeof error === 'string',
      [css.hover]: this.state.focusedInput === END_DATE,
    });

    const label =
      startDateLabel && endDateLabel ? (
        <div className={classNames(css.labels, { [css.mobileMargins]: useMobileMargins })}>
          <label className={startDateLabelClasses} htmlFor={startDateId}>
            {startDateLabel}
          </label>
          <label className={endDateLabelClasses} htmlFor={endDateId}>
            {endDateLabel}
          </label>
        </div>
      ) : null;

    // eslint-disable-next-line no-unused-vars
    const { onBlur, onFocus, type, checked, onChange,...restOfInput } = input;

    const handleChange = e => onChange(this.getPreparedDates(e));

    const inputProps = {
      unitType,
      minimumLength,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      useMobileMargins,
      readOnly: typeof window !== 'undefined' && window.innerWidth < MAX_MOBILE_SCREEN_WIDTH,
      onChange: handleChange,
      ...restOfInput,
      ...rest,
      focusedInput: this.state.focusedInput,
      startDateId,
      endDateId,
      minBookingCount,
      minBookingType,
      bookingType,
    };
    const classes = classNames(rootClassName || css.fieldRoot, className);
    const errorClasses = classNames({ [css.mobileMargins]: useMobileMargins });

    return (
      <div className={classes}>
        {label}
        <DateRangeInput {...inputProps} />
        <div
          className={classNames(css.inputBorders, {
            [css.mobileMargins]: useMobileMargins && !this.state.focusedInput,
          })}
        >
          <div className={startDateBorderClasses} />
          <div className={endDateBorderClasses} />
        </div>

        { minBookingType && minBookingType === currentTypeBook(bookingType) &&
          <div className={css.infoBlockMinBooking}>
            <span className={classNames(css.infoTextMinBooking, css.distans)}>•</span>
            <p className={css.infoTextMinBooking}>
              <FormattedMessage id="FieldDateTimeInput.minBoookTextShow" values={{minBookText}}/>
            </p>
          </div>}

        <ValidationError className={errorClasses} fieldMeta={meta} />
      </div>
    );
  }
}

FieldDateRangeInputComponent.defaultProps = {
  className: null,
  rootClassName: null,
  useMobileMargins: false,
  endDateId: null,
  endDateLabel: null,
  endDatePlaceholderText: null,
  startDateId: null,
  startDateLabel: null,
  startDatePlaceholderText: null,
  focusedInput: null,
  onFocusedInputChange: null,
  timeSlots: null,
};

FieldDateRangeInputComponent.propTypes = {
  className: string,
  rootClassName: string,
  unitType: propTypes.bookingUnitType.isRequired,
  minimumLength: number,
  useMobileMargins: bool,
  endDateId: string,
  endDateLabel: string,
  endDatePlaceholderText: string,
  startDateId: string,
  startDateLabel: string,
  startDatePlaceholderText: string,
  timeSlots: arrayOf(propTypes.timeSlot),
  input: object.isRequired,
  meta: object.isRequired,
  focusedInput: oneOf([START_DATE, END_DATE]),
  onFocusedInputChange: func,
};

const FieldDateRangeInput = props => {
  return <Field component={FieldDateRangeInputComponent} {...props} />;
};

export { DateRangeInput };
export default FieldDateRangeInput;
