import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import css from './DatePick.css';
import calendar from './images/calendar.png';

export default class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = {
      selectedDay: undefined,
    };
  }

  handleDayChange(day) {
    this.setState({ selectedDay: day });
  }

  render() {
    const { selectedDay } = this.state;
    return (
      <div className={css.DatePick}>
      <div className={css.calendarIcon}>
      <img src={calendar} />
      </div>
        <DayPickerInput onDayChange={this.handleDayChange} />
      </div>
    );
  }
}