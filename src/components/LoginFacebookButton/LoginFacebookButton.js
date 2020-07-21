import React, { Component} from 'react';
import  FacebookLogin from 'react-facebook-login';
import { IconSocialMediaFacebookRegister} from '../../components';
import { loginFacebook,} from '../../ducks/Auth.duck';
import PropTypes, { object, shape } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import css from './LoginFacebookButton.css'
class LoginFacebookButton extends Component {
    state={
      isLoggedIn: false,
      userId: '',
      name: '' ,
      email:'',
    }

  componentClicked = async () => {}
  responseFacebook = async(res ) => {
    if( res.status !== 'unknown') {
      await this.props.onLoginFacebook(res)
    }
  }
  render() {
    return (
      <>
        <div className={css.line_oder}><p>oder</p></div>
        <FacebookLogin
            textButton="Login mit Facebook"
            appId={process.env.FACEBOOK_ID_APP}
            autoLoad={false}
            fields="name,email,id"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
            cssClass={css.login_facebook}
            icon={<IconSocialMediaFacebookRegister/>}
        />
      </>
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



