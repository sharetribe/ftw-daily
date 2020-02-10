import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, isValidNumber, validYouTubeURL, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput, FieldBoolean } from '../../components';
import CustomCategorySelectFieldMaybe from './CustomCategorySelectFieldMaybe';

import css from './EditListingDescriptionForm.css';

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
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        values
      } = formRenderProps;

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
      const surfMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.surf',
      });
      const surfPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.surfPlaceholder',
      });
      const vibeMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.vibe',
      });
      const vibePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.vibePlaceholder',
      });
      const communityMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.community',
      });
      const communityPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.communityPlaceholder',
      });
      const wifiMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.wifi',
      });
      const wifiPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.wifiPlaceholder',
      });
      const wifiValidMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.wifiInvalid',
      });
      const retreatMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.retreat',
      });
      const retreatCapacityMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.retreatCapacity',
      });
      const retreatCapacityPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.retreatCapacityPlaceholder',
      });
      const retreatCapacityValidMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.retreatCapacityInvalid',
      });
      const retreatDescriptionMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.retreatDescription',
      });
      const retreatDescriptionPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.retreatDescriptionPlaceholder',
      });
      const videoMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.video',
      });
      const videoPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.videoPlaceholder',
      });
      const videoValidMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.videoInvalid',
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

      const showRetreatForm = values.retreat && values.retreat.accepted

      const retreatShowFields = showRetreatForm ? (
        <>
          <FieldTextInput
            id="retreat.capacity"
            name="retreat.capacity"
            className={css.description}
            type="text"
            label={retreatCapacityMessage}
            placeholder={retreatCapacityPlaceholderMessage}
            validate={composeValidators(isValidNumber(retreatCapacityValidMessage))}
          />

          <FieldTextInput
            id="retreat.description"
            name="retreat.description"
            className={css.description}
            type="textarea"
            label={retreatDescriptionMessage}
            placeholder={retreatDescriptionPlaceholderMessage}
          />
        </>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
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
            id="category"
            name="category"
            categories={categories}
            intl={intl}
          />

          <h3 className={css.sectionTitle}>Description</h3>

          <FieldTextInput
            id="description"
            name="description"
            className={css.description}
            type="textarea"
            label={descriptionMessage}
            placeholder={descriptionPlaceholderMessage}
            validate={composeValidators(required(descriptionRequiredMessage))}
          />

          <FieldTextInput
            id="video"
            name="video"
            className={css.video}
            type="text"
            label={videoMessage}
            placeholder={videoPlaceholderMessage}
            validate={composeValidators(validYouTubeURL(videoValidMessage))}
          />

          <FieldTextInput
            id="surf"
            name="surf"
            className={css.surf}
            type="textarea"
            label={surfMessage}
            placeholder={surfPlaceholderMessage}
          />

          <FieldTextInput
            id="vibe"
            name="vibe"
            className={css.vibe}
            type="textarea"
            label={vibeMessage}
            placeholder={vibePlaceholderMessage}
          />

          <FieldTextInput
            id="community"
            name="community"
            className={css.community}
            type="textarea"
            label={communityMessage}
            placeholder={communityPlaceholderMessage}
          />

          <FieldTextInput
            id="wifi"
            name="wifi"
            className={css.wifi}
            type="text"
            label={wifiMessage}
            placeholder={wifiPlaceholderMessage}
            validate={composeValidators(isValidNumber(wifiValidMessage))}
          />

          <h3 className={css.sectionTitle}>Retreats</h3>

          <FieldBoolean
            id="retreat.accepted"
            name="retreat.accepted"
            className={css.retreat}
            label={retreatMessage}
            placeholder="Choose yes/no"
          />

          {retreatShowFields}

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

EditListingDescriptionFormComponent.defaultProps = { className: null, fetchErrors: null };

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
  categories: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(EditListingDescriptionFormComponent);
