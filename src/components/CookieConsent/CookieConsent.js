import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import { ExternalLink } from '../../components';
import classNames from 'classnames';

import css from './CookieConsent.module.css';

class CookieConsent extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.onAcceptCookies = this.onAcceptCookies.bind(this);
    this.saveCookieConsent = this.saveCookieConsent.bind(this);
  }

  componentDidMount() {
    const cookies = document.cookie.split('; ').reduce((acc, c) => {
      const [name, value] = c.split('=');
      return { ...acc, [name]: decodeURIComponent(value) };
    }, {});

    if (cookies.euCookiesAccepted !== '1') {
      this.setState({ show: true });
    }
  }

  onAcceptCookies() {
    this.saveCookieConsent();
    this.setState({ show: false });
  }

  saveCookieConsent() {
    // We create date object and modify it to show date 10 years into the future.
    let expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 10);
    // Save the cookie with expiration date
    document.cookie = 'euCookiesAccepted=1; path=/; expires=' + expirationDate.toGMTString();
  }

  render() {
    const { className, rootClassName } = this.props;
    const isServer = typeof window === 'undefined';

    // Server side doesn't know about cookie consent
    if (isServer || !this.state.show) {
      return null;
    } else {
      const cookieLink = (
        <ExternalLink href="https://cookiesandyou.com" className={css.cookieLink}>
          <FormattedMessage id="CookieConsent.cookieLink" />
        </ExternalLink>
      );
      const classes = classNames(rootClassName || css.root, className);

      return (
        <div className={classes}>
          <div className={css.message}>
            <FormattedMessage id="CookieConsent.message" values={{ cookieLink }} />
          </div>
          <button className={css.continueBtn} onClick={this.onAcceptCookies}>
            <FormattedMessage id="CookieConsent.continue" />
          </button>
        </div>
      );
    }
  }
}

const { string } = PropTypes;

CookieConsent.defaultProps = {
  className: null,
  rootClassName: null,
};

CookieConsent.propTypes = {
  className: string,
  rootClassName: string,
};

export default CookieConsent;
