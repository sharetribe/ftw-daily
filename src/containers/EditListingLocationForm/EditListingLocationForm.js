import React, { PropTypes } from 'react'; // eslint-disable-line react/no-deprecated
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { autocompleteSearchRequired, autocompletePlaceSelected } from '../../util/validators';
import { Form, LocationAutocompleteInputField, Button, TextInputField } from '../../components';

import css from './EditListingLocationForm.css';

export const EditListingLocationFormComponent = props => {
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

  const titleRequiredMessage = intl.formatMessage({ id: 'EditListingLocationForm.address' });
  const addressPlaceholderMessage = intl.formatMessage({
    id: 'EditListingLocationForm.addressPlaceholder',
  });
  const addressRequiredMessage = intl.formatMessage({
    id: 'EditListingLocationForm.addressRequired',
  });
  const addressNotRecognizedMessage = intl.formatMessage({
    id: 'EditListingLocationForm.addressNotRecognized',
  });

  const buildingMessage = intl.formatMessage({ id: 'EditListingLocationForm.building' });
  const buildingPlaceholderMessage = intl.formatMessage({
    id: 'EditListingLocationForm.buildingPlaceholder',
  });

  const errorMessage = updateError
    ? <p className={css.error}>
        <FormattedMessage id="EditListingLocationForm.updateFailed" />
      </p>
    : null;

  const classes = classNames(css.root, className);
  const submitReady = updated;
  const submitInProgress = submitting || updateInProgress;
  const submitDisabled = invalid || disabled || submitInProgress;

  return (
    <Form className={classes} onSubmit={handleSubmit}>
      {errorMessage}
      <LocationAutocompleteInputField
        inputClassName={css.locationAutocompleteInput}
        iconClassName={css.locationAutocompleteInputIcon}
        predictionsClassName={css.predictionsRoot}
        validClassName={css.validLocation}
        autoFocus
        name="location"
        label={titleRequiredMessage}
        placeholder={addressPlaceholderMessage}
        format={null}
        validate={[
          autocompleteSearchRequired(addressRequiredMessage),
          autocompletePlaceSelected(addressNotRecognizedMessage),
        ]}
      />

      <TextInputField
        className={css.building}
        type="text"
        name="building"
        id={`${form}.building`}
        label={buildingMessage}
        placeholder={buildingPlaceholderMessage}
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

EditListingLocationFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
};

const { func, string, bool, instanceOf } = PropTypes;

EditListingLocationFormComponent.propTypes = {
  ...formPropTypes,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  selectedPlace: propTypes.place,
  updated: bool.isRequired,
  updateError: instanceOf(Error),
  updateInProgress: bool.isRequired,
};

const formName = 'EditListingLocationForm';

// When a field depends on the value of another field, we must connect
// to the store and select the required values to inject to the
// component.
//
// See: http://redux-form.com/6.6.1/examples/selectingFormValues/
const selector = formValueSelector(formName);
const mapStateToProps = state => {
  const location = selector(state, 'location');
  return {
    selectedPlace: location && location.selectedPlace ? location.selectedPlace : null,
  };
};

export default compose(connect(mapStateToProps), reduxForm({ form: formName }), injectIntl)(
  EditListingLocationFormComponent
);
