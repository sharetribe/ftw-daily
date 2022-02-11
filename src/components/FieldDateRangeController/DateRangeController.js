import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  DayPickerRangeController,
  isInclusivelyAfterDay,
  isInclusivelyBeforeDay,
} from 'react-dates';
import classNames from 'classnames';
import moment from 'moment';
import { START_DATE } from '../../util/dates';
import config from '../../config';

import { IconArrowHead } from '../../components';
import css from './DateRangeController.module.css';

export const HORIZONTAL_ORIENTATION = 'horizontal';
export const ANCHOR_LEFT = 'left';

// IconArrowHead component might not be defined if exposed directly to the file.
// This component is called before IconArrowHead component in components/index.js
const PrevIcon = props => (
  <IconArrowHead {...props} direction="left" rootClassName={css.arrowIcon} />
);
const NextIcon = props => (
  <IconArrowHead {...props} direction="right" rootClassName={css.arrowIcon} />
);

const defaultProps = {
  startDateOffset: undefined,
  endDateOffset: undefined,

  // calendar presentation and interaction related props

  orientation: HORIZONTAL_ORIENTATION,
  verticalHeight: undefined,
  withPortal: false,
  isRTL: false,
  initialVisibleMonth: null,
  firstDayOfWeek: config.i18n.firstDayOfWeek,
  numberOfMonths: 1,
  daySize: 38,
  keepOpenOnDateSelect: false,
  renderCalendarInfo: null,
  hideKeyboardShortcutsPanel: true,

  // navigation related props
  navPrev: <PrevIcon />,
  navNext: <NextIcon />,
  onPrevMonthClick() {},
  onNextMonthClick() {},
  transitionDuration: 200, // milliseconds between next month changes etc.

  renderCalendarDay: undefined, // If undefined, renders react-dates/lib/components/CalendarDay
  // day presentation and interaction related props
  renderDayContents: day => {
    return <span className="renderedDay">{day.format('D')}</span>;
  },
  minimumNights: config.bookingUnitType === 'line-item/night' ? 1 : 0,
  enableOutsideDays: false,
  isDayBlocked: () => false,

  // outside range -><- today ... today+available days -1 -><- outside range
  isOutsideRange: day => {
    const endOfRange = config.dayCountAvailableForBooking - 1;
    return (
      !isInclusivelyAfterDay(day, moment()) ||
      !isInclusivelyBeforeDay(day, moment().add(endOfRange, 'days'))
    );
  },
  isDayHighlighted: () => {},

  // Internationalization props
  // Multilocale support can be achieved with displayFormat like moment.localeData.longDateFormat('L')
  // https://momentjs.com/
  // displayFormat: 'ddd, MMM D',
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: {}, // Add overwrites to default phrases used by react-dates
};

class DateRangeController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: props.value && props.value.startDate ? moment(props.value.startDate) : null,
      endDate: props.value && props.value.endDate ? moment(props.value.endDate) : null,
      focusedInput: START_DATE,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onDatesChange(values) {
    const { startDate, endDate } = values;

    const start = startDate ? startDate.toDate() : null;
    const end = endDate ? endDate.toDate() : null;

    this.setState({ startDate, endDate });

    if (startDate && endDate) {
      this.props.onChange({ startDate: start, endDate: end });
    }
  }

  onFocusChange(focusedInput) {
    this.setState({
      // Force the focusedInput to always be truthy so that dates are always selectable
      focusedInput: !focusedInput ? START_DATE : focusedInput,
    });
  }

  onReset(startDate, endDate) {
    if (startDate && endDate) {
      this.setState({
        startDate: moment(startDate),
        endDate: moment(endDate),
        focusedInput: START_DATE,
      });
    } else {
      this.setState({
        startDate: null,
        endDate: null,
        focusedInput: START_DATE,
      });
    }
  }

  render() {
    // Removing Final Form field props: name, value, onChange, onFocus, meta, children, render
    const {
      rootClassName,
      className,
      name,
      value,
      onChange,
      onFocus,
      meta,
      children,
      render,
      ...controllerProps
    } = this.props;

    const classes = classNames(rootClassName || css.inputRoot, className);

    const startDateFromState = this.state.startDate;
    const endDateFromState = this.state.endDate;

    const startDateFromForm = value && value.startDate ? moment(value.startDate) : null;
    const endDateFromForm = value && value.endDate ? moment(value.endDate) : null;

    const isSelected = startDateFromState && endDateFromState;

    // Value given by Final Form reflects url params and is valid if both dates are set.
    // If only one date is selected state should be used to get the correct date.
    const startDate = isSelected ? startDateFromForm : startDateFromState;
    const endDate = isSelected ? endDateFromForm : endDateFromState;

    return (
      <div className={classes}>
        <DayPickerRangeController
          {...controllerProps}
          startDate={startDate}
          endDate={endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.focusedInput}
          onFocusChange={this.onFocusChange}
        />
      </div>
    );
  }
}

DateRangeController.defaultProps = {
  rootClassName: null,
  className: null,
  ...defaultProps,
};

const { string } = PropTypes;

DateRangeController.propTypes = {
  rootClassName: string,
  className: string,
};

export default DateRangeController;
