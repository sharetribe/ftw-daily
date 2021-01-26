import React from 'react';
import { bool, func, shape, string, arrayOf } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { required } from '../../util/validators';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Button, FieldCheckboxGroup, Form, FieldSelect } from '../../components';

import css from './EditListingDisciplineForm.css';

const EditListingDisciplineFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{ ...arrayMutators }}
    render={fieldRenderProps => {
      const {
        className,
        disciplines,
        disabled,
        handleSubmit,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        intl,
      } = fieldRenderProps;

      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = disabled || submitInProgress;

      const disciplineLabel = intl.formatMessage({
        id: 'EditListingDisciplineForm.mainDisciplineLabel',
      });
      const disciplinePlaceholder = intl.formatMessage({
        id: 'EditListingDisciplineForm.mainDisciplinePlaceholder',
      });
      const disciplineRequired = required(
        intl.formatMessage({
          id: 'EditListingDisciplineForm.mainDisciplineRequired',
        })
      );

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDisciplineForm.updateFailed" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDisciplineForm.showListingFailed" />
        </p>
      ) : null;
      const classes = classNames(css.root, className);
      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}

          <FieldSelect
            className={css.selectField}
            name="mainDiscipline"
            id="mainDiscipline"
            label={disciplineLabel}
            validate={disciplineRequired}
          >
            <option disabled value="">
              {disciplinePlaceholder}
            </option>
            {disciplines.map(c => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </FieldSelect>

          <FieldCheckboxGroup
            className={css.checkboxGroup}
            id="additionalDisciplines"
            name="additionalDisciplines"
            options={disciplines}
            columns={3}
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

EditListingDisciplineFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
};

EditListingDisciplineFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  disciplines: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

const EditListingDisciplineForm = EditListingDisciplineFormComponent;

export default compose(injectIntl)(EditListingDisciplineForm);
