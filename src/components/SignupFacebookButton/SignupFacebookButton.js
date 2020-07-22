import React, { Component} from 'react';
import { IconSocialMediaFacebookRegister }from  '../../components';
import { singupFacebook } from '../../ducks/Auth.duck';
import { connect } from 'react-redux';
import PropTypes, { object, shape } from 'prop-types';
import { withRouter} from 'react-router-dom';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { TopbarContainerComponent } from '../../containers/TopbarContainer/TopbarContainer';
import css from '../LoginFacebookButton/LoginFacebookButton.css'
import FacebookLogin from 'react-facebook-login';

 class SignupFacebookButton extends Component {
   state={
     isLoggedIn: false,
     userId: '',
     name: '' ,
     email:'',
   }

   componentClicked = async () => {}

   responseFacebook = async(res ) => {
     if (res.status !== 'unknown') {
     await this.props.onSingupFacebook(res)
   }
   }
   render() {
     return (
       <>
         <div className={css.line_oder}><p>oder</p></div>
         <FacebookLogin
           textButton="Login mit Facebook"
           appId={config.facebookAppId}
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

