import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(3),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25vw'
  },
  label: {
    backgroundColor: 'white'
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
    required
  } = props
  const classes = useStyles()

  return (
    <Chip></Chip>
  )
}

export default MField
