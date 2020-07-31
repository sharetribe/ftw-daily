import React from 'react'

import css from './IconButton.css'

export const IconButton = (props) => {
  const {
    icon,
    alt,
    ...rest
  } = props
  return (
    <button
      className={css.rootIconButton}
      alt={props.alt}
      {...rest}
    >
      {icon}
    </button>
  )
}
