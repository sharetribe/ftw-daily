import React from 'react'
import { node, string } from 'prop-types'
import classNames from 'classnames'
import { Field, FormSpy } from 'react-final-form'
import keys from 'lodash/keys'

import css from './BookingProductRadioButton.css'

const IconRadioButton = (props) => {
  return (
    <div className={css.radioIconWrapper}>
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

        <g className={css.checked} transform="translate(2 -12)" fill="none" fillRule="evenodd">
          <circle strokeWidth="2" cx="5" cy="19" r="6" />
          <circle fill="#FFF" fillRule="nonzero" cx="5" cy="19" r="3" />
        </g>
      </svg>
    </div>
  )
}

IconRadioButton.defaultProps = { className: null }

IconRadioButton.propTypes = { className: string }

const BookingProductRadioButtonComponent = (props) => {
  const {
    rootClassName,
    className,
    svgClassName,
    id,
    label,
    product,
    showAsRequired,
    ...rest
  } = props

  const classes = classNames(rootClassName || css.root, className)
  const radioButtonProps = {
    id,
    className: css.input,
    component: 'input',
    type: 'radio',
    ...rest,
  }

  const buildThumbnail = () => {
    return `${process.env.REACT_APP_IMGIX_URL}/${keys(product.photos)[0]}?fm=jpm&h=60&w=60&fit=crop`
  }

  return (
    <span className={classes}>
      <FormSpy onChange={(e) => console.log(e)}/>
      <Field {...radioButtonProps} />
      <label htmlFor={id} className={css.label}>
        <div className={css.radioButtonWrapper}>
          <img src={buildThumbnail()} alt="" className={css.checkboxProductThumbnail}/>
          <span className={css.textRoot}>{label}</span>
          <IconRadioButton className={svgClassName} showAsRequired={showAsRequired} />
        </div>
      </label>
    </span>
  )
}

BookingProductRadioButtonComponent.defaultProps = {
  className: null,
  rootClassName: null,
  svgClassName: null,
  label: null,
}

BookingProductRadioButtonComponent.propTypes = {
  className: string,
  rootClassName: string,
  svgClassName: string,

  // Id is needed to connect the label with input.
  id: string.isRequired,
  label: node,

  // Name groups several RadioButtones to an array of selected values
  name: string.isRequired,

  // RadioButton needs a value that is passed forward when user checks the RadioButton
  value: string.isRequired,
}

export default BookingProductRadioButtonComponent
