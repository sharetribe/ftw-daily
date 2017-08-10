import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { maxLength, required } from '../../util/validators';
import { Button, TextInputField } from '../../components';

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

  const classes = classNames(css.root, className);
  return (
    <form className={classes} onSubmit={handleSubmit}>
      <TextInputField
        type="text"
        name="title"
        id={`${form}.title`}
        label={titleMessage}
        placeholder={titlePlaceholderMessage}
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

      <Button
        className={css.submitButton}
        type="submit"
        disabled={invalid || submitting || disabled}
      >
        {saveActionMsg}
      </Button>
    </form>
  );
};

EditListingDescriptionFormComponent.defaultProps = { className: null };

const { func, string } = PropTypes;

EditListingDescriptionFormComponent.propTypes = {
  ...formPropTypes,
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
};

const formName = 'EditListingDescriptionForm';

export default compose(reduxForm({ form: formName }), injectIntl)(
  EditListingDescriptionFormComponent
);
