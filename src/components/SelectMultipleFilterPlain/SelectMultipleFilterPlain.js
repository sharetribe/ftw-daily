import React, { Component } from 'react';
import { array, bool, func, string } from 'prop-types';
import classNames from 'classnames';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { SelectMultipleFilterPlainForm } from '../../forms';

import css from './SelectMultipleFilterPlain.css';

class SelectMultipleFilterPlainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
  }

  handleSelect(values) {
    const { urlParam, name, onSelect } = this.props;
    const paramValues = values[name];
    onSelect(urlParam, paramValues);
  }

  handleClear() {
    const { urlParam, onSelect } = this.props;
    onSelect(urlParam, null);
  }

  toggleIsOpen() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const {
      rootClassName,
      className,
      id,
      name,
      label,
      options,
      initialValues,
      intl,
      twoColumns,
    } = this.props;

    const classes = classNames(rootClassName || css.root, className);

    const hasInitialValues = initialValues.length > 0;
    const labelClass = hasInitialValues ? css.filterLabelSelected : css.filterLabel;

    const labelText = hasInitialValues
      ? intl.formatMessage(
          { id: 'SelectMultipleFilterPlainForm.labelSelected' },
          { labelText: label, count: initialValues.length }
        )
      : label;

    const optionsContainerClass = classNames({
      [css.optionsContainerOpen]: this.state.isOpen,
      [css.optionsContainerClosed]: !this.state.isOpen,
      [css.columnLayout]: twoColumns,
    });

    const namedInitialValues = { [name]: initialValues };

    return (
      <div className={classes}>
        <div className={labelClass}>
          <button type="button" className={css.labelButton} onClick={this.toggleIsOpen}>
            <span className={labelClass}>{labelText}</span>
          </button>
          <button type="button" className={css.clearButton} onClick={this.handleClear}>
            <FormattedMessage id={'SelectMultipleFilterPlainForm.clear'} />
          </button>
        </div>
        <SelectMultipleFilterPlainForm
          id={id}
          className={optionsContainerClass}
          name={name}
          options={options}
          initialValues={namedInitialValues}
          onChange={this.handleSelect}
          twoColumns={twoColumns}
          enableReinitialize
          keepDirtyOnReinitialize
        />
      </div>
    );
  }
}

SelectMultipleFilterPlainComponent.defaultProps = {
  rootClassName: null,
  className: null,
  initialValues: [],
  twoColumns: false,
};

SelectMultipleFilterPlainComponent.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  name: string.isRequired,
  urlParam: string.isRequired,
  label: string.isRequired,
  onSelect: func.isRequired,
  options: array.isRequired,
  initialValues: array,
  twoColumns: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SelectMultipleFilterPlain = injectIntl(SelectMultipleFilterPlainComponent);

export default SelectMultipleFilterPlain;
