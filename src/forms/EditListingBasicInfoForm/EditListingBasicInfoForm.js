import React from 'react';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import config from '../../config';
import { propTypes } from '../../util/types';
import { findOptionsForSelectFilter } from '../../util/search';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import * as validators from '../../util/validators';
import {
  maxLength,
  required,
  composeValidators,
} from '../../util/validators';
import {
  Form,
  Button,
  FieldCheckbox,
  FieldTextInput,
  FieldPhoneNumberInput,
  FieldBirthdayInput,
  LocationAutocompleteInputField,
  FieldRadioButton
} from '../../components';

import css from './EditListingBasicForm.module.css';

const TITLE_MAX_LENGTH = 60;

const EditListingBasicInfoFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        ready,
        disabled,
        className,
        handleSubmit,
        intl,
        values,
        invalid,
        updated,
        pristine,
        fetchErrors,
        filterConfig,
        saveActionMsg,
        updateInProgress,
      } = formRenderProps;

      const identity = v => v;

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

      const locMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.location' });
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

      const phoneRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.phoneRequired',
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
      const submitDisabled = invalid || disabled || submitInProgress || !values.email || !values.phone || !values.serviceSetup;
      const options = findOptionsForSelectFilter('serviceSetup', filterConfig);


      const MIN_STRIPE_ACCOUNT_AGE = 18;
      const birthdayLabel = intl.formatMessage({ id: 'PayoutDetailsForm.birthdayLabel' });
      const birthdayLabelMonth = intl.formatMessage({
        id: 'PayoutDetailsForm.birthdayLabelMonth',
      });
      const birthdayLabelYear = intl.formatMessage({ id: 'PayoutDetailsForm.birthdayLabelYear' });
      const birthdayRequired = validators.required(
        intl.formatMessage({
          id: 'PayoutDetailsForm.birthdayRequired',
        })
      );
      const birthdayMinAge = validators.ageAtLeast(
        intl.formatMessage(
          {
            id: 'PayoutDetailsForm.birthdayMinAge',
          },
          {
            minAge: MIN_STRIPE_ACCOUNT_AGE,
          }
        ),
        MIN_STRIPE_ACCOUNT_AGE
      );

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
          />

          <label className={css.title}>{birthdateMessage}</label>

          <div className={css.formRow}>
            <FieldBirthdayInput
              id="birthday"
              name="birthday"
              className={css.title}
              label={birthdayLabel}
              labelForMonth={birthdayLabelMonth}
              labelForYear={birthdayLabelYear}
              format={identity}
              valueFromForm={values.birthday && values.birthday.day
                ? new Date(`${values.birthday.year}-${values.birthday.month}-${values.birthday.day}`)
                : new Date(values.birthday)}
              validate={validators.composeValidators(birthdayRequired, birthdayMinAge)}
            />
          </div>

          <div style={{ marginTop: '25px' }}>
            <LocationAutocompleteInputField
              className={css.loc}
              inputClassName={css.locationAutocompleteInput}
              iconClassName={css.locationAutocompleteInputIcon}
              predictionsClassName={css.predictionsRoot}
              validClassName={css.validLocation}
              name="location"
              label={locMessage}
              placeholder={addressPlaceholderMessage}
              useDefaultPredictions={false}
              format={identity}
              valueFromForm={values.location}
            // validate={composeValidators(
            //   //autocompleteSearchRequired(addressRequiredMessage),
            //   //autocompletePlaceSelected(addressNotRecognizedMessage)
            // )}
            />
          </div>

          {/* <div style={{ marginTop: '25px' }}>
            <FieldTextInput
            id="location"
            name="location"
            className={css.title}
            type="text"
            label={locMessage}
            placeholder={addressPlaceholderMessage}
            
            validate={composeValidators(required(addressRequiredMessage))}
          />
          </div> */}

          <FieldTextInput
            id="email"
            name="email"
            className={css.description}
            type="email"
            label={descriptionMessage}
            placeholder={descriptionPlaceholderMessage}
            validate={composeValidators(required(descriptionRequiredMessage))}
            disabled={true}
          />

          <FieldPhoneNumberInput
            id="phone"
            name="phone"
            className={css.description}
            label={phoneMessage}
            placeholder={phonePlaceholderMessage}
            validate={composeValidators(required(phoneRequiredMessage))}
          />
          <div className={css.serviceLabel}>
            <FormattedMessage className={css.description} id="EditListingDescriptionForm.categoryLabel" />
          </div>
          <div className={css.serviceLabel}>
            <FormattedMessage className={css.description} id="EditListingDescriptionForm.categorytext" />
          </div>

          <div className={css.servicesSetup}>
            {options.map((st) => {
              return (
                <div className={css.cardSelectPet} key={st.key}>
                  <FieldCheckbox
                    className={css.features}
                    id={st.key}
                    name={"serviceSetup"}
                    value={st.key}
                    label={st.label}
                    validate={composeValidators(required(phoneRequiredMessage))}
                  />
                </div>
              )
            })
            }
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

EditListingBasicInfoFormComponent.defaultProps = { className: null, fetchErrors: null, filterConfig: config.custom.filters, };

EditListingBasicInfoFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingBasicInfoFormComponent);
