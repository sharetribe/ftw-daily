import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import {
  autocompletePlaceSelected,
  autocompleteSearchRequired,
  composeValidators,
  requiredFieldArrayCheckbox,
} from '../../util/validators';
import { Form, Button, FieldCheckboxGroup, LocationAutocompleteInputField } from '../../components';
import config from '../../config';
import arrayMutators from 'final-form-arrays';

import css from './EditProgramListingLocationForm.module.css';
import { findOptionsForSelectFilter } from '../../util/search';

const identity = v => v;

const EditProgramListingLocationForm = props => (
  <FinalForm
    mutators={{ ...arrayMutators }}
    {...props}
    render={formRenderProps => {
      const {
        values,
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        filterConfig,
      } = formRenderProps;

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditProgramListingLocationForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditProgramListingLocationForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditProgramListingLocationForm.showListingFailed" />
        </p>
      ) : null;

      const titleRequiredMessage = intl.formatMessage({
        id: 'EditProgramListingLocationForm.address',
      });
      const addressPlaceholderMessage = intl.formatMessage({
        id: 'EditProgramListingLocationForm.addressPlaceholder',
      });
      const addressRequiredMessage = intl.formatMessage({
        id: 'EditProgramListingLocationForm.addressRequired',
      });
      const addressNotRecognizedMessage = intl.formatMessage({
        id: 'EditProgramListingLocationForm.addressNotRecognized',
      });

      const locationTypeRequiredMessage = intl.formatMessage({
        id: 'EditProgramListingLocationForm.locationTypeRequired',
      });

      const typeLocationLabel = intl.formatMessage({
        id: 'EditProgramListingLocationForm.typeLocationLabel',
      });

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      const locationTypeKey = 'typeLocation';
      const onSiteSelection = 'on-site';
      const options = findOptionsForSelectFilter(locationTypeKey, filterConfig);
      const showAddressInput = values[locationTypeKey].includes(onSiteSelection);

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}

          <FieldCheckboxGroup
            label={typeLocationLabel}
            className={css.features}
            id={locationTypeKey}
            name={locationTypeKey}
            options={options}
            validate={requiredFieldArrayCheckbox(locationTypeRequiredMessage)}
          />

          {showAddressInput && (
            <LocationAutocompleteInputField
              className={css.locationAddress}
              inputClassName={css.locationAutocompleteInput}
              iconClassName={css.locationAutocompleteInputIcon}
              predictionsClassName={css.predictionsRoot}
              validClassName={css.validLocation}
              autoFocus
              name="location"
              label={titleRequiredMessage}
              placeholder={addressPlaceholderMessage}
              useDefaultPredictions={false}
              format={identity}
              valueFromForm={values.location}
              validate={composeValidators(
                autocompleteSearchRequired(addressRequiredMessage),
                autocompletePlaceSelected(addressNotRecognizedMessage)
              )}
            />
          )}

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

EditProgramListingLocationForm.defaultProps = {
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditProgramListingLocationForm.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  categories: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(EditProgramListingLocationForm);
