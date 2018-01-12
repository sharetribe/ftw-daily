import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import config from '../../config';
import css from './SelectSingleFilterMobile.css';

class SelectSingleFilterMobileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };
  }

  render() {
    const {
      rootClassName,
      className,
      customAttribute,
      urlQueryParams,
      onSelect,
      intl,
    } = this.props;

    const selectOption = (option) => {
      onSelect(customAttribute, option);
    };

    const toggleIsOpen = () => {
      this.setState({ isOpen: !this.state.isOpen });
    };

    const filterLabel = intl.formatMessage({
      id: `SelectSingleFilterMobile.${customAttribute}.label`,
    });
    // custom attribute content
    const ca = customAttribute && config.customAttributes[customAttribute];
    // name of the corresponding query parameter
    const caParam = `ca_${customAttribute}`;
    // current value of this custom attribute filter
    const currentValue = urlQueryParams[caParam];

    const labelClass = currentValue ? css.filterLabelSelected : css.filterLabel;

    const optionsContainerClass = this.state.isOpen
      ? css.optionsContainerOpen
      : css.optionsContainerClosed;

    const classes = classNames(rootClassName || css.root, className);

    return (
      <div className={classes}>
        <div className={labelClass}>
          <button className={css.labelButton} onClick={toggleIsOpen}>
            <span className={labelClass}>{filterLabel}</span>
          </button>
          <button className={css.clearButton} onClick={() => selectOption(null)}>
            <FormattedMessage id={'SelectSingleFilterMobile.clear'} />
          </button>
        </div>
        <div className={optionsContainerClass}>
          {ca.values.map(v => {
            // check if this option is selected
            const selected = currentValue === v;
            // menu item border class
            const optionBorderClass = selected ? css.optionBorderSelected : css.optionBorder;
            return (
              <button key={v} className={css.option} onClick={() => selectOption(v)}>
                <span className={optionBorderClass} />
                <FormattedMessage id={`SelectSingleFilterMobile.category.option.${v}`} />
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

const { object, string, func } = PropTypes;

SelectSingleFilterMobileComponent.defaultProps = {
  rootClassName: null,
  className: null,
};

SelectSingleFilterMobileComponent.propTypes = {
  rootClassName: string,
  className: string,
  customAttribute: string.isRequired,
  urlQueryParams: object.isRequired,
  onSelect: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SelectSingleFilterMobile = injectIntl(SelectSingleFilterMobileComponent);

export default SelectSingleFilterMobile;
