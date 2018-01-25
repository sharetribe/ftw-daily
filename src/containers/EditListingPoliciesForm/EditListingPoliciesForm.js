import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Form, Button, TextInputField } from '../../components';

import css from './EditListingPoliciesForm.css';

export class EditListingPoliciesFormComponent extends Component {
  constructor(props) {
    super(props);

    // Initialize form inside this component reduces the amount of files that are tied to
    // marketplace specific content in publicData.
    const { initialize, publicData } = props;
    const { rules = '' } = publicData;
    initialize({ rules });
  }

  render() {
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
    } = this.props;

    const rulesLabelMessage = intl.formatMessage({ id: 'EditListingPoliciesForm.rulesLabel' });
    const rulesPlaceholderMessage = intl.formatMessage({
      id: 'EditListingPoliciesForm.rulesPlaceholder',
    });

    const errorMessage = updateError ? (
      <p className={css.error}>
        <FormattedMessage id="EditListingPoliciesForm.updateFailed" />
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
          className={css.policy}
          type="textarea"
          name="rules"
          id={`${form}.rules`}
          label={rulesLabelMessage}
          placeholder={rulesPlaceholderMessage}
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
  }
}

EditListingPoliciesFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
};

const { func, string, bool } = PropTypes;

EditListingPoliciesFormComponent.propTypes = {
  ...formPropTypes,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  selectedPlace: propTypes.place,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
};

const formName = 'EditListingPoliciesForm';

export default compose(reduxForm({ form: formName }), injectIntl)(EditListingPoliciesFormComponent);
