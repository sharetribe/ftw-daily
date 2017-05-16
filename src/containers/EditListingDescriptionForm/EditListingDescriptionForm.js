import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { enhancedField } from '../../util/forms';
import { maxLength, required } from '../../util/validators';
import { Button } from '../../components';

import css from './EditListingDescriptionForm.css';

const TITLE_MAX_LENGTH = 60;

export class EditListingDescriptionFormComponent extends Component {
  constructor(props) {
    super(props);

    // We must create the enhanced components outside the render function
    // to avoid losing focus.
    // See: https://github.com/erikras/redux-form/releases/tag/v6.0.0-alpha.14
    this.EnhancedInput = enhancedField('input');
    this.EnhancedTextArea = enhancedField('textarea', { rootClassName: css.description });
  }

  render() {
    const {
      className,
      disabled,
      handleSubmit,
      intl,
      invalid,
      saveActionMsg,
      submitting,
    } = this.props;

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
        <Field
          autoFocus
          name="title"
          label={titleMessage}
          placeholder={titlePlaceholderMessage}
          component={this.EnhancedInput}
          type="text"
          validate={[required(titleRequiredMessage), maxLength60Message]}
        />

        <Field
          name="description"
          label={descriptionMessage}
          placeholder={descriptionPlaceholderMessage}
          className={css.descriptionField}
          component={this.EnhancedTextArea}
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
  }
}

EditListingDescriptionFormComponent.defaultProps = {
  className: null,
  saveActionMsg: 'Next: location',
};

const { func, string } = PropTypes;

EditListingDescriptionFormComponent.propTypes = {
  ...formPropTypes,
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string,
};

const formName = 'EditListingDescriptionForm';

export default compose(reduxForm({ form: formName }), injectIntl)(
  EditListingDescriptionFormComponent
);
