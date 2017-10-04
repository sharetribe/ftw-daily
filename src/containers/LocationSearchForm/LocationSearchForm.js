import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { LocationAutocompleteInput } from '../../components';

import css from './LocationSearchForm.css';

const LocationSearchFormComponent = props => {
  const { rootClassName, className, intl, onSubmit } = props;

  const onChange = location => {
    if (location.selectedPlace) {
      // Note that we use `onSubmit` instead of the conventional
      // `handleSubmit` prop for submitting. We want to autosubmit
      // when a place is selected, and don't require any extra
      // validations for the form.
      onSubmit({ location });
    }
  };

  const classes = classNames(rootClassName || css.root, className);

  // Allow form submit only when the place has changed
  const preventFormSubmit = e => e.preventDefault();

  return (
    <form className={classes} onSubmit={preventFormSubmit}>
      <Field
        name="location"
        label="Location"
        placeholder={intl.formatMessage({ id: 'LocationSearchForm.placeholder' })}
        format={null}
        component={LocationAutocompleteInput}
        iconClassName={css.searchInputIcon}
        inputClassName={css.searchInput}
        predictionsClassName={css.searchPredictions}
        onChange={onChange}
      />
    </form>
  );
};

const { func, string } = PropTypes;

LocationSearchFormComponent.defaultProps = { rootClassName: null, className: null };

LocationSearchFormComponent.propTypes = {
  ...formPropTypes,

  rootClassName: string,
  className: string,
  onSubmit: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const defaultFormName = 'TopbarSearchForm';

const LocationSearchForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(
  LocationSearchFormComponent
);

export default LocationSearchForm;
