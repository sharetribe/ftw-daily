import React from 'react';
import { string } from 'prop-types';
import { Field } from 'react-final-form';
import DateRangeController from './DateRangeController';

const component = props => {
  const { input, controllerRef, ...rest } = props;
  const { type, checked, ...restOfInput } = input;
  return <DateRangeController ref={controllerRef} {...restOfInput} {...rest} />;
};

const FieldDateRangeController = props => {
  return <Field component={component} {...props} />;
};

FieldDateRangeController.defaultProps = {
  rootClassName: null,
  className: null,
};

FieldDateRangeController.propTypes = {
  rootClassName: string,
  className: string,
};

export default FieldDateRangeController;
