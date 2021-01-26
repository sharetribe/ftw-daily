import React, { Component } from 'react';
import { compose } from 'redux';
import { injectIntl } from '../../util/reactIntl';
import { Modal, Form, PrimaryButton } from '../../components';

import css from './SMSVerificationForm.css';

class SMSVerificationFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      error: '',
    }
  }

  handleSubmit = () => {
    const params = { phoneNumber: this.props.currentPhoneNumber, phoneVerified: true };
    this.props.onVerifyPhoneNumber(params);
    this.props.onCloseVerificationModal();
  }

  handleChange = (e) => {
    this.setState({code: e.target.value, error: ''});
    if(e.target.value.length > 6){
      this.setState({error: 'Code must be 6 digits'});
    }else if ((e.target.value.length == 6) && (parseInt(e.target.value) !== this.props.verificationCode)) {
      this.setState({error: "Code doesn't match"});
    }
  }

  handleReSendOtp = (phoneNumber) => {
    this.props.onResendVerificationOtp(phoneNumber);
  }

  render() {
    const {showVerificationModal, onCloseVerificationModal, onManageDisableScrolling, currentPhoneNumber, sendVerificationOtpError, sendVerificationOtpInProgress} = this.props;
    console.log('sendVerificationOtpInProgress', sendVerificationOtpInProgress);
    const { code, error } = this.state;
    const disabled = code.length < 6 || error !== '';
    return (
      <Modal
        id="phoneVerificationModal"
        isOpen={showVerificationModal}
        onClose={onCloseVerificationModal}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <h1 className={css.modalTitle}>
          Geben Sie den Bestätigungscode ein
        </h1>
        <p className={css.modalMessage}>
          <span>Wir haben Ihnen einen Bestätigungscode an {currentPhoneNumber} gesendet.</span>
        </p>
        <Form
          className={css.SMSVerificationForm}
        >
          <div className={css.contactDetailsSection}>
            <label>6-digit verification code</label>
            <input type="text" maxLength="10" name="otp" placeholder="e.g. 123456" value={code} onChange={(e)=> this.handleChange(e)}/>
          </div>
          <p className={css.error}>{error}</p>
          <div className={css.helpText}>
            <span>
              Didn't get the code?
              <span className={css.resendOptions}>
                <a onClick={()=> this.handleReSendOtp(currentPhoneNumber)}> Resend to {currentPhoneNumber}</a> or
                <a onClick={onCloseVerificationModal}> change the number</a>.
              </span>
            </span>
          </div>
          <div className={css.bottomWrapper}>
            <PrimaryButton
              type="button"
              onClick={()=> this.handleSubmit()}
              inProgress={sendVerificationOtpInProgress}
              disabled={disabled}
            >
              Überprüfen Sie die Handynummer
            </PrimaryButton>
          </div>
        </Form>
      </Modal>
    );
  }
}

const SMSVerificationForm = compose(injectIntl)(SMSVerificationFormComponent);

SMSVerificationForm.displayName = 'SMSVerificationForm';

export default SMSVerificationForm;
