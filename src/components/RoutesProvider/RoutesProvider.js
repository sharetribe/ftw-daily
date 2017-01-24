import React, { Component, PropTypes } from 'react';

class RoutesProvider extends Component {
  getChildContext() {
    return { routes: this.props.routes };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

const { array, node } = PropTypes;

RoutesProvider.childContextTypes = { routes: array };

RoutesProvider.defaultProps = { children: {} };

RoutesProvider.propTypes = { routes: array.isRequired, children: node };

export default RoutesProvider;
