import React from 'react'

const ReactSelectAdapter = (props) => {
  const {
    input,
    searchable = false,
    ...rest
  } = props

  if (typeof window === 'undefined') {
    return null
  }
  const { default: Select } = require('react-select') // eslint-disable-line global-require

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontFamily: 'Nunito Sans'
    }),
    singleValue: (provided, state) => ({
      ...provided,
      fontFamily: 'Nunito Sans'
    }),
    control: (base) => ({
      ...base,
      fontFamily: 'Nunito Sans',
    })

  }
  return (
    <Select
      {...input}
      {...rest}
      searchable={searchable}
      styles={customStyles}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: '#5cbce0',
          primary: 'black',
        },
      })}
    />
  )
}

export default ReactSelectAdapter
