import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { propTypes } from '../../util/types';
import config from '../../config';
import { 
  Form,
  Button, 
  FieldCheckbox,
  FieldRadioButton,
} from '../../components';

import css from './EditListingPetPrefrenceForm.module.css';

const EditListingPetPrefrenceFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{ ...arrayMutators }}
    render={formRenderProps => {
      const {
        disabled,
        ready,
        rootClassName,
        className,
        name,
        handleSubmit,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        filterConfig,
        values,
      } = formRenderProps;
      //console.log('values', values)
      const classes = classNames(rootClassName || css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled =
        disabled ||
        submitInProgress ||
        !(values.typeOfpets && values.typeOfpets.length) ||
        !values.numberOfPets;

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingFeaturesForm.updateFailed" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingFeaturesForm.showListingFailed" />
        </p>
      ) : null;

      const typeOfpets = findOptionsForSelectFilter('typeOfpets', filterConfig);

      const numberOfPets = findOptionsForSelectFilter('numberOfPets', filterConfig);

      const sizeOfdogs = findOptionsForSelectFilter('sizeOfdogs', filterConfig);

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}

          <p>Types of Pets</p>
          {typeOfpets.map(st => (
            <FieldCheckbox
              className={css.features}
              id={st.key}
              key={st.key}
              name={'typeOfpets'}
              value={st.key}
              label={st.label}
            />
          ))}
          <p>Number of Pets</p>

          {numberOfPets.map(num => (
            <FieldRadioButton
              className={css.features}
              id={num.key}
              key={num.key}
              name={'numberOfPets'}
              value={num.key}
              label={num.label}
            />
          ))}

          {(values.typeOfpets && values.typeOfpets.filter(st => st == 'dog').length) ||
          (values.typeOfpets &&
            values.typeOfpets.filter(st => st == 'dog' && st == 'cat').length) ? (
            <div>
              <p>Size of Dogs</p>
              {sizeOfdogs.map(num => (
                <FieldCheckbox
                  className={css.features}
                  id={num.key}
                  name={'sizeOfdogs'}
                  value={num.key}
                  label={num.label}
                />
              ))}
            </div>
          ) : null}

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

EditListingPetPrefrenceFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingPetPrefrenceFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  name: string.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  filterConfig: propTypes.filterConfig,
};

const EditListingPetPrefrenceForm = EditListingPetPrefrenceFormComponent;

export default EditListingPetPrefrenceForm;
