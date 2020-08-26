import React, { useEffect } from 'react';
import { Colors } from '../../colors'

const ReactSelectAdapter = (props) => {
  const {
    input,
    searchable = false,
    value,
    ...rest
  } = props

  if (typeof window === 'undefined') {
    return null
  }
  const { default: Select } = require('react-select') // eslint-disable-line global-require

  const determineBorderColor = () => {
    const {
      visited,
      invalid,
      valid,
      pristine
    } = props.meta
    switch (true) {
      case visited && invalid:
        return Colors.error
      case !pristine && invalid:
        return Colors.error
      case valid:
        return Colors.success
      default:
        return Colors.darkGrey
    }
  }

  const customStyles = {
    option: (provided) => ({
      ...provided,
      fontFamily: 'Nunito Sans'
    }),
    singleValue: (provided) => ({
      ...provided,
      fontFamily: 'Nunito Sans'
    }),
    control: (base) => ({
      ...base,
      fontFamily: 'Nunito Sans',
      height: 50,
      borderColor: determineBorderColor()
    })
  }
  return (
    <Select
      {...input}
      {...rest}
      searchable={searchable}
      value={props.options.find((o) => o.value === input.value)}
      styles={customStyles}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: '#e7e7e7',
          primary: Colors.primary,
        },
      })}
    />
  )
}

export default ReactSelectAdapter
