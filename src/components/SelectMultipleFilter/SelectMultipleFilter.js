import React, { Component } from 'react';
import { array, arrayOf, func, number, string } from 'prop-types';
import classNames from 'classnames';
import { injectIntl, intlShape } from 'react-intl';

import { SelectMultipleFilterForm } from '../../forms';
import css from './SelectMultipleFilter.css';

const KEY_CODE_ESCAPE = 27;

class SelectMultipleFilter extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
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
    const { name, onSelect, urlParam } = this.props;
    const paramValues = values[name];
    this.setState({ isOpen: false });
    onSelect(urlParam, paramValues);
  }

  handleClear() {
    const { onSelect, urlParam } = this.props;
    this.setState({ isOpen: false });
    onSelect(urlParam, null);
  }

  handleCancel() {
    const { onSelect, initialValues, urlParam } = this.props;
    this.setState({ isOpen: false });
    onSelect(urlParam, initialValues);
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
    const { rootClassName, className, id, name, label, options, initialValues, intl } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    const hasInitialValues = initialValues.length > 0;
    const labelStyles = hasInitialValues ? css.labelSelected : css.label;

    const buttonLabel = hasInitialValues
      ? intl.formatMessage(
          { id: 'SelectMultipleFilter.labelSelected' },
          { labelText: label, count: initialValues.length }
        )
      : label;

    const contentStyle = this.positionStyleForContent();

    // pass the initial values with the name key so that
    // they can be passed to the correct field
    const namedInitialValues = { [name]: initialValues };

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
          {buttonLabel}
        </button>
        <SelectMultipleFilterForm
          id={id}
          onSubmit={this.handleSubmit}
          initialValues={namedInitialValues}
          enableReinitialize={true}
          name={name}
          onClear={this.handleClear}
          onCancel={this.handleCancel}
          options={options}
          isOpen={this.state.isOpen}
          intl={intl}
          contentRef={node => {
            this.filterContent = node;
          }}
          style={contentStyle}
        />
      </div>
    );
  }
}

SelectMultipleFilter.defaultProps = {
  rootClassName: null,
  className: null,
  initialValues: [],
  contentPlacementOffset: 0,
};

SelectMultipleFilter.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  name: string.isRequired,
  urlParam: string.isRequired,
  label: string.isRequired,
  onSelect: func.isRequired,
  options: array.isRequired,
  initialValues: arrayOf(string),
  contentPlacementOffset: number,

  // form injectIntl
  intl: intlShape.isRequired,
};

export default injectIntl(SelectMultipleFilter);
