import React from 'react'
import PropTypes from 'prop-types'
import logoImage from './nfhLogo.png'

const IconLogo = (props) => {
  const { className, ...rest } = props

  return (
    <img
      src={logoImage}
      alt="Nashville For Hire logo"
      className={className}
      {...rest}
      width="28"
      height="28"
    />
  )
}

const { string } = PropTypes

IconLogo.defaultProps = {
  className: null,
}

IconLogo.propTypes = {
  className: string,
}

export default IconLogo
