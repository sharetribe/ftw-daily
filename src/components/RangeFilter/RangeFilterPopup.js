import React, { Component } from 'react';
import { func, number, shape, string } from 'prop-types';
import classNames from 'classnames';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import config from '../../config';

import { RangeFilterForm } from '../../forms';
import css from './RangeFilterPopup.css';

const KEY_CODE_ESCAPE = 27;

class RangeFilterPopup extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.filter = null;
    this.filterContent = null;
  }

  handleSubmit = values => {
    const { onSubmit, urlParam } = this.props;
    this.setState({ isOpen: false });
    onSubmit(urlParam, values);
  };

  handleClear = () => {
    const { onSubmit, urlParam } = this.props;
    this.setState({ isOpen: false });
    onSubmit(urlParam, null);
  };

  handleCancel = () => {
    const { onSubmit, initialValues, urlParam } = this.props;
    this.setState({ isOpen: false });
    onSubmit(urlParam, initialValues);
  };

  handleBlur = event => {
    // FocusEvent is fired faster than the link elements native click handler
    // gets its own event. Therefore, we need to check the origin of this FocusEvent.
    if (!this.filter.contains(event.relatedTarget)) {
      this.setState({ isOpen: false });
    }
  };

  handleKeyDown = e => {
    // Gather all escape presses to close menu
    if (e.keyCode === KEY_CODE_ESCAPE) {
      this.toggleOpen(false);
    }
  };

  toggleOpen = enforcedState => {
    if (enforcedState) {
      this.setState({ isOpen: enforcedState });
    } else {
      this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }
  };

  positionStyleForContent = () => {
    if (this.filter && this.filterContent) {
      // Render the filter content to the right from the menu
      // unless there's no space in which case it is rendered
      // to the left
      const distanceToRight = window.innerWidth - this.filter.getBoundingClientRect().right;
      const labelWidth = this.filter.offsetWidth;
      const contentWidth = this.filterContent.offsetWidth;
      const contentWidthBiggerThanLabel = contentWidth - labelWidth;
      const renderToRight = distanceToRight > contentWidthBiggerThanLabel;
      const contentPlacementOffset = this.props.contentPlacementOffset;

      const offset = renderToRight
        ? { left: contentPlacementOffset }
        : { right: contentPlacementOffset };
      // set a min-width if the content is narrower than the label
      const minWidth = contentWidth < labelWidth ? { minWidth: labelWidth } : null;

      return { ...offset, ...minWidth };
    }
    return {};
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
      rangeFilterFormValueId,
      valueTypeLabelId,
    } = this.props;
    const classes = classNames(rootClassName || css.root, className);
    const { minValue, maxValue } = initialValues || {};

    const hasValue = value => value != null;
    const hasInitialValues = initialValues && hasValue(minValue) && hasValue(maxValue);

    const label = hasInitialValues
      ? intl.formatMessage(
          { id: 'RangeFilter.labelSelectedButton' },
          {
            minValue: `${minValue} ${intl.formatMessage({ id: valueTypeLabelId })} `,
            maxValue: `${maxValue} ${intl.formatMessage({ id: valueTypeLabelId })}`,
          }
        )
      : intl.formatMessage({ id: buttonLabelId });

    const labelStyles = hasInitialValues ? css.labelSelected : css.label;
    const contentStyle = this.positionStyleForContent();

    return (
      <div
        className={classes}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        ref={node => {
          this.filter = node;
        }}
      >
        <button className={labelStyles} onClick={() => this.toggleOpen()}>
          {label}
        </button>
        <RangeFilterForm
          id={id}
          initialValues={hasInitialValues ? initialValues : { minValue: min, maxValue: max }}
          onClear={this.handleClear}
          onCancel={this.handleCancel}
          onSubmit={this.handleSubmit}
          intl={intl}
          contentRef={node => {
            this.filterContent = node;
          }}
          style={contentStyle}
          min={min}
          max={max}
          step={step}
          showAsPopup
          isOpen={this.state.isOpen}
          rangeFilterFormLabelId={rangeFilterFormLabelId}
          rangeFilterFormValueId={rangeFilterFormValueId}
        />
      </div>
    );
  }
}

RangeFilterPopup.defaultProps = {
  rootClassName: null,
  className: null,
  initialValues: null,
  contentPlacementOffset: 0,
  liveEdit: false,
  step: number,
};

RangeFilterPopup.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  urlParam: string.isRequired,
  onSubmit: func.isRequired,
  initialValues: shape({
    minValue: number.isRequired,
    maxValue: number.isRequired,
  }),
  contentPlacementOffset: number,
  min: number.isRequired,
  max: number.isRequired,
  step: number,
  buttonLabelId: string.isRequired,

  // form injectIntl
  intl: intlShape.isRequired,
};

export default injectIntl(RangeFilterPopup);
