/**
 * This component wraps React-Router's Redirect by providing name-based routing.
 * (Helps to narrow down the scope of possible format changes to routes.)
 */
import React, { PropTypes } from 'react';
import { Redirect } from 'react-router-dom';
import { pathByRouteName } from '../../util/routes';
import { withFlattenedRoutes } from '../../util/contextHelpers';
import * as propTypes from '../../util/propTypes';

const NamedRedirect = props => {
  const { name, search, state, params, flattenedRoutes, push } = props;
  const pathname = pathByRouteName(name, flattenedRoutes, params);
  return <Redirect to={{ pathname, search, state }} push={push} />;
};

const { arrayOf, object, string, bool } = PropTypes;

NamedRedirect.defaultProps = { search: '', state: {}, push: false, params: {} };

NamedRedirect.propTypes = {
  name: string.isRequired,
  search: string,
  state: object,
  push: bool,
  params: object,
  flattenedRoutes: arrayOf(propTypes.route).isRequired,
};

export default withFlattenedRoutes(NamedRedirect);
