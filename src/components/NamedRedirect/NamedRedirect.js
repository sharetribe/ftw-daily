/**
 * This component wraps React-Router's Redirect by providing name-based routing.
 * This is also special component that gets routes from context.
 * (Helps to narrow down the scope of possible format changes to routes.)
 */
import React, { PropTypes } from 'react';
import { Redirect } from 'react-router-dom';
import { pathByRouteName } from '../../routesConfiguration';

const NamedRedirect = (props, context) => {
  const { name, params, search, state, ...rest } = props;
  const pathname = pathByRouteName(name, context.routes, params);
  const locationDescriptor = { pathname, search, state };
  return <Redirect to={locationDescriptor} {...rest} />;
};

const { array, object, string } = PropTypes;

NamedRedirect.contextTypes = { routes: array };

NamedRedirect.defaultProps = { params: {}, search: {}, state: {} };

NamedRedirect.propTypes = {
  name: string.isRequired,
  params: object,
  search: string,
  state: object,
};

export default NamedRedirect;
