import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { Form, LocationAutocompleteInput } from '../../components';

import css from './TopbarSearchForm.css';

class TopbarSearchFormComponent extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.searchInput = null;
  }

  onChange(location) {
    if (location.selectedPlace) {
      // Note that we use `onSubmit` instead of the conventional
      // `handleSubmit` prop for submitting. We want to autosubmit
      // when a place is selected, and don't require any extra
      // validations for the form.
      this.props.onSubmit({ location });
      // blur search input to hide software keyboard
      if (this.searchInput) {
        this.searchInput.blur();
      }
    }
  }

  render() {
    const { rootClassName, className, desktopInputRoot, intl, isMobile } = this.props;

    const classes = classNames(rootClassName, className);
    const desktopInputRootClass = desktopInputRoot || css.desktopInputRoot;

    // Allow form submit only when the place has changed
    const preventFormSubmit = e => e.preventDefault();

    return (
      <Form className={classes} onSubmit={preventFormSubmit}>
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
          onChange={this.onChange}
          inputRef={node => {
            this.searchInput = node;
          }}
        />
      </Form>
    );
  }
}

const { func, string, bool } = PropTypes;

TopbarSearchFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  desktopInputRoot: null,
  isMobile: false,
};

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
