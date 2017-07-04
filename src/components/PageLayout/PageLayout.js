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
    this.historyUnlisten = this.props.history.listen(() => scrollToTop());
  }

  componentWillUnmount() {
    if (this.historyUnlisten) {
      this.historyUnlisten();
    }
  }

  render() {
    const {
      className,
      rootClassName,
      title,
      children,
      authInfoError,
      logoutError,
      history,
      location,
      scrollingDisabled,
      topbar,
    } = this.props;
    const topbarProps = { history, location };

    // TODO: use FlashMessages for auth errors

    /* eslint-disable no-console */
    if (authInfoError && console && console.error) {
      console.error(authInfoError);
    }
    if (logoutError && console && console.error) {
      console.error(logoutError);
    }
    /* eslint-enable no-console */

    const classes = classNames(rootClassName || css.root, className, {
      [css.scrollingDisabled]: scrollingDisabled,
    });

    return (
      <div className={classes}>
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
        {topbar || <Topbar {...topbarProps} />}
        <div className={css.content}>
          {children}
        </div>
      </div>
    );
  }
}

const { any, bool, func, instanceOf, node, shape, string } = PropTypes;

PageLayout.defaultProps = {
  className: null,
  rootClassName: null,
  children: null,
  authInfoError: null,
  logoutError: null,
  scrollingDisabled: false,
  topbar: null,
};

PageLayout.propTypes = {
  className: string,
  rootClassName: string,
  title: string.isRequired,
  children: any,
  authInfoError: instanceOf(Error),
  logoutError: instanceOf(Error),
  scrollingDisabled: bool,
  topbar: node,

  // from withRouter
  history: shape({
    listen: func.isRequired,
  }).isRequired,
  location: shape({
    search: string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => {
  const { authInfoError, logoutError } = state.Auth;
  return { authInfoError, logoutError };
};

export default connect(mapStateToProps)(withRouter(PageLayout));
