/**
 * This component wraps React-Router's Link by providing name-based routing.
 * This is also special component that gets routes from context.
 * (Helps to narrow down the scope of possible format changes to routes.)
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { pathByRouteName } from '../../routesConfiguration';

const NamedLink = (props, context) => {
  const { name, params, query, hash, state, ...rest } = props;
  const pathname = pathByRouteName(name, context.routes, params);
  const locationDescriptor = { pathname, query, hash, state };
  return <Link to={locationDescriptor} {...rest} />;
};

const { array, object, string } = PropTypes;

NamedLink.contextTypes = { routes: array };

NamedLink.defaultProps = { hash: '', params: {}, query: {}, state: {} };

NamedLink.propTypes = {
  hash: string,
  name: string.isRequired,
  params: object,
  query: object,
  state: object,
};

export default NamedLink;
