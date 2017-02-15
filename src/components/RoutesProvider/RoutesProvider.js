import React, { Component, PropTypes } from 'react';
import * as propTypes from '../../util/propTypes';

class RoutesProvider extends Component {
  getChildContext() {
    return { flattenedRoutes: this.props.flattenedRoutes };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

const { arrayOf, node } = PropTypes;

RoutesProvider.childContextTypes = { flattenedRoutes: arrayOf(propTypes.route).isRequired };

RoutesProvider.defaultProps = { children: {} };

RoutesProvider.propTypes = { flattenedRoutes: arrayOf(propTypes.route).isRequired, children: node };

export default RoutesProvider;
