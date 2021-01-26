/**
 * This component wraps React-Router's Link by providing name-based routing.
 *
 * The `name` prop should match a route in the flattened
 * routeConfiguration passed in context by the RoutesProvider
 * component. The `params` props is the route params for the route
 * path of the given route name.
 *
 * The `to` prop is an object with the same shape as Link requires,
 * but without `pathname` that will be generated from the given route
 * name.
 *
 * Some additional props can be passed for the <a> element like
 * `className` and `style`.
 *
 * The component can also be given the `activeClassName` prop that
 * will be added to the element className if the current URL matches
 * the one in the generated pathname of the link.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import routeConfiguration from '../../routeConfiguration';
import { pathByRouteName } from '../../util/routes';

export const NamedLinkComponent = props => {
  const { name, params, title, openInNewTab, isNotRouterLink, history } = props;

  // Link props
  const { to, children } = props;
  const pathname = pathByRouteName(name, routeConfiguration(), params);
  const { match } = props;
  const active = match.url && match.url === pathname;

  // <a> element props
  const { className, style, activeClassName } = props;
  const aElemProps = {
    className: classNames(className, { [activeClassName]: active }),
    style,
    title,
  };

  if (openInNewTab) {
    Object.assign(aElemProps, { target: '_blank' });
  }

  /*
   * isNotRouterLink prop is used to prevent forbidden html elements
   * to be nested inside <a /> tag
   * for instance
   * <a href="1">
   *  <a href="2"></a>
   * </a>
  */

  if (isNotRouterLink) {
    const customProps = {};
          customProps.className = aElemProps.className;
          customProps.style = aElemProps.style;
    return (
      <div onClick={event => { 
          event.preventDefault()
          event.stopPropagation()
          history.push(pathname) 
        }} {...customProps} >
        {children}
      </div>
      )
  }

  return (
    <Link to={{ pathname, ...to }} {...aElemProps}>
      {children}
    </Link>
  );
};

const { object, string, shape, any, bool } = PropTypes;

NamedLinkComponent.defaultProps = {
  params: {},
  to: {},
  children: null,
  className: '',
  style: {},
  activeClassName: 'NamedLink_active',
  title: null,
  match: {},
  openInNewTab: false,
};

// This ensures a nice display name in snapshots etc.
NamedLinkComponent.displayName = 'NamedLink';

NamedLinkComponent.propTypes = {
  // name of the route in routeConfiguration
  name: string.isRequired,
  // params object for the named route
  params: object,
  // Link component props
  to: shape({ search: string, hash: string, state: object }),
  children: any,

  // generic props for the underlying <a> element
  className: string,
  style: object,
  activeClassName: string,
  title: string,
  openInNewTab: bool,

  // from withRouter
  match: object,
};

const NamedLink = withRouter(NamedLinkComponent);
NamedLink.displayName = 'NamedLink';

export default NamedLink;
