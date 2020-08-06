import React, { useEffect, useState } from 'react';
import {  func } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage } from '../../util/reactIntl';

import { Button,  Modal } from '../../components';
import { manageDisableScrolling} from '../../ducks/UI.duck';
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

const later = (history) =>{
  const path = pathByRouteName('PayoutPreferencesPage', routeConfiguration())
  history.push(path)
}

function  SkippingBlockComponent  (props)  {
  const{ closeButtonMessage, onManageDisableScrolling, onRedirectState, onRequestStripeAccount, redirect, stripeAccountCreated, stripeAccountCreatedShow, onStripeAccountShowWindow, submitButtonText, history } = props
 const [hasSeenMissingInformationReminder, setHasSeenMissingInformationReminder]= useState(null)

  useEffect( () => {
    onRequestStripeAccount()
    }, [])
  return (
    <>
      {redirect ? later(history) :(
    <Modal
      cssClassBackground={css.SkippingBlock_background }
      id="MissingInformationReminder"
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
        <h1 >
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
    </Modal>)}
      </>
  )
}

SkippingBlockComponent.defaultProps = {
  submitButtonText: null,
  redirect: false,
};

SkippingBlockComponent.propTypes = {
  onRedirectState: func.isRequired,
  onRequestStripeAccount: func.isRequired,
  onStripeAccountCreatedState: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onStripeAccountShowWindow: func.isRequired,
};
const mapStateToProps = state => {
  return {
    redirect: state.stripe.redirect,
    stripeAccountCreatedShow: state.stripe.stripeAccountCreatedShow,
    stripeAccountCreated: state.stripe.stripeAccountCreated,
  };
};
const mapDispatchToProps = dispatch => ({
  onRedirectState: () => dispatch(redirectState()),
  onStripeAccountShowWindow: (state) => dispatch(stripeAccountShowWindow(state)),
  onStripeAccountCreatedState: (state) => dispatch(stripeAccountCreatedState(state)),
  onRequestStripeAccount: () => dispatch(requestStripeAccount()),
  onManageDisableScrolling: (id ) => dispatch(manageDisableScrolling(id ,true)),
});
const SkippingBlock = compose(withRouter, connect(
  mapStateToProps,
  mapDispatchToProps,
))(SkippingBlockComponent);

export default SkippingBlock;
