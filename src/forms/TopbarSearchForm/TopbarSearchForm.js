import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form as FinalForm, Field } from 'react-final-form';
import { intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import { Form, LocationAutocompleteInput } from '../../components';

import css from './TopbarSearchForm.css';

const identity = v => v;

class TopbarSearchFormComponent extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.searchInput = React.createRef();
  }

  onSubmit(values) {
    this.props.onSubmit({ keywords: values.keywords });
    // blur search input to hide software keyboard
    if (this.searchInput.current) {
      this.searchInput.current.blur();
    }
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        onSubmit={this.onSubmit}
        render={formRenderProps => {
          const {
            rootClassName,
            className,
            intl,
            isMobile,
            handleSubmit,
          } = formRenderProps;
          const classes = classNames(rootClassName, className);
          return (
            <Form className={classes} onSubmit={handleSubmit}>
              <Field
                name="keywords"
                render={({ input, meta }) => {
                  return (
                    <input
                      className={
                        isMobile
                          ? css.mobileInputRoot
                          : css.desktopInputRoot
                      }
                      {...input}
                      id="keyword-search"
                      ref={this.searchInput}
                      type="text"
                      placeholder={intl.formatMessage({
                        id: 'TopbarSearchForm.placeholder',
                      })}
                      autoComplete="off"
                    />
                  );
                }}
              />
            </Form>
          );
        }}
      />
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
  rootClassName: string,
  className: string,
  desktopInputRoot: string,
  onSubmit: func.isRequired,
  isMobile: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

const TopbarSearchForm = injectIntl(TopbarSearchFormComponent);

export default TopbarSearchForm;
