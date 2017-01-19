import React from 'react';
import Helmet from 'react-helmet';
import { Topbar } from '../../containers';

export default props => {
  const { className, title, children } = props;
  return (
    <div className={className}>
      <Helmet title={title} />
      <Topbar />
      <h1>{title}</h1>
      {children}
    </div>
  );
}
