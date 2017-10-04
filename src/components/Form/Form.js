import React, { PropTypes } from 'react';

const Form = props => {
  const { children, ...restProps } = props;

  const formProps = {
    // These are mainly default values for the server
    // rendering. Otherwise the form would submit potentially
    // sensitive data with the default GET method until the client
    // side code is loaded.
    method: 'post',
    action: '/',

    ...restProps,
  };
  return (
    <form {...formProps}>
      {children}
    </form>
  );
};

Form.defaultProps = {
  children: null,
};

const { node } = PropTypes;

Form.propTypes = {
  children: node,
};

export default Form;
