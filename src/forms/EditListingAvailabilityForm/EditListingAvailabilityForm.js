import React, { Component } from 'react';
import { bool, func, object, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { createDefaultPlan } from '../../util/data';
import arrayMutators from 'final-form-arrays';
import { Form, Button, FieldRangeSlider, FieldCheckboxGroup } from '../../components';
import {
  DAYS_OF_WEEK
} from '../../util/types';
import ManageAvailabilityCalendar from './ManageAvailabilityCalendar';
import css from './EditListingAvailabilityForm.module.css';

export class EditListingAvailabilityFormComponent extends Component {
  render() {
    const { seats, daysAvailabilityDisabled, ...rest } = this.props;

    return (
      <FinalForm
        {...rest}
        mutators={{ ...arrayMutators }}
        render={formRenderProps => {
          const {
            className,
            rootClassName,
            disabled,
            ready,
            handleSubmit,
            intl,
            invalid,
            pristine,
            saveActionMsg,
            updated,
            updateError,
            updateInProgress,
            availability,
            availabilityPlan,
            listingId,
            values
          } = formRenderProps;

          const errorMessage = updateError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingAvailabilityForm.updateFailed" />
            </p>
          ) : null;

          const classes = classNames(rootClassName || css.root, className);
          const submitReady = (updated && pristine) || ready;
          const submitInProgress = updateInProgress;
          const submitDisabled = invalid || disabled || submitInProgress;

          const minLength = Array.isArray(values.minimumLength) ? values.minimumLength[0] : 1;
          const minLengthString = minLength > 1 ? `${minLength} days` : '1 day';

          const daysOptions = DAYS_OF_WEEK.map(key => ({key, label: key.slice(0, 1).toUpperCase() + key.slice(1)}))

          const {entries, ...rest} = createDefaultPlan(seats, true);

          const currentAvailabilityPlan = {
            ...rest,
            ...(values && values.daysAvailability ? {
              entries: entries.filter(({dayOfWeek}) => values.daysAvailability.includes(dayOfWeek))
              } : {}
            )
          };

          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {errorMessage}

              <div className={css.weekdaysWrapper}>
                {!daysAvailabilityDisabled ? (
                    <FieldCheckboxGroup
                      label={'Daily availability'}
                      id="daysAvailability"
                      name="daysAvailability"
                      className={css.daysSelectorRoot}
                      options={daysOptions}
                      disabled={daysAvailabilityDisabled}
                    />
                  ) : (
                    <p className={css.weekdaysHint}>
                      <FormattedMessage id="EditListingAvailabilityForm.weekdaysHint"/>
                    </p>
                  )
                }
              </div>


              <div className={css.calendarWrapper}>
                <ManageAvailabilityCalendar
                  availability={availability}
                  defaultAvailabilityPlan={availabilityPlan}
                  availabilityPlan={currentAvailabilityPlan}
                  listingId={listingId}
                  seats={seats}
                />
              </div>

              {/* <FieldRangeSlider
                id="minimumLength"
                name="minimumLength"
                label={`Minimum booking length: ${minLengthString}`}
                min={1}
                max={100}
                step={1}
                handles={[1]}
              /> */}

              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={submitReady}
              >
                {saveActionMsg}
              </Button>
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
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
  availability: object.isRequired,
  availabilityPlan: propTypes.availabilityPlan.isRequired,
};

export default compose(injectIntl)(EditListingAvailabilityFormComponent);
