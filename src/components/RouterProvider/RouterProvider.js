import React, { Component, PropTypes } from 'react';

class RouterProvider extends Component {
  getChildContext() {
    return { router: this.props.router };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

const { any, node, object } = PropTypes;

RouterProvider.childContextTypes = { router: object };

RouterProvider.defaultProps = { children: {} };

RouterProvider.propTypes = { router: any.isRequired, children: node };

export default RouterProvider;
