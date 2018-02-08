import React from 'react';
import { array, string, func } from 'prop-types';
import classNames from 'classnames';

import SelectMultipleFilterMobileForm from './SelectMultipleFilterMobileForm';
import { arrayToFormValues, formValuesToArray } from '../../util/data';

import css from './SelectMultipleFilterMobile.css';

const SelectMultipleFilterMobile = props => {
  const {
    rootClassName,
    className,
    name,
    urlParam,
    label,
    onSelect,
    options,
    initialValues,
  } = props;

  const handleSelect = values => {
    const selectedKeys = formValuesToArray(values[name]);
    onSelect(urlParam, selectedKeys);
  };

  const handleClear = () => {
    onSelect(urlParam, null);
  };

  const classes = classNames(rootClassName || css.root, className);

  const initialValuesObj = arrayToFormValues(initialValues);
  const namedInitialValues = { [name]: initialValuesObj };

  return (
    <div className={classes}>
      <SelectMultipleFilterMobileForm
        name={name}
        label={label}
        options={options}
        initialValues={namedInitialValues}
        initialValuesCount={initialValues.length}
        onChange={handleSelect}
        onClear={handleClear}
      />
    </div>
  );
};

SelectMultipleFilterMobile.defaultProps = {
  rootClassName: null,
  className: null,
  initialValues: [],
};

SelectMultipleFilterMobile.propTypes = {
  rootClassName: string,
  className: string,
  name: string.isRequired,
  urlParam: string.isRequired,
  label: string.isRequired,
  onSelect: func.isRequired,
  options: array.isRequired,
  initialValues: array,
};

export default SelectMultipleFilterMobile;
