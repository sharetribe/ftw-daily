import React, { Component } from 'react';
import { arrayOf, func, node, number, shape, string } from 'prop-types';
import { compose } from 'redux';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { FieldGroupCheckbox, Form } from '../../components';
import css from './SelectMultipleFilterMobileForm.css';

class SelectMultipleFilterMobileFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };

    this.handleClear = this.handleClear.bind(this);
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
  }

  handleClear() {
    this.props.onClear();
  }

  toggleIsOpen() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const { form, name, label, options, initialValuesCount, intl } = this.props;

    const hasInitialValues = initialValuesCount > 0;
    const labelClass = hasInitialValues ? css.filterLabelSelected : css.filterLabel;

    const labelText = hasInitialValues
      ? intl.formatMessage(
          { id: 'SelectMultipleFilterMobileForm.labelSelected' },
          { labelText: label, count: initialValuesCount }
        )
      : label;

    const optionsContainerClass = this.state.isOpen
      ? css.optionsContainerOpen
      : css.optionsContainerClosed;

    return (
      <Form>
        <div className={labelClass}>
          <button type="button" className={css.labelButton} onClick={this.toggleIsOpen}>
            <span className={labelClass}>{labelText}</span>
          </button>
          <button type="button" className={css.clearButton} onClick={this.handleClear}>
            <FormattedMessage id={'SelectMultipleFilterMobileForm.clear'} />
          </button>
        </div>

        <div className={optionsContainerClass}>
          <FieldGroupCheckbox name={name} id={`${form}.${name}`} options={options} />
        </div>
      </Form>
    );
  }
}

SelectMultipleFilterMobileFormComponent.defaultProps = {
  initialValuesCount: 0,
};

SelectMultipleFilterMobileFormComponent.propTypes = {
  ...formPropTypes,
  name: string.isRequired,
  label: string.isRequired,
  onClear: func.isRequired,
  options: arrayOf(
    shape({
      key: string.isRequired,
      label: node.isRequired,
    })
  ).isRequired,
  initialValuesCount: number,

  // form injectIntl
  intl: intlShape.isRequired,
};

const defaultFormName = 'SelectMultipleFilterMobileForm';

export default compose(reduxForm({ form: defaultFormName }), injectIntl)(
  SelectMultipleFilterMobileFormComponent
);
