import React from 'react';
import {  bool, func, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Form, Button, FieldTextInput } from '../../components';
import { required } from '../../util/validators';

import css from './EditListingCapacityForm.module.css';

const parseMax = (max, currentMin) => value => {
  const parsedValue = Number.parseInt(value, 10);
  if (isNaN(parsedValue)) {
    return '';
  }
  return parsedValue < currentMin ? currentMin : parsedValue > max ? max : parsedValue;
};

export const EditListingCapacityFormComponent = props => (
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
      } = fieldRenderProps;

      const errorMessage = updateError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingCapacityForm.updateFailed" />
        </p>
      ) : null;

      const capacityRequired = required(
        intl.formatMessage({
          id: 'EditListingCapacityForm.capacityRequired',
        })
      );

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}

          <FieldTextInput
            id="capacity"
            name="capacity"
            className={css.capacity}
            placeholder="4"
            type='number'
            min='1'
            // parse={parseMax(10000, 1)}
            validate={capacityRequired}
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
        </Form>
      );
    }}
  />
);

EditListingCapacityFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
};

EditListingCapacityFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired
};

export default compose(injectIntl)(EditListingCapacityFormComponent);
