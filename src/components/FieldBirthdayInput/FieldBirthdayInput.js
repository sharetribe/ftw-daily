import React, { Component } from 'react';
import { func, instanceOf, object, node, string, bool } from 'prop-types';
import { Field } from 'react-final-form';
import { injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import range from 'lodash/range';
import { ValidationError } from '../../components';

import css from './FieldBirthdayInput.module.css';

// Since final-form tracks the onBlur event for marking the field as
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
  const num = Number.parseInt(str, 10);
  return Number.isNaN(num) ? null : num;
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

// Create a Date from the selected values. Return null if the date
// is invalid.
const dateFromSelected = ({ day, month, year }) => {
  const dayNum = parseNum(day);
  const monthNum = parseNum(month);
  const yearNum = parseNum(year);
  if (dayNum !== null && monthNum !== null && yearNum !== null) {
    const d = new Date(yearNum, monthNum - 1, dayNum);
    return isValidDate(d, yearNum, monthNum, dayNum) ? { year, month, day } : null;
  }
  return null;
};

// Get the year/month/day info from the date object in local timezone.
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

class BirthdayInputComponent extends Component {
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
  componentDidMount() {
    const value = this.props.valueFromForm;
    if (value instanceof Date) {
      this.setState({ selected: selectedFromDate(value) });
    }
  }
  componentDidUpdate(prevProps) {
    const oldValue = prevProps.valueFromForm;
    const newValue = this.props.valueFromForm;
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
    this.props.onFocus();
  }
  handleSelectBlur() {
    window.clearTimeout(this.blurTimeoutId);
    this.blurTimeoutId = window.setTimeout(() => {
      this.props.onBlur();
    }, BLUR_TIMEOUT);
  }
  handleSelectChange(type, value) {
    this.setState(prevState => {
      const selected = { ...prevState.selected, [type]: parseNum(value) };
      this.props.onChange(dateFromSelected(selected));
      return { selected };
    });
  }
  render() {
    const {
      selectClassName,
      dateId,
      monthId,
      yearId,
      dateLabel,
      monthLabel,
      yearLabel,
      disabled,
      intl,
    } = this.props;

    const selectedValue = n => {
      return typeof n === 'number' ? n : '';
    };

    const datePlaceholder = intl.formatMessage({ id: 'PayoutDetailsForm.birthdayDatePlaceholder' });
    const monthPlaceholder = intl.formatMessage({
      id: 'PayoutDetailsForm.birthdayMonthPlaceholder',
    });
    const yearPlaceholder = intl.formatMessage({ id: 'PayoutDetailsForm.birthdayYearPlaceholder' });

    return (
      <div className={css.inputRoot}>
        <div className={css.selectWrapper}>
          {dateLabel}
          <select
            autoComplete="bday-day"
            disabled={disabled}
            id={dateId}
            value={selectedValue(this.state.selected.day)}
            className={classNames(selectClassName || css.select, {
              [css.notSet]: !parseNum(this.state.selected.day),
            })}
            onFocus={() => this.handleSelectFocus()}
            onBlur={() => this.handleSelectBlur()}
            onChange={e => this.handleSelectChange('day', e.target.value)}
          >
            <option disabled value="">
              {datePlaceholder}
            </option>
            {days.map(d => (
              <option key={d} value={d}>
                {pad(d)}
              </option>
            ))}
          </select>
        </div>
        <div className={css.selectWrapper}>
          {monthLabel}
          <select
            autoComplete="bday-month"
            disabled={disabled}
            id={monthId}
            value={selectedValue(this.state.selected.month)}
            className={classNames(selectClassName || css.select, {
              [css.notSet]: !parseNum(this.state.selected.month),
            })}
            onFocus={() => this.handleSelectFocus()}
            onBlur={() => this.handleSelectBlur()}
            onChange={e => this.handleSelectChange('month', e.target.value)}
          >
            <option disabled value="">
              {monthPlaceholder}
            </option>
            {months.map(m => (
              <option key={m} value={m}>
                {pad(m)}
              </option>
            ))}
          </select>
        </div>
        <div className={css.selectWrapper}>
          {yearLabel}
          <select
            autoComplete="bday-year"
            disabled={disabled}
            id={yearId}
            value={selectedValue(this.state.selected.year)}
            className={classNames(selectClassName || css.select, {
              [css.notSet]: !parseNum(this.state.selected.year),
            })}
            onFocus={() => this.handleSelectFocus()}
            onBlur={() => this.handleSelectBlur()}
            onChange={e => this.handleSelectChange('year', e.target.value)}
          >
            <option disabled value="">
              {yearPlaceholder}
            </option>
            {years.map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

BirthdayInputComponent.defaultProps = {
  selectClassName: null,
  dateLabel: null,
  monthLabel: null,
  yearLabel: null,
  valueFromForm: null,
  disabled: false,
};

BirthdayInputComponent.propTypes = {
  selectClassName: string,
  dateId: string.isRequired,
  monthId: string.isRequired,
  yearId: string.isRequired,
  dateLabel: node,
  monthLabel: node,
  yearLabel: node,
  valueFromForm: instanceOf(Date),
  onChange: func.isRequired,
  onFocus: func.isRequired,
  onBlur: func.isRequired,
  disabled: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

const BirthdayInput = injectIntl(BirthdayInputComponent);

const FieldBirthdayInputComponent = props => {
  const {
    rootClassName,
    className,
    id,
    label,
    labelForMonth,
    labelForYear,
    disabled,
    input,
    meta,
    valueFromForm,
  } = props;
  const { valid, invalid, touched, error } = meta;

  // Error message and input error styles are only shown if the
  // field has been touched and the validation has failed.
  const hasError = touched && invalid && error;

  const dateId = id;
  const monthId = `${id}-month`;
  const yearId = `${id}-year`;
  const dateLabel = label ? <label htmlFor={dateId}>{label}</label> : null;
  const monthLabel = labelForMonth ? <label htmlFor={monthId}>{labelForMonth}</label> : null;
  const yearLabel = labelForYear ? <label htmlFor={yearId}>{labelForYear}</label> : null;

  const selectClassName = classNames({
    [css.selectSuccess]: valid,
    [css.selectError]: hasError,
  });

  const inputProps = {
    selectClassName,
    dateId,
    monthId,
    yearId,
    dateLabel,
    monthLabel,
    yearLabel,
    disabled,
    valueFromForm,
    ...input,
  };
  const classes = classNames(rootClassName || css.fieldRoot, className);
  return (
    <div className={classes}>
      <BirthdayInput {...inputProps} />
      <ValidationError fieldMeta={meta} />
    </div>
  );
};

FieldBirthdayInputComponent.defaultProps = {
  rootClassName: null,
  className: null,
  label: null,
  labelForMonth: null,
  labelForYear: null,
  disabled: false,
};

FieldBirthdayInputComponent.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  label: string,
  labelForMonth: string,
  labelForYear: string,
  disabled: bool,
  input: object.isRequired,
  meta: object.isRequired,
};

const FieldBirthdayInput = props => {
  return <Field component={FieldBirthdayInputComponent} {...props} />;
};

export default FieldBirthdayInput;
