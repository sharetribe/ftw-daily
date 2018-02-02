import React from 'react';
import PropTypes from 'prop-types';

const Form = props => {
  const { children, contentRef, ...restProps } = props;

  const formProps = {
    // These are mainly default values for the server
    // rendering. Otherwise the form would submit potentially
    // sensitive data with the default GET method until the client
    // side code is loaded.
    method: 'post',
    action: '/',

    // allow content ref function to be passed to the form
    ref: contentRef,

    ...restProps,
  };
  return <form {...formProps}>{children}</form>;
};

Form.defaultProps = {
  children: null,
  contentRef: null,
};

const { func, node } = PropTypes;

Form.propTypes = {
  children: node,
  contentRef: func,
};

export default Form;
