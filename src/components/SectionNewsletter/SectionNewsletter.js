import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import {NewsletterForm } from '../../forms';

import { signupInProgress, signup } from '../../ducks/Newsletter.duck';

import css from './SectionNewsletter.css';

export class SectionNewsletterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { signedupModalOpen: false };
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

    const handleNewsletterSignup = values => {
      const { newsletterEmail } = values;
      submitSignup({email: newsletterEmail.trim()});
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
            <NewsletterForm
              className={css.form}
              onSubmit={handleNewsletterSignup}
              inProgress={inProgress}
              // onOpenTermsOfService={() => this.setState({ tosModalOpen: true })}
            />
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
