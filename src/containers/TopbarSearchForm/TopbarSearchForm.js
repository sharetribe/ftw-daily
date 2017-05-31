import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { LocationAutocompleteInput } from '../../components';

import css from './TopbarSearchForm.css';

const TopbarSearchFormComponent = props => {
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

  return (
    <form className={classes} onSubmit={onSubmit}>
      <Field
        name="location"
        label="Location"
        className={css.location}
        inputClassName={css.locationInput}
        predictionsClassName={css.locationPredictions}
        placeholder={intl.formatMessage({ id: 'TopbarSearchForm.placeholder' })}
        format={null}
        component={LocationAutocompleteInput}
        onChange={onChange}
      />
    </form>
  );
};

const { func, string } = PropTypes;

TopbarSearchFormComponent.defaultProps = { rootClassName: null, className: null };

TopbarSearchFormComponent.propTypes = {
  ...formPropTypes,

  rootClassName: string,
  className: string,
  onSubmit: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const defaultFormName = 'TopbarSearchForm';

const TopbarSearchForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(
  TopbarSearchFormComponent
);

export default TopbarSearchForm;
