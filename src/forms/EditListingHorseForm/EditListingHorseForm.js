import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput } from '../../components';
import CustomCategorySelectFieldMaybe from './CustomHorseSelectFieldMaybe';

import css from './EditListingHorseForm.css';

const TITLE_MAX_LENGTH = 60;

const EditListingHorseFormComponent = props => (
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
        genders,
        ages,
        breeds,
        hights,
        colors,
      } = fieldRenderProps;

      const titleMessage = intl.formatMessage({ id: 'EditListingHorseForm.title' });
      const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingHorseForm.titlePlaceholder',
      });
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingHorseForm.titleRequired',
      });

      const genderMessage = intl.formatMessage({ id: 'EditListingHorseForm.gender' });
      const genderPlaceholderMessage = intl.formatMessage({
        id: 'EditListingHorseForm.genderPlaceholder',
      });
      const genderRequiredMessage = intl.formatMessage({
        id: 'EditListingHorseForm.genderRequired',
      });

      const ageMessage = intl.formatMessage({ id: 'EditListingHorseForm.age' });
      const agePlaceholderMessage = intl.formatMessage({
        id: 'EditListingHorseForm.agePlaceholder',
      });
      const ageRequiredMessage = intl.formatMessage({
        id: 'EditListingHorseForm.ageRequired',
      });

      const breedMessage = intl.formatMessage({ id: 'EditListingHorseForm.breed' });
      const breedPlaceholderMessage = intl.formatMessage({
        id: 'EditListingHorseForm.breedPlaceholder',
      });
      const breedRequiredMessage = intl.formatMessage({
        id: 'EditListingHorseForm.breedRequired',
      });

      const hightMessage = intl.formatMessage({ id: 'EditListingHorseForm.hight' });
      const hightPlaceholderMessage = intl.formatMessage({
        id: 'EditListingHorseForm.hightPlaceholder',
      });
      const hightRequiredMessage = intl.formatMessage({
        id: 'EditListingHorseForm.hightRequired',
      });

      const colorMessage = intl.formatMessage({ id: 'EditListingHorseForm.color' });
      const colorPlaceholderMessage = intl.formatMessage({
        id: 'EditListingHorseForm.colorPlaceholder',
      });
      const colorRequiredMessage = intl.formatMessage({
        id: 'EditListingHorseForm.colorRequired',
      });

      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingHorseForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingHorseForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingHorseForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingHorseForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

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
          <CustomCategorySelectFieldMaybe
            id="gender"
            name="gender"
            values={genders}
            selectLabel={genderMessage}
            selectPlaceholder={genderPlaceholderMessage}
            selectRequired={genderRequiredMessage}
          />
          <CustomCategorySelectFieldMaybe
            id="age"
            name="age"
            values={ages}
            selectLabel={ageMessage}
            selectPlaceholder={agePlaceholderMessage}
            selectRequired={ageRequiredMessage}
          />
          <CustomCategorySelectFieldMaybe
            id="breed"
            name="breed"
            values={breeds}
            selectLabel={breedMessage}
            selectPlaceholder={breedPlaceholderMessage}
            selectRequired={breedRequiredMessage}
          />
          <CustomCategorySelectFieldMaybe
            id="hight"
            name="hight"
            values={hights}
            selectLabel={hightMessage}
            selectPlaceholder={hightPlaceholderMessage}
            selectRequired={hightRequiredMessage}
          />
          <CustomCategorySelectFieldMaybe
            id="color"
            name="color"
            values={colors}
            selectLabel={colorMessage}
            selectPlaceholder={colorPlaceholderMessage}
            selectRequired={colorRequiredMessage}
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

EditListingHorseFormComponent.defaultProps = { className: null, fetchErrors: null };

EditListingHorseFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  genders: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
  ages: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
  breeds: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
  hights: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
  colors: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(EditListingHorseFormComponent);
