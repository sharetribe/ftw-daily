import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import MButton from '../MButton/MButton'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'Nunito Sans'
  },
}))

export const AlertDialog = (props) => {
  const classes = useStyles()
  const {
    title,
    message,
    onClose,
    isOpen
  } = props

  return (
    <div>
      <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className={classes.root}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <Typography
            className={classes.root}
          >
            {message.split('\n').map((i, key) => {
              return <p key={key}>{i}</p>
            })}
          </Typography>
        </DialogContent>
        <DialogActions>
          <MButton
            onClick={onClose}
            autoFocus
            endIcon={<ThumbUpOutlinedIcon />}
            label={'Got it'}
            color={'primary'}
          />
        </DialogActions>
      </Dialog>
    </div>
  )
}
