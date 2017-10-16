/**
 * This component wraps React-Router's Redirect by providing name-based routing.
 * (Helps to narrow down the scope of possible format changes to routes.)
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import routeConfiguration from '../../routeConfiguration';
import { pathByRouteName } from '../../util/routes';

const NamedRedirect = props => {
  const { name, search, state, params, push } = props;
  const pathname = pathByRouteName(name, routeConfiguration(), params);
  return <Redirect to={{ pathname, search, state }} push={push} />;
};

const { bool, object, string } = PropTypes;

NamedRedirect.defaultProps = { search: '', state: {}, push: false, params: {} };

NamedRedirect.propTypes = {
  name: string.isRequired,
  search: string,
  state: object,
  push: bool,
  params: object,
};

export default NamedRedirect;
