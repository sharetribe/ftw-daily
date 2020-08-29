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
    form,
    priceType
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
  const [incompleteMonths, setIncompleteMonths] = useState([])
  useEffect(() => {
    if (form) {
      _.keys(labels).forEach((v) => push(`${fieldId}.seasonalPricing`, { month: v.toString() }))
    }

    return () => {
      removeBatch(`${fieldId}.seasonalPricing`, _.keys(labels))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid container justify={'space-between'} alignItems={'center'} direction="row" spacing={3}>
      <FieldArray
        id={`${fieldId}.seasonalPricing`}
        name={`${fieldId}.seasonalPricing`}
        validate={(value) => {
          setIncompleteMonths(_.compact((value || []).map((v) => { return !v.price ? v.month : undefined })))
          return !_.isEmpty((value || []).filter((v) => v.month && !v.price))
        }}
      >
        {({ fields }) => fields.map((name, index) => {
          return (
            <Grid item xs={12} sm={6}>
              <MField
                label={labels[index]}
                name={`${fieldId}.seasonalPricing.${index}.price`}
                form={form}
                adornmentStart={'€'}
                complete={!_.includes(incompleteMonths, index.toString())}
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
