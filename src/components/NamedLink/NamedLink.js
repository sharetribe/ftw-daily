/**
 * This component wraps React-Router's Link by providing name-based routing.
 * This is also special component that gets routes from context.
 * (Helps to narrow down the scope of possible format changes to routes.)
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { pathByRouteName } from '../../util/routes';
import * as propTypes from '../../util/propTypes';

const NamedLink = (props, context) => {
  const { name, search, hash, state, params, ...rest } = props;
  const { flattenedRoutes } = context;
  const pathname = pathByRouteName(name, flattenedRoutes, params);
  const locationDescriptor = { pathname, search, hash, state };
  return <Link to={locationDescriptor} {...rest} />;
};

const { arrayOf, object, string } = PropTypes;

NamedLink.contextTypes = { flattenedRoutes: arrayOf(propTypes.route).isRequired };

NamedLink.defaultProps = { search: '', hash: '', state: {}, params: {} };

NamedLink.propTypes = {
  name: string.isRequired,
  search: string,
  hash: string,
  state: object,
  params: object,
};

export default NamedLink;
