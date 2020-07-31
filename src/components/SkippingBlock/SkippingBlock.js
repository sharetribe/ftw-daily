import React, { useState } from 'react';
import {  func } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { propTypes } from '../../util/types';
import { isStripeInvalidPostalCode, isStripeError } from '../../util/errors';
import * as validators from '../../util/validators';
import { Button,  Modal } from '../../components';
import { manageDisableScrolling} from '../../ducks/UI.duck';
import css from './../../forms/PayoutDetailsForm/PayoutDetailsForm.css';
import { Redirect, withRouter } from 'react-router-dom';
import { redirectState, publicDraft } from '../../ducks/stripe.duck';
import { connect } from 'react-redux';


function  SkippingBlockComponent  (props)  {
  const [showMissingInformationReminder, setShowMissingInformationReminder] = useState(null)
  const [hasSeenMissingInformationReminder, setHasSeenMissingInformationReminder]= useState(true)
  const{ closeButtonMessage, containerClassName, onManageDisableScrolling, redirect, submitButtonText } = props


  return (
    <Modal
      id="MissingInformationReminder"
      containerClassName={containerClassName}
      isOpen={!!showMissingInformationReminder}
      onClose={() => {
        this.setState({
          showMissingInformationReminder: null,
          hasSeenMissingInformationReminder: true,
        });
      }}
      onManageDisableScrolling={onManageDisableScrolling}
      closeButtonMessage={closeButtonMessage}
    >
      {/*redirect ? <Redirect to='/account/payments'/> :*/}
      <div className={css.sectionContainer}>
        <Button
          type="submit"
          onClick={()=>props.onRedirectState()}>
          {submitButtonText ? (
            submitButtonText
          ) : (
            <FormattedMessage id="PayoutDetailsForm.submitButtonText" />
          )}
        </Button>
        <Button
          className={css.greyButton}
          type="submit"
          onClick={()=>props.onRedirectState()}

        >
          {submitButtonText ? (
            submitButtonText
          ) : (
            <FormattedMessage
              id="PayoutDetailsForm.laterButtonText" />
          )}
        </Button>
      </div>
    </Modal>


  )

}



SkippingBlockComponent.defaultProps = {
  submitButtonText: null,
  redirect: false,
};

SkippingBlockComponent.propTypes = {

  onRedirectState: func.isRequired,
  onManageDisableScrolling: func.isRequired,
};
const mapStateToProps = state => {
  return {
    redirect: state.stripe.redirect,
  };
};
const mapDispatchToProps = dispatch => ({

  onRedirectState: () => dispatch(redirectState()),
  onManageDisableScrolling: (id ) => dispatch(manageDisableScrolling(id ,true) ),
});
const SkippingBlock = compose(withRouter, connect(
  mapStateToProps,
  mapDispatchToProps,
))(SkippingBlockComponent);

export default SkippingBlock;
