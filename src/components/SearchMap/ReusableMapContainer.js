import React from 'react';
import ReactDOM from 'react-dom';
import { node, string } from 'prop-types';
import mapValues from 'lodash/mapValues';
import { IntlProvider } from 'react-intl';
import messages from '../../translations/en.json';
import config from '../../config';

import css from './SearchMap.css';

/**
 * ReusableMapContainer makes Google Map usage more effective. This improves:
 * - Performance: no need to load dynamic map every time user enters the search page view on SPA.
 * - Efficient Google Maps usage: less unnecessary calls to instantiate a dynamic map.
 * - Reaction to a bug when removing Google Map instance
 *   https://issuetracker.google.com/issues/35821412
 */
class ReusableMapContainer extends React.Component {
  constructor(props) {
    super(props);

    if (typeof window !== 'undefined') {
      window.reusableSearchMapElement =
        window.reusableSearchMapElement || document.createElement('div');

      if (!props.className) {
        console.warn('ReusableMapContainer should get className prop which defines its layout');
      }
      // If no className is given, we use some defaults, which makes it easier to debug loading.
      const mapLayoutClassName = props.className || css.defaultMapLayout;

      this.el = window.reusableSearchMapElement;
      this.el.id = 'search-map';
      this.el.classList.add(mapLayoutClassName);
    }

    this.mountNode = null;
    this.renderSearchMap = this.renderSearchMap.bind(this);
  }

  componentDidMount() {
    this.renderSearchMap();
  }

  componentDidUpdate() {
    this.renderSearchMap();
  }

  componentWillUnmount() {
    this.el.classList.add(css.reusableMapHidden);
    this.mountNode.removeChild(this.el);
    document.body.appendChild(this.el);
  }

  renderSearchMap() {
    // Prepare rendering child (MapWithGoogleMap component) to new location
    // We need to add translations (IntlProvider) for map overlay components
    //
    // NOTICE: Children rendered with ReactDOM.render doesn't have Router access
    // You need to provide onClick functions and URLs as props.
    const renderChildren = () => {
      const isTestEnv = process.env.NODE_ENV === 'test';

      // Locale should not affect the tests. We ensure this by providing
      // messages with the key as the value of each message.
      const testMessages = mapValues(messages, (val, key) => key);
      const localeMessages = isTestEnv ? testMessages : messages;

      const children = (
        <IntlProvider locale={config.locale} messages={localeMessages}>
          {this.props.children}
        </IntlProvider>
      );

      // Render children to created element
      ReactDOM.render(children, this.el);
    };

    const targetDomNode = document.getElementById(this.el.id);

    // Check if we have already added map somewhere on the DOM
    if (!targetDomNode) {
      if (this.mountNode && !this.mountNode.firstChild) {
        // If mountable, but not yet mounted, append rendering context inside SPA rendering tree.
        this.mountNode.appendChild(this.el);
      } else if (!this.mountNode) {
        // if no mountNode is found, append this outside SPA rendering tree (to document body)
        document.body.appendChild(this.el);
      }
      renderChildren();
    } else {
      this.el.classList.remove(css.reusableMapHidden);

      if (this.mountNode && !this.mountNode.firstChild) {
        // Move the map to correct location if we have rendered the map before
        // (but it's not yet moved to correct location of rendering tree).
        document.body.removeChild(this.el);
        this.mountNode.appendChild(this.el);

        // render children and call reattach
        renderChildren();
        this.props.onReattach();
      } else {
        renderChildren();
      }
    }
  }

  render() {
    return (
      <div
        className={css.reusableMap}
        ref={node => {
          this.mountNode = node;
        }}
      />
    );
  }
}

ReusableMapContainer.defaultProps = {
  className: string,
};

ReusableMapContainer.propTypes = {
  children: node.isRequired,
  className: string,
};

export default ReusableMapContainer;
