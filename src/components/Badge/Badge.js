import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import css from './Badge.css'

const Badge = (props) => {
  const { className, rootClassName } = props
  const classes = classNames(rootClassName || css.root, className)

  return (
    <div className={classes}>
      <span>{props.text}</span>
    </div>
  )
}

const { string } = PropTypes

Badge.defaultProps = {
  className: null,
  rootClassName: null,
}

Badge.propTypes = {
  className: string,
  rootClassName: string,
}

export default Badge
