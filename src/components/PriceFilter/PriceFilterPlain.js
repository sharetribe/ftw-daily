import React, { Component } from 'react';
import { arrayOf, func, node, number, shape, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { formatCurrencyMajorUnit } from '../../util/currency';
import config from '../../config';

import { PriceFilterForm } from '../../forms';

import css from './PriceFilterPlain.module.css';

const RADIX = 10;

const getPriceQueryParamName = queryParamNames => {
  return Array.isArray(queryParamNames)
    ? queryParamNames[0]
    : typeof queryParamNames === 'string'
    ? queryParamNames
    : 'price';
};

// Parse value, which should look like "0,1000"
const parse = priceRange => {
  const [minPrice, maxPrice] = !!priceRange
    ? priceRange.split(',').map(v => Number.parseInt(v, RADIX))
    : [];
  // Note: we compare to null, because 0 as minPrice is falsy in comparisons.
  return !!priceRange && minPrice != null && maxPrice != null ? { minPrice, maxPrice } : null;
};

// Format value, which should look like { minPrice, maxPrice }
const format = (range, queryParamName) => {
  const { minPrice, maxPrice } = range || {};
  // Note: we compare to null, because 0 as minPrice is falsy in comparisons.
  const value = minPrice != null && maxPrice != null ? `${minPrice},${maxPrice}` : null;
  return { [queryParamName]: value };
};

class PriceFilterPlainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };

    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
  }

  handleChange(values) {
    const { onSubmit, queryParamNames } = this.props;
    const priceQueryParamName = getPriceQueryParamName(queryParamNames);
    onSubmit(format(values, priceQueryParamName));
  }

  handleClear() {
    const { onSubmit, queryParamNames } = this.props;
    const priceQueryParamName = getPriceQueryParamName(queryParamNames);
    onSubmit(format(null, priceQueryParamName));
  }

  toggleIsOpen() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const {
      rootClassName,
      className,
      id,
      label,
      queryParamNames,
      initialValues,
      min,
      max,
      step,
      intl,
      currencyConfig,
    } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    const priceQueryParam = getPriceQueryParamName(queryParamNames);
    const initialPrice = initialValues ? parse(initialValues[priceQueryParam]) : {};
    const { minPrice, maxPrice } = initialPrice || {};

    const hasValue = value => value != null;
    const hasInitialValues = initialValues && hasValue(minPrice) && hasValue(maxPrice);

    const labelClass = hasInitialValues ? css.filterLabelSelected : css.filterLabel;
    const labelText = hasInitialValues
      ? intl.formatMessage(
          { id: 'PriceFilter.labelSelectedPlain' },
          {
            minPrice: formatCurrencyMajorUnit(intl, currencyConfig.currency, minPrice),
            maxPrice: formatCurrencyMajorUnit(intl, currencyConfig.currency, maxPrice),
          }
        )
      : label
      ? label
      : intl.formatMessage({ id: 'PriceFilter.label' });

    return (
      <div className={classes}>
        <div className={labelClass}>
          <button type="button" className={css.labelButton} onClick={this.toggleIsOpen}>
            <span className={labelClass}>{labelText}</span>
          </button>
          <button type="button" className={css.clearButton} onClick={this.handleClear}>
            <FormattedMessage id={'PriceFilter.clear'} />
          </button>
        </div>
        <div className={css.formWrapper}>
          <PriceFilterForm
            id={id}
            initialValues={hasInitialValues ? initialPrice : { minPrice: min, maxPrice: max }}
            onChange={this.handleChange}
            intl={intl}
            contentRef={node => {
              this.filterContent = node;
            }}
            min={min}
            max={max}
            step={step}
            liveEdit
            isOpen={this.state.isOpen}
          />
        </div>
      </div>
    );
  }
}

PriceFilterPlainComponent.defaultProps = {
  rootClassName: null,
  className: null,
  initialValues: null,
  step: number,
  currencyConfig: config.currencyConfig,
};

PriceFilterPlainComponent.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  label: node,
  queryParamNames: arrayOf(string).isRequired,
  onSubmit: func.isRequired,
  initialValues: shape({
    price: string,
  }),
  min: number.isRequired,
  max: number.isRequired,
  step: number,
  currencyConfig: propTypes.currencyConfig,

  // form injectIntl
  intl: intlShape.isRequired,
};

const PriceFilterPlain = injectIntl(PriceFilterPlainComponent);

export default PriceFilterPlain;
