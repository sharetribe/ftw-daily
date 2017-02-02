import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Topbar } from '../../containers';

const scrollToTop = () => {
  // Todo: this might need fine tuning later
  window.scrollTo(0, 0);
};

class PageLayout extends Component {
  componentDidMount() {
    this.historyUnlisten = this.context.history.listen(() => scrollToTop());
  }

  componentWillUnmount() {
    this.historyUnlisten();
  }

  render() {
    const { className, title, children, loginError, logoutError } = this.props;
    // TODO: use FlashMessages for loginError/logoutError
    return (
      <div className={className}>
        <Helmet title={title} />
        {loginError ? <p style={{ color: 'red' }}>Error in login: {loginError}</p> : null}
        {logoutError ? <p style={{ color: 'red' }}>Error in logout: {logoutError}</p> : null}
        <Topbar />
        <h1>{title}</h1>
        {children}
      </div>
    );
  }
}

const { any, object, string } = PropTypes;

PageLayout.contextTypes = { history: object };

PageLayout.defaultProps = { className: '', children: null, loginError: '', logoutError: '' };

PageLayout.propTypes = {
  className: string,
  title: string.isRequired,
  children: any,
  loginError: string,
  logoutError: string,
};

const mapStateToProps = state => ({
  loginError: state.Auth.loginError,
  logoutError: state.Auth.logoutError,
});

export default connect(mapStateToProps)(PageLayout);
