import React, { Component } from 'react';
import { func, number, shape, string } from 'prop-types';
import classNames from 'classnames';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { propTypes } from '../../util/types';
import { formatCurrencyMajorUnit } from '../../util/currency';
import config from '../../config';

import { PriceFilterForm } from '../../forms';

import css from './PriceFilterPlain.css';

class PriceFilterPlainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };

    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
  }

  handleChange(values) {
    const { onSubmit, urlParam } = this.props;
    onSubmit(urlParam, values);
  }

  handleClear() {
    const { onSubmit, urlParam } = this.props;
    onSubmit(urlParam, null);
  }

  toggleIsOpen() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const {
      rootClassName,
      className,
      id,
      initialValues,
      min,
      max,
      step,
      intl,
      currencyConfig,
    } = this.props;
    const classes = classNames(rootClassName || css.root, className);
    const { minPrice, maxPrice } = initialValues || {};

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
            initialValues={hasInitialValues ? initialValues : { minPrice: min, maxPrice: max }}
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
  urlParam: string.isRequired,
  onSubmit: func.isRequired,
  initialValues: shape({
    minPrice: number.isRequired,
    maxPrice: number.isRequired,
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
