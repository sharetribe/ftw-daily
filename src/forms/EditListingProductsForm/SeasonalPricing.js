import Grid from '@material-ui/core/Grid'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { FieldArray } from 'react-final-form-arrays'
import MField from '../../components/MField/MField'
import { NotificationBanner } from '../../components/NotificationBanner/NotificationBanner'

// publicData => seasonalPricing => { 0: 3500, 1: 3500 }

export const SeasonalPricing = (props) => {
  const {
    fieldId,
    onChange,
    form
  } = props

  const labels = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  }

  const { push, removeBatch } = form && form.mutators ? form.mutators : {}

  useEffect(() => {
    if (form) {
      _.keys(labels).forEach((v) => push(`${fieldId}.seasonalPricing`, { month: v.toString() }))
    }

    return () => {
      removeBatch(`${fieldId}.seasonalPricing`, _.keys(labels))
    }
  }, [])

  return (
    <Grid container justify={'space-between'} alignItems={'center'} direction="row" spacing={3}>
      <Grid item xs={12}>
        <NotificationBanner
          text={'If a stay spans multiple seasons pricing will be pro-rated. For example if a guest books January 20 - February 10 the price will be 10 nights at the January price and 10 nights at the February price.'}
          type={'help'}
        />
      </Grid>
      <FieldArray id={`${fieldId}.seasonalPricing`} name={`${fieldId}.seasonalPricing`}>
        {({ fields }) => fields.map((name, index) => {
          return (
            <Grid item xs={12} sm={6}>
              <MField
                label={labels[index]}
                name={`${fieldId}.seasonalPricing.${index}.price`}
                form={form}
                adornmentStart={'€'}
                adornmentEnd={'Per night'}
                required={true}
              />
            </Grid>
          )
        })}
      </FieldArray>
    </Grid>
  )
}

SeasonalPricing.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape(
      {
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      }
    )
  ).isRequired,
  form: PropTypes.object,
  name: PropTypes.string,
  value: PropTypes.string.isRequired
}
