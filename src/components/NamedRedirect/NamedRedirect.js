/**
 * This component wraps React-Router's Redirect by providing name-based routing.
 * (Helps to narrow down the scope of possible format changes to routes.)
 */
import React, { PropTypes } from 'react';
import { Redirect } from 'react-router-dom';
import { pathByRouteName, withFlattenedRoutes } from '../../util/routes';
import * as propTypes from '../../util/propTypes';

const NamedRedirect = props => {
  const { name, search, state, params, flattenedRoutes, ...rest } = props;
  const pathname = pathByRouteName(name, flattenedRoutes, params);
  const locationDescriptor = { pathname, search, state };
  return <Redirect to={locationDescriptor} {...rest} />;
};

const { arrayOf, object, string } = PropTypes;

NamedRedirect.defaultProps = { search: '', state: {}, params: {} };

NamedRedirect.propTypes = {
  name: string.isRequired,
  search: string,
  state: object,
  params: object,
  flattenedRoutes: arrayOf(propTypes.route).isRequired,
};

export default withFlattenedRoutes(NamedRedirect);
