import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { pathByRouteName } from '../../routesConfiguration';

const NamedLink = (props, context) => {
  const { name, params, ...rest } = props;
  const path = pathByRouteName(name, context.routes, params);

  return <Link to={path} {...rest} />;
};

const { array, object, string } = PropTypes;

NamedLink.contextTypes = { routes: array };

NamedLink.defaultProps = { params: {} };

NamedLink.propTypes = { name: string.isRequired, params: object };

export default NamedLink;
