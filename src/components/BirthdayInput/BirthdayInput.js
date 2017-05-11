import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { range } from 'lodash';
import { Select } from '../../components';

import css from './BirthdayInput.css';

// Since redux-form tracks the onBlur event for marking the field as
// touched (which triggers possible error validation rendering), only
// trigger the event asynchronously when no other input within this
// component has received focus.
//
// This prevents showing the validation error when the user selects a
// value and moves on to another input within this component.
const BLUR_TIMEOUT = 100;

const pad = num => {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  }
  return num.toString();
};

const parseNum = str => {
  const num = parseInt(str, 10);
  return isNaN(num) ? null : num;
};

// Validate that the given date has the same info as the selected
// value, i.e. it has not e.g. rolled over to the next month if the
// selected month doesn't have as many days as selected.
const isValidDate = (date, year, month, day) => {
  const yearsMatch = date.getFullYear() === year;
  const monthsMatch = date.getMonth() + 1 === month;
  const daysMatch = date.getDate() === day;
  return yearsMatch && monthsMatch && daysMatch;
};

// Create a Date from the selected values. Return null if the date is
// invalid.
const dateFromSelected = ({ day, month, year }) => {
  const dayNum = parseNum(day);
  const monthNum = parseNum(month);
  const yearNum = parseNum(year);
  if (dayNum !== null && monthNum !== null && yearNum !== null) {
    const d = new Date(Date.UTC(yearNum, monthNum - 1, dayNum));
    return isValidDate(d, yearNum, monthNum, dayNum) ? d : null;
  }
  return null;
};

const selectedFromDate = date => ({
  day: date.getDate(),
  month: date.getMonth() + 1,
  year: date.getFullYear(),
});

// Always show 31 days per month
const days = range(1, 32);
const months = range(1, 13);

// Show a certain number of years up to the current year
const currentYear = new Date().getFullYear();
const yearsToShow = 80;
const years = range(currentYear, currentYear - yearsToShow, -1);

class BirthdayInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {
        day: null,
        month: null,
        year: null,
      },
    };
    this.blurTimeoutId = null;
    this.handleSelectFocus = this.handleSelectFocus.bind(this);
    this.handleSelectBlur = this.handleSelectBlur.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  componentWillMount() {
    const value = this.props.input.value;
    if (value instanceof Date) {
      this.setState({ selected: selectedFromDate(value) });
    }
  }
  componentWillReceiveProps(newProps) {
    const oldValue = this.props.input.value;
    const newValue = newProps.input.value;
    const valueChanged = oldValue !== newValue;
    if (valueChanged && newValue instanceof Date) {
      this.setState({ selected: selectedFromDate(newValue) });
    }
  }
  componentWillUnmount() {
    window.clearTimeout(this.blurTimeoutId);
  }
  handleSelectFocus() {
    window.clearTimeout(this.blurTimeoutId);
    this.props.input.onFocus();
  }
  handleSelectBlur() {
    window.clearTimeout(this.blurTimeoutId);
    this.blurTimeoutId = window.setTimeout(
      () => {
        this.props.input.onBlur();
      },
      BLUR_TIMEOUT
    );
  }
  handleSelectChange(type, value) {
    this.setState(prevState => {
      const selected = { ...prevState.selected, [type]: parseNum(value) };
      this.props.input.onChange(dateFromSelected(selected));
      return { selected };
    });
  }
  render() {
    const { className } = this.props;

    const selectedValue = n => {
      return typeof n === 'number' ? n : '';
    };

    const classes = classNames(css.root, className);

    return (
      <div className={classes}>
        <Select
          value={selectedValue(this.state.selected.day)}
          className={css.dropdown}
          onFocus={() => this.handleSelectFocus()}
          onBlur={() => this.handleSelectBlur()}
          onChange={e => this.handleSelectChange('day', e.target.value)}
        >
          <option />
          {days.map(d => <option key={d} value={d}>{pad(d)}</option>)}
        </Select>
        <Select
          value={selectedValue(this.state.selected.month)}
          className={css.dropdown}
          onFocus={() => this.handleSelectFocus()}
          onBlur={() => this.handleSelectBlur()}
          onChange={e => this.handleSelectChange('month', e.target.value)}
        >
          <option />
          {months.map(m => <option key={m} value={m}>{pad(m)}</option>)}
        </Select>
        <Select
          value={selectedValue(this.state.selected.year)}
          className={css.dropdown}
          onFocus={() => this.handleSelectFocus()}
          onBlur={() => this.handleSelectBlur()}
          onChange={e => this.handleSelectChange('year', e.target.value)}
        >
          <option />
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </Select>
      </div>
    );
  }
}

BirthdayInput.defaultProps = { className: '' };

const { string, shape, instanceOf, func } = PropTypes;

BirthdayInput.propTypes = {
  className: string,
  input: shape({
    name: string.isRequired,
    value: instanceOf(Date),
    onChange: func.isRequired,
    onFocus: func.isRequired,
    onBlur: func.isRequired,
  }).isRequired,
};

export default BirthdayInput;
