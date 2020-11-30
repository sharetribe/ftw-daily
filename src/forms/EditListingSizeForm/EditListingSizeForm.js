import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import {
  intlShape,
  injectIntl,
  FormattedMessage,
} from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { required } from '../../util/validators';
import { Form, Button, FieldSelect } from '../../components';

// Create this file using EditListingFeaturesForm.module.css
// as a template.
import css from './EditListingSizeForm.module.css';

export const EditListingSizeFormComponent = props => (
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
        sizeOptions,
      } = fieldRenderProps;

      const sizePlaceholder = intl.formatMessage({
        id: 'EditListingSizeForm.sizePlaceholder',
      });

      const errorMessage = updateError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingSizeForm.updateFailed" />
        </p>
      ) : null;

      const sizeRequired = required(
        intl.formatMessage({
          id: 'EditListingSizeForm.sizeRequired',
        })
      );

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}

          <FieldSelect
            className={css.size}
            name="size"
            id="size"
            validate={sizeRequired}
          >
            <option value="">{sizePlaceholder}</option>
            {sizeOptions.map(c => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </FieldSelect>

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

EditListingSizeFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
};

EditListingSizeFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
  sizeOptions: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
};

export default compose(injectIntl)(EditListingSizeFormComponent);