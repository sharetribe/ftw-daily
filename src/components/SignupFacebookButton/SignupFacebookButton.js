import React, { Component} from 'react';
import { FacebookProvider, LoginButton } from 'react-facebook';
import { IconSocialMediaFacebookRegister }from  '../../components';
import { singupFacebook } from '../../ducks/Auth.duck';
import { connect } from 'react-redux';
import PropTypes, { object, shape } from 'prop-types';
import { withRouter} from 'react-router-dom';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { TopbarContainerComponent } from '../../containers/TopbarContainer/TopbarContainer';
import css from '../LoginFacebookButton/LoginFacebookButton.css'

 class SignupFacebookButton extends Component {
  handleResponse = async (data) => {
    await this.props.onSingupFacebook(data)
  }
  fb = () => window.FB.login();
  handleError =async (error) => {
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

TopbarContainerComponent.defaultProps = {
};
const { func } = PropTypes;
SignupFacebookButton.propTypes = {
  onSingupFacebook: func.isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({ state: object }).isRequired,
}
const mapStateToProps = state => {
  return {state}
}
const mapDispatchToProps = dispatch => ({
  onSingupFacebook: data => dispatch(singupFacebook(data))
});

const SignupFacebook = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(SignupFacebookButton)

export default SignupFacebook

//775202643249383
//office@horsedeal24.com
//280275153413098
//naytilys685@gmail.com
