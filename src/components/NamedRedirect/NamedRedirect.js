/**
 * This component wraps React-Router's Redirect by providing name-based routing.
 * This is also special component that gets routes from context.
 * (Helps to narrow down the scope of possible format changes to routes.)
 */
import React, { PropTypes } from 'react';
import { Redirect } from 'react-router-dom';
import { pathByRouteName } from '../../util/routes';
import * as propTypes from '../../util/propTypes';

const NamedRedirect = (props, context) => {
  const { name, search, state, params, ...rest } = props;
  const { flattenedRoutes } = context;
  const pathname = pathByRouteName(name, flattenedRoutes, params);
  const locationDescriptor = { pathname, search, state };
  return <Redirect to={locationDescriptor} {...rest} />;
};

const { arrayOf, object, string } = PropTypes;

NamedRedirect.contextTypes = { flattenedRoutes: arrayOf(propTypes.route).isRequired };

NamedRedirect.defaultProps = { search: '', state: {}, params: {} };

NamedRedirect.propTypes = {
  name: string.isRequired,
  search: string,
  state: object,
  params: object,
};

export default NamedRedirect;
