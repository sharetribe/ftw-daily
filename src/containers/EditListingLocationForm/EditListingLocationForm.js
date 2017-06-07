import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { autocompleteSearchRequired, autocompletePlaceSelected } from '../../util/validators';
import { LocationAutocompleteInput, Button, InputField } from '../../components';

import css from './EditListingLocationForm.css';

export const EditListingLocationFormComponent = props => {
  const {
    className,
    disabled,
    handleSubmit,
    intl,
    invalid,
    saveActionMsg,
    submitting,
  } = props;

  const titleRequiredMessage = intl.formatMessage({ id: 'EditListingLocationForm.address' });
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

  const classes = classNames(css.root, className);

  return (
    <form className={classes} onSubmit={handleSubmit}>
      <Field
        autoFocus
        name="location"
        label={titleRequiredMessage}
        format={null}
        type="custom"
        component={InputField}
        inputComponent={LocationAutocompleteInput}
        validate={[
          autocompleteSearchRequired(addressRequiredMessage),
          autocompletePlaceSelected(addressNotRecognizedMessage),
        ]}
      />

      <Field
        className={css.building}
        name="building"
        label={buildingMessage}
        placeholder={buildingPlaceholderMessage}
        component={InputField}
        type="text"
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

EditListingLocationFormComponent.defaultProps = {
  saveActionMsg: 'Next: pricing',
  selectedPlace: null,
};

const { func, string } = PropTypes;

EditListingLocationFormComponent.propTypes = {
  ...formPropTypes,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string,
  selectedPlace: propTypes.place,
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
