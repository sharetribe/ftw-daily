import React, { Component } from 'react';
import { arrayOf, func, node, shape, string } from 'prop-types';
import classNames from 'classnames';
import { injectIntl, intlShape } from 'react-intl';
import { toPairs } from 'lodash';

import SelectMultipleFilterForm from './SelectMultipleFilterForm';
import css from './SelectMultipleFilter.css';

const KEY_CODE_ESCAPE = 27;

/**
 * Convert an array of option keys into
 * an object that can be passed to a redux
 * form as initial values.
 */
const keysToValues = keys => {
  return keys.reduce((map, key) => {
    map[key] = true;
    return map;
  }, {});
};

/**
 * Convert an object containing values received
 * from a redux form into an array of values.
 */
const valuesToKeys = values => {
  const entries = toPairs(values);
  return entries.filter(entry => entry[1] === true).map(entry => entry[0]);
};

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
    const selectedKeys = valuesToKeys(values);
    this.setState({ isOpen: false });
    this.props.onSubmit(selectedKeys);
  }

  handleClear() {
    this.setState({ isOpen: false });
    this.props.onSubmit(null);
  }

  handleCancel() {
    const { onSubmit, initialValues } = this.props;
    this.setState({ isOpen: false });
    onSubmit(initialValues);
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
    const { rootClassName, className, options, initialValues, intl } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    const hasInitialValues = initialValues.length > 0;
    const labelStyles = hasInitialValues ? css.labelSelected : css.label;
    const label = hasInitialValues
      ? intl.formatMessage(
          { id: 'SelectMultipleFilterMobile.labelSelected' },
          { count: initialValues.length }
        )
      : intl.formatMessage({ id: 'SelectMultipleFilterMobile.label' });

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
        <SelectMultipleFilterForm
          onSubmit={this.handleSubmit}
          initialValues={keysToValues(initialValues)}
          enableReinitialize={true}
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
};

SelectMultipleFilter.propTypes = {
  rootClassName: string,
  className: string,
  onSubmit: func.isRequired,
  options: arrayOf(
    shape({
      key: string.isRequired,
      label: node.isRequired,
    })
  ).isRequired,
  initialValues: arrayOf(string),

  // form injectIntl
  intl: intlShape.isRequired,
};

export default injectIntl(SelectMultipleFilter);
