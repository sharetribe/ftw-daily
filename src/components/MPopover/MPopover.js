import IconButton from '@material-ui/core/IconButton'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import { IconHelp } from '../../assets/IconHelp'

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  paper: {
    padding: 20,
    maxWidth: 600,
    fontFamily: 'Nunito Sans',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 320
    }
  }
}))

export default (props) => {
  const { content } = props
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <IconButton aria-label="delete" aria-describedby={id} color="primary" onClick={handleClick}>
        <IconHelp style={{ height: 20, width: 20 }}/>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{paper: classes.paper}}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {content}
      </Popover>
    </div>
  )
}
