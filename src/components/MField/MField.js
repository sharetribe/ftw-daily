import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import React, { useEffect, useState } from 'react'
import get from 'lodash/get'
import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'

import './MField.css'

const useStyles = makeStyles((theme) => ({
  label: {
    backgroundColor: 'white'
  },
  adornmentComplete: {
    '& p': {
      color: '#5ce073'
    }
  },
  adornmentRegular: {
    '& p': {
      color: 'rgba(0, 0, 0, 0.54)'
    }
  }
}))

const MField = (props) => {
  const {
    label,
    name,
    form,
    adornmentEnd,
    adornmentStart,
    error,
    disabled,
    required,
    complete,
    fullWidth = true
  } = props
  const classes = useStyles()

  const [getValue, setValue] = useState(get(form.getState(), `values.${name}`))

  useEffect(() => {
    form.registerField(
      name,
      (fieldState) => setValue(fieldState.value),
      {
        [name]: true
      }
    )
  }, [form, name])

  const handleChange = (event) => {
    form.change(name, event.target.value)
    setValue(event.target.value)
  }

  const adornments = () => {
    console.log(complete)
    const adorns = {}
    if (adornmentStart) {
      adorns.startAdornment
        = <InputAdornment
          position="start"
          classes={{
            root: complete ? classes.adornmentComplete : classes.adornmentRegular
          }}
        >
          {adornmentStart}
        </InputAdornment>
    }
    if (adornmentEnd) {
      adorns.endAdornment = <InputAdornment position="end">{adornmentEnd}</InputAdornment>
    }
    return adorns
  }

  return (
    <FormControl
      fullWidth={fullWidth}
      variant="outlined"
      disabled={disabled}
      error={error}
    >
      <InputLabel
        htmlFor={name}
        required={required}
        shrink={true}
        className={classes.label}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        id={name}
        value={getValue}
        onChange={handleChange}
        startAdornment={adornments().startAdornment}
        endAdornment={adornments().endAdornment}
        labelWidth={60}
      />
    </FormControl>
  )
}

export default MField
