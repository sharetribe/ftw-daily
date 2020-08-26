import React from 'react'
import { bool, node } from 'prop-types'
import SelectSingleFilterPlain from './SelectSingleFilterPlain'
import SelectSingleFilterPopup from './SelectSingleFilterPopup'

const SelectSingleFilter = (props) => {
  const { showAsPopup, ...rest } = props
  return showAsPopup ? (
    <SelectSingleFilterPopup icon={props.icon} {...rest} />
  ) : (
    <SelectSingleFilterPlain icon={props.icon} {...rest} />
  )
}

SelectSingleFilter.defaultProps = {
  showAsPopup: false,
}

SelectSingleFilter.propTypes = {
  showAsPopup: bool,
  icon: node
}

export default SelectSingleFilter
