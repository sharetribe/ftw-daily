import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, FieldGroupCheckbox, Form } from '../../components';

import css from './EditListingFeaturesForm.css';

const EditListingFeaturesFormComponent = props => {
  const {
    form,
    submitting,
    disabled,
    rootClassName,
    className,
    handleSubmit,
    saveActionMsg,
    updated,
    updateError,
    updateInProgress,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const submitReady = updated;
  const submitInProgress = submitting || updateInProgress;
  const submitDisabled = disabled || submitInProgress;

  const errorMessage = updateError ? (
    <p className={css.error}>
      <FormattedMessage id="EditListingFeaturesForm.updateFailed" />
    </p>
  ) : null;

  return (
    <Form className={classes} onSubmit={handleSubmit}>
      {errorMessage}

      <FieldGroupCheckbox
        className={css.features}
        id={`${form}.amenities`}
        options={config.custom.amenities}
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

EditListingFeaturesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  updateError: null,
};

const { bool, func, string } = PropTypes;

EditListingFeaturesFormComponent.propTypes = {
  ...formPropTypes,
  rootClassName: string,
  className: string,
  handleSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
};

const defaultFormName = 'EditListingFeaturesForm';

export default reduxForm({ form: defaultFormName })(EditListingFeaturesFormComponent);
