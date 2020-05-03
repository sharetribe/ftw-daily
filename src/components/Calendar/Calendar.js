import React, { Component } from 'react';

import { Button } from '../../components';

import css from '../../forms/EditListingAvailabilityForm/EditListingAvailabilityForm.css';

class Calendar extends Component {
  componentDidMount() {
    const defaultDate = this.props.publicData.requiredDates
      ? this.props.publicData.requiredDates.split('to')
      : [];

    const datepicker = window.flatpickr(document.getElementById('required-date'), {
      mode: 'range',
      dateFormat: 'Y-m-d',
      defaultDate,
      minDate: 'today',
      maxDate: new Date().fp_incr(100),
    });
  }
  render() {
    return (
      <div>
        <input type="text" id="required-date" placeholder="Select Required Dates" />
        <Button
          onClick={() => {
            this.props.onUpdate(document.getElementById('required-date').value);
          }}
          className={css.submitButton}
          type="submit"
          inProgress={this.props.submitInProgress}
          disabled={this.props.submitDisabled}
          ready={this.props.submitReady}
        >
          {this.props.saveActionMsg}
        </Button>
      </div>
    );
  }
}

export default Calendar;
