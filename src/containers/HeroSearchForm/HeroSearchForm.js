import React from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { LocationAutocompleteInput } from '../../components';
import { autocompleteSearchRequired, autocompletePlaceSelected } from '../../util/validators';

import css from './HeroSearchForm.css';

const HeroSearchForm = props => {
  const { className, intl, handleSubmit, pristine, submitting } = props;
  const addClassName = className ? { className } : {};

  return (
    <form {...addClassName} onSubmit={handleSubmit}>
      <Field
        className={css.locationInput}
        name="location"
        label="Location"
        placeholder={intl.formatMessage({ id: 'HeroSearchForm.placeholder' })}
        format={null}
        component={LocationAutocompleteInput}
        validate={[autocompleteSearchRequired(), autocompletePlaceSelected()]}
      />
      <button className={css.locationButton} type="submit" disabled={pristine || submitting}>
        <FormattedMessage id="HeroSearchForm.search" />
      </button>
    </form>
  );
};

HeroSearchForm.propTypes = { ...formPropTypes, intl: intlShape.isRequired };

export default reduxForm({ form: 'herosearchform' })(injectIntl(HeroSearchForm));
