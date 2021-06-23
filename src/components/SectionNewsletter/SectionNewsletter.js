import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import {NewsletterForm } from '../../forms';

import { signupInProgress, signup } from '../../ducks/Newsletter.duck';

import css from './SectionNewsletter.module.css';
import HubspotForm from "react-hubspot-form";

export class SectionNewsletterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedupModalOpen: false,
      fakeIsLoading: false,
    };
  }

  render () {
    const {
      isSignedUp,
      signupError,
      inProgress,
      signedupEmail,
      submitSignup,
      rootClassName,
      className
    } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    // NOTE manually reseting the border bottom, stops it from being controlled by the validation
    const resetInputValidation = () => {
      const inputField = document.getElementById('email');
      inputField.style.borderBottomColor = '#EDC56E';
      const formEl = document.getElementById('nl-form')
      const inputElements = formEl.children[0].children[0].children;
      if (inputElements.length === 2) {
        inputElements[1].innerText = '';
      }
    }

    // TODO need to fix this, this is a temporary hacked workaround
    // mailchimp doesn't accept cors requests, and its a pain...
    // right now faking the loading, pretending it worked without checking response,
    // bc bug in reqwests library... NEED to find a better solution
    const handleNewsletterSignup = values => {
      this.setState({fakeIsLoading: true});
      const timer_id = setTimeout(() => {
        this.setState({fakeIsLoading: false});
        resetInputValidation()
      }, 1250);

      submitSignup({email: values.newsletterEmail.trim()});
    };

    return (
      <div className={classes}>
        <div className={css.container}>
          <div className={css.title}>
            <FormattedMessage id="SectionNewsletter.title" />
          </div>
          <div className={css.txtDiv} >
            <p>
              <FormattedMessage id="SectionNewsletter.text"/>
            </p>
          </div>
          <div className={css.formDiv}>
            <HubspotForm
              portalId={8743306}
              formId={'bf888011-6e5e-4728-a0ca-6f2cae2a2373'}
              onSubmit={() => console.log('Submit!')}
              onReady={(form) => console.log('Form ready!')}
              loading={<div>Loading...</div>}
              cssRequired='
                input.hs-input {width: 100%}
                .inputs-list label.hs-error-msg {margin-top: 10px;font-size: 16px;}

                .no-list.hs-error-msgs .hs-main-font-element {display: none;}

                .hs_email.hs-email {margin-bottom: 0;}
              '
              // errorMessageClass='small'
            />
            {/*<NewsletterForm*/}
            {/*  className={css.form}*/}
            {/*  onSubmit={handleNewsletterSignup}*/}
            {/*  inProgress={this.state.fakeIsLoading}*/}
            {/*  // onOpenTermsOfService={() => this.setState({ tosModalOpen: true })}*/}
            {/*/>*/}
          </div>
        </div>
      </div>
    );
  }
};

SectionNewsletterComponent.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionNewsletterComponent.propTypes = {
  rootClassName: string,
  className: string,
};

const mapStateToProps = state => {
  const { isSignedUp, signupError, inProgress, email } = state.Newsletter;
  return {
    isSignedUp,
    signupError,
    inProgress,
    signedupEmail: email
  };
};

const mapDispatchToProps = dispatch => ({
  submitSignup: ({ email }) => dispatch(signup(email)),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const SectionNewsletter = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
)(SectionNewsletterComponent);

export default SectionNewsletter;
