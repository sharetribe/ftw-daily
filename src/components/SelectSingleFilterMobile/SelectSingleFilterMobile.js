import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import config from '../../config';
import css from './SelectSingleFilterMobile.css';

const SelectSingleFilterMobileComponent = props => {
  const { rootClassName, className, customAttribute, urlQueryParams, onSelect, intl } = props;

  const selectOption = option => {
    onSelect(customAttribute, option);
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

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <div className={labelClass}>
        <span>{filterLabel}</span>
        <button className={css.clearButton} onClick={() => selectOption(null)}>
          <FormattedMessage id={'SelectSingleFilterMobile.clear'} />
        </button>
      </div>
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
  );
};

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
