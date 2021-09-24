import React from 'react';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import css from '../../components/BookingBreakdown/BookingBreakdown.module.css';
import { bool, func, string, any, object } from 'prop-types';
import { SocialLoginButton } from '../../components';


const DialogWindow = props => {
const {open, handleClose, error, intl, handleSubmit, handleChange, promocode} = props;
  return (
    <React.Fragment>
      <Dialog 
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
        <FormattedMessage id="BookingBreakdown.setPromocode" />
        </DialogTitle>
        <DialogContent>
          <input className={css.inputDialog} type="text" value={promocode} onChange={handleChange} />
          {error ? <span>{error}</span>: null}
          <div className={css.buttonDisc}>
          <SocialLoginButton onClick={()=> handleSubmit()}>Submit</SocialLoginButton>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
};

DialogWindow.propTypes = {
    open: bool.isRequired,
    handleClose: func,
    handleSubmit: func,
    handleChange: func,
    promocode: string,
    error: object,
    intl: intlShape,
};

export default DialogWindow;
