import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { LocationAutocompleteInput } from '../../components';

import css from './TopbarSearchForm.css';

const TopbarSearchFormComponent = props => {
  const { rootClassName, className, desktopInputRoot, intl, onSubmit, isMobile } = props;

  const onChange = location => {
    if (location.selectedPlace) {
      // Note that we use `onSubmit` instead of the conventional
      // `handleSubmit` prop for submitting. We want to autosubmit
      // when a place is selected, and don't require any extra
      // validations for the form.
      onSubmit({ location });
    }
  };

  const classes = classNames(rootClassName, className);
  const desktopInputRootClass = desktopInputRoot || css.desktopInputRoot;

  // Allow form submit only when the place has changed
  const preventFormSubmit = e => e.preventDefault();

  return (
    <form className={classes} onSubmit={preventFormSubmit}>
      <Field
        name="location"
        label="Location"
        className={isMobile ? css.mobileInputRoot : desktopInputRootClass}
        iconClassName={isMobile ? css.mobileIcon : css.desktopIcon}
        inputClassName={isMobile ? css.mobileInput : css.desktopInput}
        predictionsClassName={isMobile ? css.mobilePredictions : css.desktopPredictions}
        placeholder={intl.formatMessage({ id: 'TopbarSearchForm.placeholder' })}
        format={null}
        component={LocationAutocompleteInput}
        closeOnBlur={!isMobile}
        onChange={onChange}
      />
    </form>
  );
};

const { func, string, bool } = PropTypes;

TopbarSearchFormComponent.defaultProps = { rootClassName: null, className: null, desktopInputRoot: null, isMobile: false };

TopbarSearchFormComponent.propTypes = {
  ...formPropTypes,

  rootClassName: string,
  className: string,
  desktopInputRoot: string,
  onSubmit: func.isRequired,
  isMobile: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

const defaultFormName = 'TopbarSearchForm';

const TopbarSearchForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(
  TopbarSearchFormComponent
);

export default TopbarSearchForm;
