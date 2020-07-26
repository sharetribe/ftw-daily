import React from 'react'
import { node, string } from 'prop-types'
import keys from 'lodash/keys'
import classNames from 'classnames'
import { Field } from 'react-final-form'

import css from './BookingProductToggle.css'

const BookingProductToggle = (props) => {
  console.log(props)
  const {
    rootClassName,
    className,
    svgClassName,
    textClassName,
    id,
    label,
    useSuccessColor,
    product,
    ...rest
  } = props

  const classes = classNames(rootClassName || css.root, className)
  const checkboxProps = {
    id,
    className: css.input,
    component: 'input',
    type: 'checkbox',
    ...rest,
  }

  const successColorVariantMaybe = useSuccessColor
    ? {
      checkedClassName: css.checkedSuccess,
      boxClassName: css.boxSuccess,
    }
    : {}

  const buildThumbnail = () => {
    return `${process.env.REACT_APP_IMGIX_URL}/${keys(product.photos)[0]}?fm=jpm&h=60&w=60&fit=crop`
  }
  console.log(props)

  return (
    <span className={classes}>
      <Field {...checkboxProps} />
      <label htmlFor={id} className={css.label}>
        <div className={css.checkboxWrapper}>
          <img src={buildThumbnail()} alt={`${props.product.type}`} className={css.checkboxProductThumbnail}/>
          <span className={css.checkboxProductName}>{props.product.type}</span>
        </div>
      </label>
    </span>
  )
}

BookingProductToggle.defaultProps = {
  className: null,
  rootClassName: null,
  svgClassName: null,
  textClassName: null,
  label: null,
}

BookingProductToggle.propTypes = {
  className: string,
  rootClassName: string,
  svgClassName: string,
  textClassName: string,

  // Id is needed to connect the label with input.
  id: string.isRequired,
  label: node,

  // Name groups several checkboxes to an array of selected values
  name: string.isRequired,

  // Checkbox needs a value that is passed forward when user checks the checkbox
  value: string.isRequired,
}

export default BookingProductToggle
