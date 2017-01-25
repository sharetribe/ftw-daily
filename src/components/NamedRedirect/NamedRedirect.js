import React, { PropTypes } from 'react';
import { Redirect } from 'react-router';
import { pathByRouteName } from '../../routesConfiguration';

const NamedRedirect = (props, context) => {
  const { name, params, query, hash, state, ...rest } = props;
  const pathname = pathByRouteName(name, context.routes, params);
  const locationDescriptor = { pathname, query, hash, state };
  return <Redirect to={locationDescriptor} {...rest} />;
};

const { array, object, string } = PropTypes;

NamedRedirect.contextTypes = { routes: array };

NamedRedirect.defaultProps = { hash: '', params: {}, query: {}, state: {} };

NamedRedirect.propTypes = {
  hash: string,
  name: string.isRequired,
  params: object,
  query: object,
  state: object,
};

export default NamedRedirect;
