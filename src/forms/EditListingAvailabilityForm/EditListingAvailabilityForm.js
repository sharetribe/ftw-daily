import React, { Component } from 'react';
import { bool, func, object, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Form, Button } from '../../components';

import Calendar from '../../components/Calendar/Calendar.js';

import ManageAvailabilityCalendar from './ManageAvailabilityCalendar';
import css from './EditListingAvailabilityForm.css';

export class EditListingAvailabilityFormComponent extends Component {
  render() {
    return (
      <FinalForm
        {...this.props}
        render={fieldRenderProps => {
          const {
            className,
            rootClassName,
            disabled,
            handleSubmit,
            //intl,
            invalid,
            pristine,
            saveActionMsg,
            updated,
            updateError,
            updateInProgress,
            availability,
            availabilityPlan,
            listingId,
            user_name,
          } = fieldRenderProps;

          const errorMessage = updateError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingAvailabilityForm.updateFailed" />
            </p>
          ) : null;

          const classes = classNames(rootClassName || css.root, className);
          const submitReady = updated && pristine;
          const submitInProgress = updateInProgress;
          const submitDisabled = invalid || disabled || submitInProgress;

          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {errorMessage}
              <div className={css.calendarWrapper}>
                {user_name == 'owner' ? (
                  <Calendar
                    onUpdate={value => {
                      this.props.setRequiredDates(value);
                    }}
                    publicData={this.props.publicData}
                    submitInProgress={submitInProgress}
                    submitDisabled={submitDisabled}
                    submitReady={submitReady}
                    saveActionMsg={saveActionMsg}
                  />
                ) : (
                  <div>
                    <ManageAvailabilityCalendar
                      availability={availability}
                      availabilityPlan={availabilityPlan}
                      listingId={listingId}
                      user_name={user_name}
                    />
                    <Button
                      className={css.submitButton}
                      type="submit"
                      inProgress={submitInProgress}
                      disabled={submitDisabled}
                      ready={submitReady}
                    >
                      {saveActionMsg}
                    </Button>
                  </div>
                )}
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

EditListingAvailabilityFormComponent.defaultProps = {
  updateError: null,
};

EditListingAvailabilityFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
  availability: object.isRequired,
};

export default compose(injectIntl)(EditListingAvailabilityFormComponent);