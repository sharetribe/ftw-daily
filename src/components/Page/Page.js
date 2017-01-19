import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Topbar } from '../../containers';

const Page = props => {
  const { className, title, children } = props;
  return (
    <div className={className}>
      <Helmet title={title} />
      <Topbar />
      <h1>{title}</h1>
      {children}
    </div>
  );
};

const { string, any } = PropTypes;

Page.defaultProps = { className: '', children: null };

Page.propTypes = { className: string, title: string.isRequired, children: any };

export default Page;
