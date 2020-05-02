import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import {
  autocompleteSearchRequired,
  autocompletePlaceSelected,
  composeValidators,
} from '../../util/validators';
import { ensureOwnListing } from '../../util/data';
import config from '../../config';
import {
  Form,
  LocationAutocompleteInputField,
  FieldCheckboxGroup,
  Button,
  FieldTextInput,
  FieldCurrencyInput,
} from '../../components';

import SectionMapMaybe from '../../containers/ListingPage/SectionMapMaybe';
import css from './EditListingLocationForm.css';

export const EditListingLocationFormComponent = props => (
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
        updateInProgress,
        fetchErrors,
        values,
        listing,
        user_type,
      } = fieldRenderProps;
      const user_name = user_type === 2 ? 'service' : user_type === 1 ? 'sitter' : 'owner';
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingLocationForm.address' + '.' + user_name,
      });
      const addressPlaceholderMessage = intl.formatMessage({
        id: 'EditListingLocationForm.addressPlaceholder',
      });
      const addressRequiredMessage = intl.formatMessage({
        id: 'EditListingLocationForm.addressRequired',
      });
      const addressNotRecognizedMessage = intl.formatMessage({
        id: 'EditListingLocationForm.addressNotRecognized',
      });

      const buildingMessage = intl.formatMessage({ id: 'EditListingLocationForm.building' });
      const buildingPlaceholderMessage = intl.formatMessage({
        id: 'EditListingLocationForm.buildingPlaceholder',
      });

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingLocationForm.updateFailed" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingLocationForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      const currentListing = ensureOwnListing(listing);
      const { geolocation, publicData } = currentListing.attributes;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}
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
            format={null}
            valueFromForm={values.location}
            validate={composeValidators(
              autocompleteSearchRequired(addressRequiredMessage),
              autocompletePlaceSelected(addressNotRecognizedMessage)
            )}
          />

          {/* <FieldTextInput
            className={css.building}
            type="text"
            name="building"
            id="building"
            label={buildingMessage}
            placeholder={buildingPlaceholderMessage}
          /> */}

          {!user_type ? (
            <FieldCurrencyInput
              id="price"
              name="price"
              currencyConfig={config.currencyConfig}
              className={css.hiden}
            />
          ) : null}
          <SectionMapMaybe
            geolocation={geolocation}
            publicData={publicData}
            listingId={currentListing.id}
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

EditListingLocationFormComponent.defaultProps = {
  selectedPlace: null,
  fetchErrors: null,
};

EditListingLocationFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  selectedPlace: propTypes.place,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingLocationFormComponent);
