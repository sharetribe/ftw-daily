import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Form, Button, FieldSelect } from '../../components';
import { required } from '../../util/validators';

import css from './EditListingTimeForm.css';

export const EditListingTimeFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        className,
        disabled,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateError,
        updateInProgress,
        morningStartHour,
        morningEndHour,
        afternoonStartHour,
        afternoonEndHour,
      } = fieldRenderProps;

      const errorMessage = updateError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingCapacityForm.updateFailed" />
        </p>
      ) : null;

      const capacityRequired = required(
        intl.formatMessage({
          id: 'EditListingTimePanel.fieldRequired',
        })
      );

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      const morningStartHourLabel = intl.formatMessage({ id: 'EditListingTimePanel.morningStartHour' });
      const morningEndHourLabel = intl.formatMessage({ id: 'EditListingTimePanel.morningEndHour' });
      const afternoonStartHourLabel = intl.formatMessage({ id: 'EditListingTimePanel.afternoonStartHour' });
      const afternoonEndHourLabel = intl.formatMessage({ id: 'EditListingTimePanel.afternoonEndHour' });

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}

          <div className={css.fieldsRow}>
            <FieldSelect
              className={css.field}
              label={morningStartHourLabel}
              name="morningStartHour"
              id="morningStartHour"
              validate={capacityRequired}
            >
              <option value="">{'-'}</option>
              {morningStartHour.map(c => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </FieldSelect>

            <FieldSelect
              className={css.field}
              label={morningEndHourLabel}
              name="morningEndHour"
              id="morningEndHour"
              validate={capacityRequired}
            >
              <option value="">{'-'}</option>
              {morningEndHour.map(c => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </FieldSelect>
          </div>

          <div className={css.fieldsRow}>
            <FieldSelect
              className={css.field}
              label={afternoonStartHourLabel}
              name="afternoonStartHour"
              id="afternoonStartHour"
              validate={capacityRequired}
            >
              <option value="">{'-'}</option>
              {morningStartHour.map(c => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </FieldSelect>

            <FieldSelect
              className={css.field}
              label={afternoonEndHourLabel}
              name="afternoonEndHour"
              id="afternoonEndHour"
              validate={capacityRequired}
            >
              <option value="">{'-'}</option>
              {morningEndHour.map(c => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </FieldSelect>
          </div>

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

EditListingTimeFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null
};

EditListingTimeFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
  morningStartHour: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
  morningEndtHour: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
  afternoonStartHour: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
  afternoonEndHour: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
};

export default compose(injectIntl)(EditListingTimeFormComponent);
