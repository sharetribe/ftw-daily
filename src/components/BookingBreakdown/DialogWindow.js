import React from 'react';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import css from './BookingBreakdown.module.css';
import { bool, func, string, any, object } from 'prop-types';
import { SocialLoginButton } from '../../components';


const DialogWindow = props => {
const {open, handleClose, error, handleSubmit, handleChange, intl, promocode} = props;
const label = intl.formatMessage({
    id: 'BookingBreakdown.setPromocode',
  });
  return (
    <div >
      <Dialog 
      className={css.dialogWindow}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            {label}
        {/* <FormattedMessage id="BookingBreakdown.setPromocode" /> */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <input className={css.inputDialog} type="text" value={promocode} onChange={handleChange} />
          {error ? <p>{error}</p>: null}
          <div className={css.buttonDisc}>
          <SocialLoginButton onClick={handleSubmit}>Submit</SocialLoginButton>
          </div>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  )
};

DialogWindow.propTypes = {
    open: bool.isRequired,
    handleClose: func.isRequired,
    handleSubmit: func.isRequired,
    handleChange: func.isRequired,
    promocode: string,
    error: object,
    intl: intlShape.isRequired,
};

export default DialogWindow;
