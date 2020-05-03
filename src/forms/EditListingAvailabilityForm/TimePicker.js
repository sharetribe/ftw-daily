import React, { Component } from 'react';
import { func, number, shape, string } from 'prop-types';
import classNames from 'classnames';
import { injectIntl, intlShape } from 'react-intl';

import config from '../../config';

import { TimePickerForm } from '../../forms';
import css from './TimePicker.css';

const KEY_CODE_ESCAPE = 27;

class TimePicker extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: true };
    this.filter = null;
    this.filterContent = null;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.positionStyleForContent = this.positionStyleForContent.bind(this);
  }

  handleSubmit(values) {
    
    this.setState({ isOpen: false });
    // onSubmit(urlParam, values);
  }

  handleClear() {
    
    this.setState({ isOpen: false });
    // onSubmit(urlParam, null);
  }

  handleCancel() {
    const { onSubmit, initialValues } = this.props;
    this.setState({ isOpen: false });
    // onSubmit(urlParam, initialValues);
  }

  handleBlur(event) {
    // FocusEvent is fired faster than the link elements native click handler
    // gets its own event. Therefore, we need to check the origin of this FocusEvent.
    if (!this.filter.contains(event.relatedTarget)) {
      this.setState({ isOpen: false });
    }
  }

  handleKeyDown(e) {
    // Gather all escape presses to close menu
    if (e.keyCode === KEY_CODE_ESCAPE) {
      this.toggleOpen(false);
    }
  }

  toggleOpen(enforcedState) {
    if (enforcedState) {
      this.setState({ isOpen: enforcedState });
    } else {
      this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }
  }

  positionStyleForContent() {
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
    } = this.props;
    const classes = classNames(rootClassName || css.root, className);
    const { minHour, maxHour } = initialValues || {};

    const hasValue = value => value != null;
    const hasInitialValues = initialValues && hasValue(minHour) && hasValue(maxHour);

    const label = hasInitialValues
      ? intl.formatMessage(
          { id: 'TimePicker.labelSelectedButton' },
          {
            minHour: minHour,
            maxHour: maxHour,
          }
        )
      : intl.formatMessage({ id: 'TimePicker.label' });

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
        <TimePickerForm
          id={id}
          initialValues={hasInitialValues ? initialValues : { minHour: min, maxHour: max }}
          onClear={this.handleClear}
          onCancel={this.handleCancel}
          onSubmit={this.handleSubmit}
          intl={intl}
          style={contentStyle}
          min={min}
          max={max}
          step={step}
          isOpen={this.state.isOpen}
        />
      </div>
    );
  }
}

TimePicker.defaultProps = {
  rootClassName: null,
  className: null,
  initialValues: null,
  contentPlacementOffset: 0,
  liveEdit: false,
  step: number,
};

TimePicker.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  
  onSubmit: func.isRequired,
  initialValues: shape({
    minHour: number.isRequired,
    maxHour: number.isRequired,
  }),
  contentPlacementOffset: number,
  min: number.isRequired,
  max: number.isRequired,
  step: number,

  // form injectIntl
  intl: intlShape.isRequired,
};

export default injectIntl(TimePicker);
