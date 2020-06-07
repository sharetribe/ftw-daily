import React, { Component } from 'react';
import { array, arrayOf, func, node, number, object, string } from 'prop-types';
import classNames from 'classnames';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { parseSelectFilterOptions } from '../../util/search';
import { FieldCheckbox } from '../../components';

import { FilterPopup, FilterPlain } from '../../components';
import css from './SelectMultipleFilter.css';

// SelectMultipleFilter doesn't need array mutators since it doesn't require validation.
// TODO: Live edit didn't work with FieldCheckboxGroup
//       There's a mutation problem: formstate.dirty is not reliable with it.
const GroupOfFieldCheckboxes = props => {
  const { id, className, name, options } = props;
  return (
    <fieldset className={className}>
      <ul className={css.list}>
        {options.map((option, index) => {
          const fieldId = `${id}.${option.key}`;
          return (
            <li key={fieldId} className={css.item}>
              <FieldCheckbox id={fieldId} name={name} label={option.label} value={option.key} />
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
};

const getQueryParamName = queryParamNames => {
  return Array.isArray(queryParamNames) ? queryParamNames[0] : queryParamNames;
};

// Format URI component's query param: { pub_key: 'has_all:a,b,c' }
const format = (selectedOptions, queryParamName, searchMode) => {
  const hasOptionsSelected = selectedOptions && selectedOptions.length > 0;
  const mode = searchMode ? `${searchMode}:` : '';
  const value = hasOptionsSelected ? `${mode}${selectedOptions.join(',')}` : null;
  return { [queryParamName]: value };
};

class SelectMultipleFilter extends Component {
  constructor(props) {
    super(props);

    this.filter = null;
    this.filterContent = null;

    this.positionStyleForContent = this.positionStyleForContent.bind(this);
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
      name,
      label,
      options,
      initialValues,
      contentPlacementOffset,
      onSubmit,
      queryParamNames,
      searchMode,
      intl,
      showAsPopup,
      ...rest
    } = this.props;

    const classes = classNames(rootClassName || css.root, className);

    const queryParamName = getQueryParamName(queryParamNames);
    const hasInitialValues = !!initialValues && !!initialValues[queryParamName];
    // Parse options from param strings like "has_all:a,b,c" or "a,b,c"
    const selectedOptions = hasInitialValues
      ? parseSelectFilterOptions(initialValues[queryParamName])
      : [];

    const labelForPopup = hasInitialValues
      ? intl.formatMessage(
          { id: 'SelectMultipleFilter.labelSelected' },
          { labelText: label, count: selectedOptions.length }
        )
      : label;

    const labelForPlain = hasInitialValues
      ? intl.formatMessage(
          { id: 'SelectMultipleFilterPlainForm.labelSelected' },
          { labelText: label, count: selectedOptions.length }
        )
      : label;

    const contentStyle = this.positionStyleForContent();

    // pass the initial values with the name key so that
    // they can be passed to the correct field
    const namedInitialValues = { [name]: selectedOptions };

    const handleSubmit = values => {
      const usedValue = values ? values[name] : values;
      onSubmit(format(usedValue, queryParamName, searchMode));
    };

    return showAsPopup ? (
      <FilterPopup
        className={classes}
        rootClassName={rootClassName}
        popupClassName={css.popupSize}
        name={name}
        label={labelForPopup}
        isSelected={hasInitialValues}
        id={`${id}.popup`}
        showAsPopup
        contentPlacementOffset={contentPlacementOffset}
        onSubmit={handleSubmit}
        initialValues={namedInitialValues}
        keepDirtyOnReinitialize
        {...rest}
      >
        <GroupOfFieldCheckboxes
          className={css.fieldGroup}
          name={name}
          id={`${id}-checkbox-group`}
          options={options}
        />
      </FilterPopup>
    ) : (
      <FilterPlain
        className={className}
        rootClassName={rootClassName}
        label={labelForPlain}
        isSelected={hasInitialValues}
        id={`${id}.plain`}
        liveEdit
        contentPlacementOffset={contentStyle}
        onSubmit={handleSubmit}
        initialValues={namedInitialValues}
        {...rest}
      >
        <GroupOfFieldCheckboxes
          className={css.fieldGroupPlain}
          name={name}
          id={`${id}-checkbox-group`}
          options={options}
        />
      </FilterPlain>
    );
  }
}

SelectMultipleFilter.defaultProps = {
  rootClassName: null,
  className: null,
  initialValues: null,
  contentPlacementOffset: 0,
};

SelectMultipleFilter.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  name: string.isRequired,
  queryParamNames: arrayOf(string).isRequired,
  label: node.isRequired,
  onSubmit: func.isRequired,
  options: array.isRequired,
  initialValues: object,
  contentPlacementOffset: number,

  // form injectIntl
  intl: intlShape.isRequired,
};

export default injectIntl(SelectMultipleFilter);
