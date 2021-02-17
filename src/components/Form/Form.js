import React from 'react';
import { func, node, string } from 'prop-types';
import routeConfiguration from '../../routeConfiguration';
import { findRouteByRouteName } from '../../util/routes';

const Form = props => {
  const { children, contentRef, enforcePagePreloadFor, ...restProps } = props;

  const onOverFormFn = enforcePreloadOfPage => () => {
    // Enforce preloading of given page (loadable component)
    const { component: Page } = findRouteByRouteName(enforcePreloadOfPage, routeConfiguration());
    // Loadable Component has a "preload" function.
    if (Page.preload) {
      Page.preload();
    }
  };

  const onOverForm = enforcePagePreloadFor ? onOverFormFn(enforcePagePreloadFor) : null;
  const onOverFormMaybe = onOverForm
    ? {
        onMouseOver: onOverForm,
        onTouchStart: onOverForm,
      }
    : {};

  const formProps = {
    // These are mainly default values for the server
    // rendering. Otherwise the form would submit potentially
    // sensitive data with the default GET method until the client
    // side code is loaded.
    method: 'post',
    action: '/',

    // allow content ref function to be passed to the form
    ref: contentRef,

    ...onOverFormMaybe,
    ...restProps,
  };

  return <form {...formProps}>{children}</form>;
};

Form.defaultProps = {
  children: null,
  contentRef: null,
  enforcePagePreloadFor: null,
};

Form.propTypes = {
  children: node,
  contentRef: func,
  enforcePagePreloadFor: string,
};

export default Form;
