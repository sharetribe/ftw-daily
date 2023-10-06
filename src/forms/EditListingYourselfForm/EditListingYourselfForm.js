import React from 'react';
import { compose } from 'redux';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import config from '../../config';
import { propTypes } from '../../util/types';
import { findOptionsForSelectFilter } from '../../util/search';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import { maxLength, required, composeValidator} from '../../util/validators';
import * as validators from '../../util/validators';

import {
  Form,
  Button,
  FieldTextInput,
  FieldRadioButton,
} from '../../components';

import css from './EditListingYourselfForm.module.css';

const TITLE_MAX_LENGTH = 200;
const TITLE_MAX50_LENGTH = 200;
const TITLE_MAX15_LENGTH = 15;
const EditListingYourselfFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
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

      // date of birthday
      const headlineMessage = intl.formatMessage({ id: 'EditListingYourselfForm.headline' });
      const headlinePlaceholderMessage = intl.formatMessage({
        id: 'EditListingYourselfForm.headlinePlaceholder',
      });

      const headlineRequiredMessage = intl.formatMessage({
        id: 'EditListingYourselfForm.headlineRequired',
      });

      const expMessage = intl.formatMessage({ id: 'EditListingYourselfForm.exp' });
      const expPlaceholderMessage = intl.formatMessage({
        id: 'EditListingYourselfForm.expPlaceholder',
      });
      const expRequiredMessage = intl.formatMessage({
        id: 'EditListingYourselfForm.expRequired',
      });
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX50_LENGTH,
        }
      );
      const maxLengthheadlineMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.max15Length' },
        {
          maxLength: TITLE_MAX15_LENGTH,
        }
      );
      const maxLength50Message = maxLength(maxLengthMessage, TITLE_MAX50_LENGTH);
      const maxLengthserviceMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.max2Length' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );
      const maxLength25Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
      const serviceMessage = intl.formatMessage({
        id: 'EditListingYourselfForm.service',
      });

      const maxLength15Message = maxLength(maxLengthheadlineMessage, TITLE_MAX15_LENGTH);
      const headlinelimitMessage = intl.formatMessage({
        id: 'EditListingYourselfForm.headlineRequired',
      });
      const servicePlaceholderMessage = intl.formatMessage({
        id: 'EditListingYourselfForm.servicePlaceholder',
      });
      const serviceRequiredMessage = intl.formatMessage({
        id: 'EditListingYourselfForm.serviceRequired',
      });
      const scheduleMessage = intl.formatMessage({
        id: 'EditListingYourselfForm.schedule',
      });
      const schedulePlaceholderMessage = intl.formatMessage({
        id: 'EditListingYourselfForm.schedulePlaceholder',
      });
      const yespetMessage = intl.formatMessage({
        id: 'EditListingYourselfForm.yespet',
      });
      const yespetPlaceholderMessage = intl.formatMessage({
        id: 'EditListingYourselfForm.yespetPlaceholder',
      });
      const scheduleRequiredMessage = intl.formatMessage({
        id: 'EditListingYourselfForm.scheduleRequired',
      });
      const yespetRequiredMessage = intl.formatMessage({
        id: 'EditListingYourselfForm.yespetRequired',
      });

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
      const submitDisabled = invalid || disabled || submitInProgress || !values.dohavepets  ;
      const dohavepets = findOptionsForSelectFilter('dohavepets', filterConfig);

      const emailRequiredMessage = intl.formatMessage({
        id: 'SignupForm.emailRequired',
      });
     
      const emailRequired = validators.required(emailRequiredMessage);
      const emailInvalidMessage = intl.formatMessage({
        id: 'SignupForm.emailInvalid',
      });
      const emailValid = validators.FiftyFormatValid(emailInvalidMessage);
     
      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          {/* <FieldTextInput
            id="exp"
            name="exp"
            className={css.title}
            type="text"
            label={expMessage}
            placeholder={expPlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(expRequiredMessage))}
            autoFocus
          /> */}

          <FieldTextInput
            id="headline"
            name="headline"
            className={css.title}
            type="textarea"
            label={headlineMessage}
            placeholder={headlinePlaceholderMessage}
             validate={validators.composeValidators(required(headlineRequiredMessage),maxLength15Message)}
          
            autoFocus
          />

          <FieldTextInput
            id="service"
            name="service"
            type="textarea"
            className={css.description}
            label={serviceMessage}
            placeholder={servicePlaceholderMessage}
            validate={validators.composeValidators(required(serviceRequiredMessage), maxLength25Message)}
           
          />

          <FieldTextInput
            id="schedule"
            name="schedule"
            type="textarea"
            className={css.description}
            label={scheduleMessage}
            placeholder={schedulePlaceholderMessage}
            validate={validators.composeValidators(required(scheduleRequiredMessage), maxLength25Message)}
          // validate={validators.composeValidators(emailRequired, emailValid)}
          />

          <div>
            <p>Do you have Pets?</p>
            <div style={{ display: 'flex', gap: '20px' }}>
              {dohavepets.map((num) =>
                <div className={css.cardSelectPet}>
                  <FieldRadioButton
                    className={css.features}
                    id={num.key}
                    name={"dohavepets"}
                    value={num.key}
                    label={num.label}
                  />
                </div>
              )}
            </div>
            {values && values.dohavepets == 'yes' ? (
            <div>
              <FieldTextInput
              id="yespet"
              name="yespet"
              type="textarea"
              className={css.description}
              label={yespetMessage}
              placeholder={yespetPlaceholderMessage}
              validate={validators.composeValidators(required(yespetRequiredMessage))}
              />
            </div>):null}

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

EditListingYourselfFormComponent.defaultProps = {
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingYourselfFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingYourselfFormComponent);
