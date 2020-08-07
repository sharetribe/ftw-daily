import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}))

const MButton = (props) => {
  const {
    label,
    onClick,
    color,
    startIcon,
    variant = 'contained',
    endIcon
  } = props
  const classes = useStyles()
  return (
    <Button
      variant={variant}
      color={color}
      className={classes.button}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}

export default MButton
