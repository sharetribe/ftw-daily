import React, { useEffect, useState } from 'react';
import {  func } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage } from '../../util/reactIntl';
import { Button, Modal } from '../../components';
import css from './SkippingBlock.css';
import {withRouter } from 'react-router-dom';
import {
  redirectState,
  requestStripeAccount,
  stripeAccountCreatedState,
  stripeAccountShowWindow,
} from '../../ducks/stripe.duck';
import { connect } from 'react-redux';
import { pathByRouteName } from '../../util/routes';
import routeConfiguration from '../../routeConfiguration';
import { manageDisableScrolling } from '../../ducks/UI.duck';

const later = (history) =>{
  const path = pathByRouteName('PayoutPreferencesPage', routeConfiguration())
  history.push(path)
}

function  SkippingBlock  (props)  {
  const{ closeButtonMessage,
    onManageDisableScrolling,
    onRedirectState,
    onRequestStripeAccount,
    redirect,
    stripeAccountCreated,
    stripeAccountCreatedShow,
    onStripeAccountShowWindow,
    submitButtonText,
    history,
  } = props
  const [hasSeenMissingInformationReminder, setHasSeenMissingInformationReminder]= useState(null)
  useEffect( () => {
    onRequestStripeAccount()
    onStripeAccountShowWindow(true)
    }, [])
  return (
    <>
      {redirect ? later(history) :
    <Modal
      id="MissingInformationStripeReminder"
      containerClassName={css.informationModal}
      isOpen={(!stripeAccountCreated && stripeAccountCreatedShow) }
      onClose={() => {
        onStripeAccountShowWindow(false)
          setHasSeenMissingInformationReminder( !stripeAccountCreated)
      }}
      onManageDisableScrolling={onManageDisableScrolling}
      closeButtonMessage={closeButtonMessage}
    >
      <div className={css.modalBody}>
        <h1 className={css.modalHeader}>
          <FormattedMessage id="EditListingPhotosPanel.payoutModalTitleOneMoreThing" />
          <br />
          <FormattedMessage id="EditListingPhotosPanel.methodGettingMoney" />
        </h1>
        <p >
          <FormattedMessage id="EditListingPhotosPanel.payoutModalInfo" />
        </p>
        <Button
          type="submit"
          onClick={()=>{
            onRedirectState()
          }}>
          {submitButtonText ? (
            submitButtonText
          ) : (
            <FormattedMessage id="PayoutDetailsForm.submitInformationButtonText" />
          )}
        </Button>
        <Button
          className={css.greyButton}
          type="submit"
          onClick={() => {
            onStripeAccountShowWindow(false)
            setHasSeenMissingInformationReminder( !stripeAccountCreated)
          }}
        >
          {submitButtonText ? (
            submitButtonText
          ) : (
            <FormattedMessage
              id="PayoutDetailsForm.laterButtonText" />
          )}
        </Button>
      </div>
    </Modal>}
      </>
  )
}

SkippingBlock.defaultProps = {
  submitButtonText: null,
  redirect: false,
}

SkippingBlock.propTypes = {
  onRedirectState: func.isRequired,
  onRequestStripeAccount: func.isRequired,
  onStripeAccountCreatedState: func.isRequired,
  onStripeAccountShowWindow: func.isRequired,
  onManageDisableScrolling: func.isRequired,
}
const mapStateToProps = state => {
  return {
    emailVerified: state.EmailVerification.isVerified,
    redirect: state.stripe.redirect,
    stripeAccountCreatedShow: state.stripe.stripeAccountCreatedShow,
    stripeAccountCreated: state.stripe.stripeAccountCreated,
  };
}
const mapDispatchToProps = dispatch => ({
  onRedirectState: () => dispatch(redirectState()),
  onStripeAccountShowWindow: (state) => dispatch(stripeAccountShowWindow(state)),
  onStripeAccountCreatedState: (state) => dispatch(stripeAccountCreatedState(state)),
  onRequestStripeAccount: () => dispatch(requestStripeAccount()),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
});
SkippingBlock = compose(withRouter, connect(
  mapStateToProps,
  mapDispatchToProps,
))(SkippingBlock);

export default SkippingBlock;
