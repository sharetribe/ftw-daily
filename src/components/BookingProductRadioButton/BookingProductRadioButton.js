import React from 'react'
import { node, string } from 'prop-types'
import classNames from 'classnames'
import { Field, FormSpy } from 'react-final-form'
import keys from 'lodash/keys'
import ValidationError from '../ValidationError/ValidationError';

import css from './BookingProductRadioButton.css'

const IconRadioButton = (props) => {
  return (
    <div className={css.radioIconWrapper}>
      <svg className={css.iconRadioButton} width="40px" height="100px" viewBox="0 0 100 100">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="noun_unchecked-radio-button_3139889" fill="#000000" fill-rule="nonzero">
            <path d="M50,3 C75.916,3 97,24.084 97,50 C97,75.916 75.916,97 50,97 C24.084,97 3,75.916 3,50 C3,24.084 24.084,3 50,3 M50,0 C22.386,0 0,22.386 0,50 C0,77.614 22.386,100 50,100 C77.614,100 100,77.614 100,50 C100,22.386 77.614,0 50,0 L50,0 Z" id="Shape"></path>
            {
              props.checked ? <circle className={css.checked} id="Oval" cx="50" cy="50" r="35.5"></circle> : null
            }
          </g>
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
    id,
    label,
    product,
    showAsRequired,
    fieldMeta,
    ...rest
  } = props

  console.log(props)

  const classes = classNames(rootClassName || css.root, className)
  const radioButtonProps = {
    id,
    className: css.input,
    component: 'input',
    type: 'radio',
    ...rest,
  }

  const buildThumbnail = () => {
    return `${process.env.REACT_APP_IMGIX_URL}/${keys(product.photos)[0]}?fm=jpm&auto=format&h=60&w=60&fit=crop`
  }
  const required = (value) => (value ? undefined : 'Select a room')
  return (
    <span className={classes}>
      <FormSpy onChange={(e) => console.log(e)}/>
      <Field
        {...radioButtonProps}
        validate={required}
      />
      <label htmlFor={id} className={css.label}>
        <div className={css.buttonContainer}>
          <div className={css.radioButtonWrapper}>
            <img src={buildThumbnail()} alt="" className={css.checkboxProductThumbnail}/>
            <span className={css.textRoot}>{label}</span>
          </div>
          <div className={css.roomDetailsListWrapper}>
            <ul className={css.roomDetailsList}>
              {
                product.beds
                  ? <li>&#9679; <span className={css.productDetailText}>{product.beds.label}</span></li> : null
              }
              {
                product.bathroom
                  ? <li>&#9679; <span className={css.productDetailText}>{product.bathroom.label}</span></li> : null
              }
            </ul>
            <div>
              <IconRadioButton checked={fieldMeta.values.bookingProduct === product.id}/>
            </div>
          </div>
        </div>
      </label>
      <ValidationError fieldMeta={fieldMeta}/>
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
