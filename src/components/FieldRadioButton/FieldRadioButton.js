import React from 'react';
import { node, string } from 'prop-types';
import classNames from 'classnames';
import { Field } from 'react-final-form';

import css from './FieldRadioButton.css';

const IconRadioButton = props => {
  const { checkedClassName } = props;
  return (
    <div>
      <svg className={props.className} width="14" height="14" xmlns="http://www.w3.org/2000/svg">
        <circle
          className={props.showAsRequired ? css.required : css.notChecked}
          cx="5"
          cy="19"
          r="6"
          transform="translate(2 -12)"
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
        />

        <g
          className={classNames(css.checked, checkedClassName || css.checkedStyle)}
          transform="translate(2 -12)"
          fill="none"
          fillRule="evenodd"
        >
          <circle strokeWidth="2" cx="5" cy="19" r="6" />
          <circle fill="#FFF" fillRule="nonzero" cx="5" cy="19" r="3" />
        </g>
      </svg>
    </div>
  );
};

IconRadioButton.defaultProps = { className: null };

IconRadioButton.propTypes = { className: string };

const FieldRadioButtonComponent = props => {
  const {
    rootClassName,
    className,
    svgClassName,
    checkedClassName,
    id,
    label,
    showAsRequired,
    ...rest
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const radioButtonProps = {
    id,
    className: css.input,
    component: 'input',
    type: 'radio',
    ...rest,
  };

  return (
    <span className={classes}>
      <Field {...radioButtonProps} />
      <label htmlFor={id} className={css.label}>
        <span className={css.radioButtonWrapper}>
          <IconRadioButton
            className={svgClassName}
            checkedClassName={checkedClassName}
            showAsRequired={showAsRequired}
          />
        </span>
        <span className={css.text}>{label}</span>
      </label>
    </span>
  );
};

FieldRadioButtonComponent.defaultProps = {
  className: null,
  rootClassName: null,
  svgClassName: null,
  checkedClassName: null,
  label: null,
};

FieldRadioButtonComponent.propTypes = {
  className: string,
  rootClassName: string,
  svgClassName: string,
  checkedClassName: string,

  // Id is needed to connect the label with input.
  id: string.isRequired,
  label: node,

  // Name groups several RadioButtones to an array of selected values
  name: string.isRequired,

  // RadioButton needs a value that is passed forward when user checks the RadioButton
  value: string.isRequired,
};

export default FieldRadioButtonComponent;
