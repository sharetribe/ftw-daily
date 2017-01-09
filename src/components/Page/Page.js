import React from 'react';
import Helmet from 'react-helmet';

export default (props) => {
  const { className, title, children } = props;
  return (
    <div className={ className }>
      <Helmet title={ title } />
      <h1>{ title }</h1>
      { children }
    </div>
  );
};
