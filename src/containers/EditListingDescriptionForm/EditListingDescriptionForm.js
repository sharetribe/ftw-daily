import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required } from '../../util/validators';
import { FieldCustomAttributeSelect, Form, Button, TextInputField } from '../../components';

import css from './EditListingDescriptionForm.css';

const TITLE_MAX_LENGTH = 60;

const EditListingDescriptionFormComponent = props => {
  const {
    className,
    disabled,
    handleSubmit,
    intl,
    form,
    invalid,
    saveActionMsg,
    submitting,
    updated,
    updateError,
    updateInProgress,
  } = props;

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

  const descriptionMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.description' });
  const descriptionPlaceholderMessage = intl.formatMessage({
    id: 'EditListingDescriptionForm.descriptionPlaceholder',
  });
  const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
  const descriptionRequiredMessage = intl.formatMessage({
    id: 'EditListingDescriptionForm.descriptionRequired',
  });

  const errorMessage = updateError ? (
    <p className={css.error}>
      <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
    </p>
  ) : null;

  const classes = classNames(css.root, className);
  const submitReady = updated;
  const submitInProgress = submitting || updateInProgress;
  const submitDisabled = invalid || disabled || submitInProgress;

  return (
    <Form className={classes} onSubmit={handleSubmit}>
      {errorMessage}
      <TextInputField
        className={css.title}
        type="text"
        name="title"
        id={`${form}.title`}
        label={titleMessage}
        placeholder={titlePlaceholderMessage}
        maxLength={TITLE_MAX_LENGTH}
        validate={[required(titleRequiredMessage), maxLength60Message]}
        autoFocus
      />

      <TextInputField
        className={css.description}
        type="textarea"
        name="description"
        id={`${form}.description`}
        label={descriptionMessage}
        placeholder={descriptionPlaceholderMessage}
        validate={[required(descriptionRequiredMessage)]}
      />

      <FieldCustomAttributeSelect
        className={css.category}
        id={`${form}.category`}
        customAttribute="category"
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
};

EditListingDescriptionFormComponent.defaultProps = { className: null, updateError: null };

const { bool, func, string } = PropTypes;

EditListingDescriptionFormComponent.propTypes = {
  ...formPropTypes,
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
};

const formName = 'EditListingDescriptionForm';

export default compose(reduxForm({ form: formName }), injectIntl)(
  EditListingDescriptionFormComponent
);
