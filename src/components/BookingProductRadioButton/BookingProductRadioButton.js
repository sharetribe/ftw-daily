import Chip from '@material-ui/core/Chip'
import React from 'react'
import { node, string } from 'prop-types'
import classNames from 'classnames'
import { Field } from 'react-final-form'
import FaceIcon from '@material-ui/icons/Face'
import get from 'lodash/get'
import find from 'lodash/find'
import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import {
  formatMoney, convertMoneyToNumber, convertUnitToSubUnit, unitDivisor
} from '../../util/currency'
import ValidationError from '../ValidationError/ValidationError'
import { types as sdkTypes } from '../../util/sdkLoader'

import css from './BookingProductRadioButton.css'

const { Money } = sdkTypes

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
    intl,
    product,
    showAsRequired,
    fieldMeta,
    images,
    price,
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
    if (images.length) {
      return get(images, '[0].attributes.variants.["square-small"].url')
    }
  }

  const beds = [
    {
      value: 'one-queen',
      label: '1 Queen Bed'
    },
    {
      value: 'two-queens',
      label: '2 Queen Beds'
    },
    {
      value: 'king',
      label: '1 King Bed'
    },
    {
      value: 'single-twin',
      label: '1 Twin Bed'
    },
    {
      value: 'double-twins',
      label: '2 Twin Beds'
    },
    {
      value: 'dorm',
      label: 'Dorm'
    }
  ]

  const bath = [
    {
      value: 'private',
      label: 'Private Bathroom'
    },
    {
      value: 'shared',
      label: 'Shared Bathroom'
    }
  ]

  const occupancyType = [
    {
      value: 'private',
      label: 'Private Room'
    },
    {
      value: 'shared',
      label: 'Shared Room'
    }
  ]

  const getDisplayValue = (collection, value) => {
    return get(find(collection, (c) => c.value === value), 'label')
  }

  // we don't want to alter the actual transaction amount as its handled on the backend
  // but we do want to give the user the actual total price, not surprise them on the checkout page
  // with a service fee
  const adjustTotalDisplayPrice = () => price + (price * 0.11)

  const required = (value) => (value ? undefined : 'Select a room')

  return (
    <span className={classes}>
      <Field
        {...radioButtonProps}
        validate={required}
      />
      <label htmlFor={id} className={css.label}>
        <div className={css.buttonContainer}>
          <div className={css.radioButtonWrapper}>
            <div className={css.bookingSelectionTopRow}>
              {
                buildThumbnail() ? <img src={buildThumbnail()} alt="" className={css.checkboxProductThumbnail}/> : null
              }
              <div className={css.roomDetailsListWrapper}>
                <span className={css.textRoot}>{label}</span>
                <ul className={css.roomDetailsList}>
                  {
                    product.occupancyType
                      ? <li>&#9679; <span className={css.productDetailText}>{getDisplayValue(occupancyType, product.occupancyType)}</span></li> : null
                  }
                  {
                    product.bathroom
                      ? <li>&#9679; <span className={css.productDetailText}>{getDisplayValue(bath, product.bathroom)}</span></li> : null
                  }
                  {
                    product.beds
                      ? <li>&#9679; <span className={css.productDetailText}>{getDisplayValue(beds, product.beds)}</span></li> : null
                  }
                </ul>
              </div>
            </div>
            <div className={css.bookingPanelPricingRow}>
              <div className={css.totalPrice}>
                {
                  price
                    ? <span>
                      {formatMoney(intl, new Money(adjustTotalDisplayPrice(), product.price.currency))}
                    </span> : null
                }
              </div>
              <IconRadioButton checked={fieldMeta.values.bookingProduct === product.id}/>
            </div>
            {/* <div className={css.discountChipContainer}> */}
            {/*  <Chip size="small" label={'10% Weekly Discount'} /> */}
            {/* </div> */}
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
