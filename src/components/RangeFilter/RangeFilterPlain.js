import React, { Component } from 'react';
import { func, number, shape, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';

import { RangeFilterForm } from '../../forms';

import css from './RangeFilterPlain.css';

class RangeFilterPlainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };
  }

  handleChange = values => {
    const { onSubmit, urlParam } = this.props;
    onSubmit(urlParam, values);
  };

  handleClear = () => {
    const { onSubmit, urlParam } = this.props;
    onSubmit(urlParam, null);
  };

  toggleIsOpen = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

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
      buttonLabelId,
      rangeFilterFormLabelId,
      buttonLabelSelectedId,
      valueFormat,
      rangeFilterFormValueId
    } = this.props;

    const classes = classNames(rootClassName || css.root, className);
    const { minValue, maxValue } = initialValues || {};

    const hasValue = value => value != null;
    const hasInitialValues = initialValues && hasValue(minValue) && hasValue(maxValue);

    const labelClass = hasInitialValues ? css.filterLabelSelected : css.filterLabel;
    const labelText =  intl.formatMessage(
          { id: buttonLabelId }
        )
    // const labelText = hasInitialValues
    //   ? intl.formatMessage(
    //       { id: buttonLabelSelectedId },
    //       {
    //         minValue: minValue,
    //         maxValue: maxValue,
    //       }
    //     )
    //   : intl.formatMessage({ id: buttonLabelId });

    return (
      <div className={classes}>
        <div className={labelClass}>
          <button type="button" className={css.labelButton} onClick={this.toggleIsOpen}>
            <span className={labelClass}>{labelText}</span>
          </button>
          <button type="button" className={css.clearButton} onClick={this.handleClear}>
            <FormattedMessage id="PriceFilter.clear" />
          </button>
        </div>
        <div className={css.formWrapper}>
          <RangeFilterForm
            {...{ id, min, max, step, intl, valueFormat, rangeFilterFormLabelId, rangeFilterFormValueId }}
            initialValues={hasInitialValues ? initialValues : { minValue: min, maxValue: max }}
            onChange={this.handleChange}
            contentRef={node => {
              this.filterContent = node;
            }}
            
            liveEdit
            isOpen={this.state.isOpen}
          />
        </div>
      </div>
    );
  }
}

RangeFilterPlainComponent.defaultProps = {
  rootClassName: null,
  className: null,
  initialValues: null,
  step: number,
  rangeFilterFormValueId: ''
};

RangeFilterPlainComponent.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  urlParam: string.isRequired,
  onSubmit: func.isRequired,
  initialValues: shape({
    minValue: number.isRequired,
    maxValue: number.isRequired,
  }),
  min: number.isRequired,
  max: number.isRequired,
  step: number,
  rangeFilterFormValueId: string,

  // form injectIntl
  intl: intlShape.isRequired,
};

const RangeFilterPlain = injectIntl(RangeFilterPlainComponent);

export default RangeFilterPlain;
