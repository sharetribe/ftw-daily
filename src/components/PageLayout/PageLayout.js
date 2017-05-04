import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { union, without } from 'lodash';
import classNames from 'classnames';
import { Topbar } from '../../containers';

import css from './PageLayout.css';

const scrollToTop = () => {
  // Todo: this might need fine tuning later
  window.scrollTo(0, 0);
};

class PageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { pageClassNames: '' };
    this.togglePageClassNames = this.togglePageClassNames.bind(this);
  }

  componentDidMount() {
    this.historyUnlisten = this.props.history.listen(() => scrollToTop());
  }

  componentWillUnmount() {
    if (this.historyUnlisten) {
      this.historyUnlisten();
    }
  }

  // This function makes it possible to change page level styles
  // E.g. disable scrolling when using Modal
  togglePageClassNames(className, addClass = true) {
    this.setState(prevState => {
      const prevPageClassNames = prevState.pageClassNames.split(' ');
      const pageClassNames = addClass
        ? union(prevPageClassNames, [className]).join(' ')
        : without(prevPageClassNames, className).join(' ');

      return { pageClassNames };
    });
  }

  render() {
    const { className, title, children, authInfoError, logoutError, history, location } = this.props;
    const topbarProps = { history, location, togglePageClassNames: this.togglePageClassNames };

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
      <div className={classNames(css.root, this.state.pageClassNames, className)}>
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
        <Topbar {...topbarProps} />
        <div className={css.content}>
          {children}
        </div>
      </div>
    );
  }
}

const { any, string, instanceOf, func, shape } = PropTypes;

PageLayout.defaultProps = { className: '', children: null, authInfoError: null, logoutError: null };

PageLayout.propTypes = {
  className: string,
  title: string.isRequired,
  children: any,
  authInfoError: instanceOf(Error),
  logoutError: instanceOf(Error),

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
