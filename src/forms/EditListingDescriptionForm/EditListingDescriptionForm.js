import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';

import { maxLength, required, composeValidators,autocompleteSearchRequired,
  autocompletePlaceSelected, } from '../../util/validators';
import { Form, Button, FieldTextInput, FieldCheckboxGroup, FieldCheckbox, FieldBirthdayInput, LocationAutocompleteInputField, FieldPhoneNumberInput } from '../../components';
import CustomCategorySelectFieldMaybe from './CustomCategorySelectFieldMaybe';

import css from './EditListingDescriptionForm.module.css';
import { findOptionsForSelectFilter } from '../../util/search';
import config from '../../config';

const TITLE_MAX_LENGTH = 60;

const EditListingDescriptionFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        categories,
        className,
        disabled,
        ready,
        name,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        filterConfig,
        updated,
        updateInProgress,
        fetchErrors,
        values,
      } = formRenderProps;
      //console.log('values', values)

      const identity = v => v;

      // date of birthday
      const birthdateMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.birthdate' });
      const birthdatePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.birthdatePlaceholder',
      });
      const birthdateRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.birthdateRequired',
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
      
      const titleMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.title' });
      const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titlePlaceholder',
      });
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titleRequired',
      });
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );
      const phoneMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.phone',
      });
      const phonePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.phonePlaceholder',
      });

      const descriptionMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.description',
      });
      const descriptionPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionPlaceholder',
      });
      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
      const descriptionRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionRequired',
      });

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      const options = findOptionsForSelectFilter('serviceSetup', filterConfig);
      //console.log('options', options)
      

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <FieldTextInput
            id="title"
            name="title"
            className={css.title}
            type="text"
            label={titleMessage}
            placeholder={titlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus
          />
                 

                 <FieldBirthdayInput
            id="birthday"
            name="birthday"
            className={css.title}
            type="text"
            label={birthdateMessage}
            placeholder={birthdatePlaceholderMessage}
            validate={composeValidators(required(birthdateRequiredMessage ),)}
            
            autoFocus
          />

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

             
          <FieldTextInput
            id="email"
            name="email"
            className={css.description}
            type="email"
            label={descriptionMessage}
            placeholder={descriptionPlaceholderMessage}
           // validate={composeValidators(required(descriptionRequiredMessage))}
          />

          <FieldPhoneNumberInput
          id="phone"
          name="phone"
          className={css.description}
          
          label={phoneMessage}
          placeholder={phonePlaceholderMessage}
        
          />

          {/* <CustomCategorySelectFieldMaybe
            id="category"
            name="category"
            categories={categories}
            intl={intl}
          /> */}

          <p> Service Setup</p>
          <p>Choose what service you wish to offers...</p>
          {
            options.map((st)=>{
              return(
               <FieldCheckbox className={css.features} id={st.key} name={"serviceSetup"} value={st.key} label={st.label}/>
              )
            })
          }

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

EditListingDescriptionFormComponent.defaultProps = { className: null, fetchErrors: null, filterConfig: config.custom.filters,};

EditListingDescriptionFormComponent.propTypes = {
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
  filterConfig: propTypes.filterConfig,
  categories: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(EditListingDescriptionFormComponent);
