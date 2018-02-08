import React, { Component } from 'react';
import { string, func, arrayOf, shape } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import css from './SelectSingleFilterMobile.css';

class SelectSingleFilterMobile extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };
    this.selectOption = this.selectOption.bind(this);
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
  }

  selectOption(option, e) {
    const { urlParam, onSelect } = this.props;
    onSelect(urlParam, option);

    // blur event target if event is passed
    if (e && e.currentTarget) {
      e.currentTarget.blur();
    }
  }

  toggleIsOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { rootClassName, className, label, options, initialValue } = this.props;

    const labelClass = initialValue ? css.filterLabelSelected : css.filterLabel;

    const optionsContainerClass = this.state.isOpen
      ? css.optionsContainerOpen
      : css.optionsContainerClosed;

    const classes = classNames(rootClassName || css.root, className);

    return (
      <div className={classes}>
        <div className={labelClass}>
          <button className={css.labelButton} onClick={this.toggleIsOpen}>
            <span className={labelClass}>{label}</span>
          </button>
          <button className={css.clearButton} onClick={e => this.selectOption(null, e)}>
            <FormattedMessage id={'SelectSingleFilterMobile.clear'} />
          </button>
        </div>
        <div className={optionsContainerClass}>
          {options.map(option => {
            // check if this option is selected
            const selected = initialValue === option.key;
            // menu item border class
            const optionBorderClass = selected ? css.optionBorderSelected : css.optionBorder;
            return (
              <button
                key={option.key}
                className={css.option}
                onClick={() => this.selectOption(option.key)}
              >
                <span className={optionBorderClass} />
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

SelectSingleFilterMobile.defaultProps = {
  rootClassName: null,
  className: null,
  initialValue: null,
};

SelectSingleFilterMobile.propTypes = {
  rootClassName: string,
  className: string,
  urlParam: string.isRequired,
  label: string.isRequired,
  onSelect: func.isRequired,

  options: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
  initialValue: string,
};

export default SelectSingleFilterMobile;
