import React, { Component } from 'react';
import { bool, func, node, number, object, string } from 'prop-types';
import classNames from 'classnames';
import { injectIntl, intlShape } from '../../util/reactIntl';

import { OutsideClickHandler } from '../../components';
import { FilterForm } from '../../forms';
import css from './FilterPopup.module.css';

const KEY_CODE_ESCAPE = 27;

class FilterPopup extends Component {
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
    const { onSubmit } = this.props;
    this.setState({ isOpen: false });
    onSubmit(values);
  }

  handleClear() {
    const { onSubmit, onClear } = this.props;
    this.setState({ isOpen: false });

    if (onClear) {
      onClear();
    }

    onSubmit(null);
  }

  handleCancel() {
    const { onSubmit, onCancel, initialValues } = this.props;
    this.setState({ isOpen: false });

    if (onCancel) {
      onCancel();
    }

    onSubmit(initialValues);
  }

  handleBlur() {
    this.setState({ isOpen: false });
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
      popupClassName,
      id,
      label,
      labelMaxWidth,
      isSelected,
      children,
      initialValues,
      keepDirtyOnReinitialize,
      contentPlacementOffset,
    } = this.props;

    const classes = classNames(rootClassName || css.root, className);
    const popupClasses = classNames(css.popup, { [css.isOpen]: this.state.isOpen });
    const popupSizeClasses = popupClassName || css.popupSize;
    const labelStyles = isSelected ? css.labelSelected : css.label;
    const labelMaxWidthMaybe = labelMaxWidth ? { maxWidth: `${labelMaxWidth}px` } : {};
    const labelMaxWidthStyles = labelMaxWidth ? css.labelEllipsis : null;
    const contentStyle = this.positionStyleForContent();

    return (
      <OutsideClickHandler onOutsideClick={this.handleBlur}>
        <div
          className={classes}
          onKeyDown={this.handleKeyDown}
          ref={node => {
            this.filter = node;
          }}
        >
          <button
            className={classNames(labelStyles, labelMaxWidthStyles)}
            style={labelMaxWidthMaybe}
            onClick={() => this.toggleOpen()}
          >
            {label}
          </button>
          <div
            id={id}
            className={popupClasses}
            ref={node => {
              this.filterContent = node;
            }}
            style={contentStyle}
          >
            {this.state.isOpen ? (
              <FilterForm
                id={`${id}.form`}
                paddingClasses={popupSizeClasses}
                showAsPopup
                contentPlacementOffset={contentPlacementOffset}
                initialValues={initialValues}
                keepDirtyOnReinitialize={keepDirtyOnReinitialize}
                onSubmit={this.handleSubmit}
                onCancel={this.handleCancel}
                onClear={this.handleClear}
              >
                {children}
              </FilterForm>
            ) : null}
          </div>
        </div>
      </OutsideClickHandler>
    );
  }
}

FilterPopup.defaultProps = {
  rootClassName: null,
  className: null,
  popupClassName: null,
  initialValues: null,
  keepDirtyOnReinitialize: false,
  contentPlacementOffset: 0,
  liveEdit: false,
  label: null,
  labelMaxWidth: null,
};

FilterPopup.propTypes = {
  rootClassName: string,
  className: string,
  popupClassName: string,
  id: string.isRequired,
  onSubmit: func.isRequired,
  initialValues: object,
  keepDirtyOnReinitialize: bool,
  contentPlacementOffset: number,
  label: string.isRequired,
  labelMaxWidth: number,
  isSelected: bool.isRequired,
  children: node.isRequired,

  // form injectIntl
  intl: intlShape.isRequired,
};

export default injectIntl(FilterPopup);
