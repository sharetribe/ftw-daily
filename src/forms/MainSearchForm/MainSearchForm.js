import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form as FinalForm, Field } from 'react-final-form';
import classNames from 'classnames';
import { Form, LocationAutocompleteInput, Button } from '../../components';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import css from './MainSearchForm.css';
import marketPlaceCss from './../../marketplace.css';

class MainSearchFormComponent extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.searchInput = null;
  }

  selectedLocation = {}

  onChange() {
    if (this.selectedLocation.selectedPlace) {
      // Note that we use `onSubmit` instead of the conventional
      // `handleSubmit` prop for submitting. We want to autosubmit
      // when a place is selected, and don't require any extra
      // validations for the form.
      this.props.onSubmit({ location: this.selectedLocation });
      // blur search input to hide software keyboard
      if (this.searchInput) {
        this.searchInput.blur();
      }
    }
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        render={formRenderProps => {
          const { rootClassName, className, desktopInputRoot, intl, isMobile } = formRenderProps;

          const classes = classNames(rootClassName, className);
          const desktopInputRootClass = desktopInputRoot || css.desktopInputRoot;

          // Allow form submit only when the place has changed
          const preventFormSubmit = (e) => {
            e.preventDefault();
            this.onChange();
          };

          return (
            <Form className={classes} onSubmit={preventFormSubmit}>
              <div className={css.root}>
                <div className={css.formContainer}>
                  <h1 className={css.heroMainTitle}>
                      <FormattedMessage id="SectionHero.title" />
                  </h1>
                  <h4 className={css.heroSubTitle}>
                      <FormattedMessage id="SectionHero.subTitle" />
                  </h4>
                 
                  <Field
                    name="location"
                    format={null}
                    render={({ input, meta }) => {
                      const { onChange, ...restInput } = input;

                      // Merge the standard onChange function with custom behaviur. A better solution would
                      // be to use the FormSpy component from Final Form and pass this.onChange to the
                      // onChange prop but that breaks due to insufficient subscription handling.
                      // See: https://github.com/final-form/react-final-form/issues/159
                      const searchOnChange = value => {
                        onChange(value);
                        this.selectedLocation = value;
                      };

                      const searchInput = { ...restInput, onChange: searchOnChange };
                      return (
                        <LocationAutocompleteInput
                          className={isMobile ? css.mobileInputRoot : desktopInputRootClass}
                          iconClassName={isMobile ? css.mobileIcon : css.desktopIcon}
                          inputClassName={isMobile ? css.mobileInput : css.desktopInput}
                          predictionsClassName={
                            isMobile ? css.mobilePredictions : css.desktopPredictions
                          }
                          predictionsAttributionClassName={
                            isMobile ? css.mobilePredictionsAttribution : null
                          }
                          placeholder={intl.formatMessage({ id: 'MainSearch.location' })}
                          closeOnBlur={!isMobile}
                          inputRef={node => {
                            this.searchInput = node;
                          }}
                          input={searchInput}
                          meta={meta}
                        />
                      );
                    }}
                  />
                  <div className={marketPlaceCss.alignCenter}>
                    <Button
                      className={css.submitButton}
                      type="submit"
                      inProgress={false}
                      disabled={false}
                      ready={false}>
                      Procurar
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

const { func, string, bool } = PropTypes;

MainSearchFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  desktopInputRoot: null,
  isMobile: false,
};

MainSearchFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  desktopInputRoot: string,
  onSubmit: func.isRequired,
  isMobile: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

const MainSearchForm = injectIntl(MainSearchFormComponent);

export default MainSearchForm;
