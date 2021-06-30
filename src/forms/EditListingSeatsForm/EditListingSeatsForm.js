import React from 'react';
import {  bool, func, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Form, Button, FieldTextInput } from '../../components';
import { required } from '../../util/validators';

import css from './EditListingSeatsForm.module.css';

export const EditListingSeatsFormComponent = props => (
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
          <FormattedMessage id="EditListingSeatsForm.updateFailed" />
        </p>
      ) : null;

      const quantityRequired = required(
        intl.formatMessage({
          id: 'EditListingSeatsForm.quantityRequired',
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
            id="seats"
            name="seats"
            className={css.quantity}
            placeholder="1"
            type='number'
            min='1'
            validate={quantityRequired}
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

EditListingSeatsFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
};

EditListingSeatsFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired
};

export default compose(injectIntl)(EditListingSeatsFormComponent);
