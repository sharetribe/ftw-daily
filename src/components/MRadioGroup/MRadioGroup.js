import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import get from 'lodash/get'

export const MRadioGroup = (props) => {
  const {
    label,
    options,
    onChange,
    form,
    name,
    value,
    defaultValue
  } = props

  const [getFormValue, setFormValue] = useState('')

  useEffect(() => {
    if (form) {
      form.registerField(
        name,
        (fieldState) => setFormValue(fieldState.value),
        {
          [name]: true
        }
      )
      setFormValue(get(form.getState(), `values.${name}`))
    }
    setFormValue(defaultValue)
  }, [])

  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value)
    }
    if (form) {
      form.change(name, event.target.value)
    }
    setFormValue(event.target.value)
  }

  console.log(getFormValue)

  const createFields = () => options.map((opt) => (<FormControlLabel value={opt.value} control={<Radio />} label={opt.label} />))

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup aria-label={label} name={name} value={form ? getFormValue : value} onChange={handleChange}>
        {createFields()}
      </RadioGroup>
    </FormControl>
  )
}

MRadioGroup.propTypes = {
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
