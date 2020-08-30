import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import React, { useEffect, useState } from 'react'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'

import './MField.css'
import { getDisplayValueFromMoney, getMoneyFromValue } from '../../util/price'

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
    intl,
    label,
    name,
    form,
    adornmentEnd,
    adornmentStart,
    error,
    disabled,
    required,
    complete,
    isCurrency,
    fullWidth = true
  } = props
  const classes = useStyles()

  const [getValue, setValue] = useState(get(form.getState(), `values.${name}`))

  useEffect(() => {
    form.registerField(
      name,
      (fieldState) => null,
      {
        [name]: true
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCurrency = (value) => {
    try {
      const p = parseInt(value, 10)
      if (isNaN(p) || (!getValue && p === 0)) return
      form.change(name, isCurrency ? p * 100 : p)
      setValue(isCurrency ? p * 100 : p)
    } catch (e) {
      return
    }
  }

  const handleChange = (event) => {
    try {
      const { value } = event.target
      if (isCurrency && !isEmpty(value)) {
        handleCurrency(value)
      } else {
        form.change(name, value)
        setValue(value)
      }
    } catch (e) {
      console.log('')
    }
  }

  const adornments = () => {
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

  const displayValue = () => {
    if (isCurrency && getValue) {
      return getDisplayValueFromMoney(getValue, intl)
    }
    return getValue
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
        value={displayValue()}
        onChange={handleChange}
        startAdornment={adornments().startAdornment}
        endAdornment={adornments().endAdornment}
        labelWidth={60}
      />
    </FormControl>
  )
}

export default MField
