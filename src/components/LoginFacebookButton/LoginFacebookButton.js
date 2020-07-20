import React, { Component} from 'react';
import { FacebookProvider, LoginButton } from 'react-facebook';
import { IconSocialMediaFacebookRegister } from  '../../components'
import { loginFacebook,} from '../../ducks/Auth.duck';
import PropTypes, { object, shape } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import css from './LoginFacebookButton.css'

class LoginFacebookButton extends Component {
  handleResponse = async (data) => {
    await this.props.onLoginFacebook(data)}
  fb = () =>window.FB.login();
  handleError = (error) => {
    //this.fb()
    this.setState({ error });
}

  render() {
    return (
      <FacebookProvider appId="280275153413098">
        <div className={css.loginBtn__box}>
          <LoginButton
            scope="naytilys685@gmail.com"
            onCompleted={this.handleResponse}
            onError={this.handleError}
            className={css.login__facebook}
          >
            <IconSocialMediaFacebookRegister />
          </LoginButton>
        </div>
      </FacebookProvider>
    )
  }
}
const { func } = PropTypes;
LoginFacebookButton.propTypes = {
  onLoginFacebook: func.isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({ state: object }).isRequired,
}
const mapStateToProps = state => {
  return {state}
}
const mapDispatchToProps = dispatch => ({
  onLoginFacebook: data => dispatch(loginFacebook(data))
});

const LoginFacebook = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(LoginFacebookButton)

export default LoginFacebook

//775202643249383
//office@horsedeal24.com
//280275153413098
//naytilys685@gmail.com
