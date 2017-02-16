/**
 * This component wraps React-Router's Link by providing name-based routing.
 * (Helps to narrow down the scope of possible format changes to routes.)
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { pathByRouteName, withFlattenedRoutes } from '../../util/routes';
import * as propTypes from '../../util/propTypes';

const NamedLink = props => {
  const { name, search, hash, state, params, flattenedRoutes, ...rest } = props;
  const pathname = pathByRouteName(name, flattenedRoutes, params);
  const locationDescriptor = { pathname, search, hash, state };
  return <Link to={locationDescriptor} {...rest} />;
};

const { arrayOf, object, string } = PropTypes;

NamedLink.defaultProps = { search: '', hash: '', state: {}, params: {} };

NamedLink.propTypes = {
  name: string.isRequired,
  search: string,
  hash: string,
  state: object,
  params: object,
  flattenedRoutes: arrayOf(propTypes.route).isRequired,
};

export default withFlattenedRoutes(NamedLink);
