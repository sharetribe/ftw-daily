import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { Topbar } from '../../containers';

import css from './PageLayout.css';

const scrollToTop = () => {
  // Todo: this might need fine tuning later
  window.scrollTo(0, 0);
};

class PageLayout extends Component {
  componentDidMount() {
    this.historyUnlisten = this.props.listen(() => scrollToTop());
  }

  componentWillUnmount() {
    if (this.historyUnlisten) {
      this.historyUnlisten();
    }
  }

  render() {
    const { className, title, children, authInfoError, logoutError } = this.props;

    // TODO: use FlashMessages for auth errors

    /* eslint-disable no-console */
    if (authInfoError && console && console.error) {
      console.error(authInfoError);
    }
    if (logoutError && console && console.error) {
      console.error(logoutError);
    }
    /* eslint-enable no-console */

    return (
      <div className={classNames(css.root, className)}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {authInfoError
          ? <div style={{ color: 'red' }}>
              <FormattedMessage id="PageLayout.authInfoFailed" />
            </div>
          : null}
        {logoutError
          ? <div style={{ color: 'red' }}>
              <FormattedMessage id="PageLayout.logoutFailed" />
            </div>
          : null}
        <Topbar />
        <div className={css.content}>
          {children}
        </div>
      </div>
    );
  }
}

const { any, string, instanceOf, func } = PropTypes;

PageLayout.defaultProps = { className: '', children: null, authInfoError: null, logoutError: null };

PageLayout.propTypes = {
  className: string,
  title: string.isRequired,
  children: any,
  authInfoError: instanceOf(Error),
  logoutError: instanceOf(Error),
  // history.listen function from withRouter
  listen: func.isRequired,
};

const mapStateToProps = state => ({
  authInfoError: state.Auth.authInfoError,
  logoutError: state.Auth.logoutError,
});

export default connect(mapStateToProps)(withRouter(PageLayout));
