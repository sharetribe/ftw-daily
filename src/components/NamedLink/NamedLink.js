/**
 * This component wraps React-Router's Link by providing name-based routing.
 * This is also special component that gets routes from context.
 * (Helps to narrow down the scope of possible format changes to routes.)
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { pathByRouteName } from '../../routesConfiguration';

const NamedLink = (props, context) => {
  const { name, params, search, hash, state, ...rest } = props;
  const pathname = pathByRouteName(name, context.routes, params);
  const locationDescriptor = { pathname, search, hash, state };
  return <Link to={locationDescriptor} {...rest} />;
};

const { array, object, string } = PropTypes;

NamedLink.contextTypes = { routes: array };

NamedLink.defaultProps = { hash: '', params: {}, search: '', state: {} };

NamedLink.propTypes = {
  hash: string,
  name: string.isRequired,
  params: object,
  search: string,
  state: object,
};

export default NamedLink;
