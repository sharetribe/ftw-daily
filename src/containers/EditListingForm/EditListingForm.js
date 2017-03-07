import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl } from 'react-intl';
import { maxLength, required } from '../../util/validators';

const MAX_LENGTH = 60;
const maxLength60 = maxLength(`Must be ${MAX_LENGTH} characters or less`, MAX_LENGTH);

class EditListingForm extends Component {
  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const { initData = {}, initialize } = this.props;
    initialize(initData);
  }

  render() {
    const {
      disabled,
      handleSubmit,
      pristine,
      saveActionMsg = 'Save listing',
      submitting,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <Field
          name="title"
          component="input"
          type="text"
          validate={[required('Required'), maxLength60]}
        />
        <label htmlFor="description">Description</label>
        <Field name="description" component="input" type="textarea" />
        <button type="submit" disabled={pristine || submitting || disabled}>{saveActionMsg}</button>
      </form>
    );
  }
}

EditListingForm.defaultProps = { initData: {} };

const { shape, string } = PropTypes;

EditListingForm.propTypes = {
  ...formPropTypes,
  initData: shape({ title: string, description: string }),
  intl: intlShape.isRequired,
};

export default reduxForm({ form: 'EditListingForm' })(injectIntl(EditListingForm));
