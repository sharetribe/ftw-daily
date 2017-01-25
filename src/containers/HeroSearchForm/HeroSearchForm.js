import React from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import css from './HeroSearchForm.css';

const HeroSearchForm = props => {
  const { className, intl, handleSubmit, pristine, submitting } = props;
  const addClassName = className ? { className } : {};
  const placeholderMsg = {
    id: 'HeroSearchForm.placeholder',
    defaultMessage: 'Location search (soon)',
  };

  return (
    <form {...addClassName} onSubmit={handleSubmit}>
      <Field
        name="location"
        className={css.locationInput}
        component="input"
        type="text"
        placeholder={intl.formatMessage(placeholderMsg)}
      />
      <button className={css.locationButton} type="submit" disabled={pristine || submitting}>
        <FormattedMessage id="HeroSearchForm.search" defaultMessage="Search" />
      </button>
    </form>
  );
};

HeroSearchForm.propTypes = { ...formPropTypes, intl: intlShape.isRequired };

export default reduxForm({ form: 'herosearchform' })(injectIntl(HeroSearchForm))
