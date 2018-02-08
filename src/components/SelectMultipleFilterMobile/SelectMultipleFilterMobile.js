import React, { Component } from 'react';
import { array, string, func } from 'prop-types';
import classNames from 'classnames';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import SelectMultipleFilterMobileForm from './SelectMultipleFilterMobileForm';
import { arrayToFormValues, formValuesToArray } from '../../util/data';

import css from './SelectMultipleFilterMobile.css';

class SelectMultipleFilterMobileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
  }

  handleSelect(values) {
    const { urlParam, name, onSelect } = this.props;
    const selectedKeys = formValuesToArray(values[name]);
    onSelect(urlParam, selectedKeys);
  }

  handleClear() {
    const { urlParam, onSelect } = this.props;
    onSelect(urlParam, null);
  }

  toggleIsOpen() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const { rootClassName, className, name, label, options, initialValues, intl } = this.props;

    const classes = classNames(rootClassName || css.root, className);

    const hasInitialValues = initialValues.length > 0;
    const labelClass = hasInitialValues ? css.filterLabelSelected : css.filterLabel;

    const labelText = hasInitialValues
      ? intl.formatMessage(
          { id: 'SelectMultipleFilterMobileForm.labelSelected' },
          { labelText: label, count: initialValues.length }
        )
      : label;

    const optionsContainerClass = this.state.isOpen
      ? css.optionsContainerOpen
      : css.optionsContainerClosed;

    const initialValuesObj = arrayToFormValues(initialValues);
    const namedInitialValues = { [name]: initialValuesObj };

    return (
      <div className={classes}>
        <div className={labelClass}>
          <button type="button" className={css.labelButton} onClick={this.toggleIsOpen}>
            <span className={labelClass}>{labelText}</span>
          </button>
          <button type="button" className={css.clearButton} onClick={this.handleClear}>
            <FormattedMessage id={'SelectMultipleFilterMobileForm.clear'} />
          </button>
        </div>
        <div className={optionsContainerClass}>
          <SelectMultipleFilterMobileForm
            name={name}
            options={options}
            initialValues={namedInitialValues}
            onChange={this.handleSelect}
            enableReinitialize={true}
            keepDirtyOnReinitialize={true}
          />
        </div>
      </div>
    );
  }
}

SelectMultipleFilterMobileComponent.defaultProps = {
  rootClassName: null,
  className: null,
  initialValues: [],
};

SelectMultipleFilterMobileComponent.propTypes = {
  rootClassName: string,
  className: string,
  name: string.isRequired,
  urlParam: string.isRequired,
  label: string.isRequired,
  onSelect: func.isRequired,
  options: array.isRequired,
  initialValues: array,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SelectMultipleFilterMobile = injectIntl(SelectMultipleFilterMobileComponent);

export default SelectMultipleFilterMobile;
