import React from 'react';
import { node } from 'prop-types';
import { connect } from 'react-redux';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { Page } from '../../components';

const StaticPageComponent = props => {
  const { children, ...pageProps } = props;
  return <Page {...pageProps}>{children}</Page>;
};

StaticPageComponent.defaultProps = {
  children: null,
};

StaticPageComponent.propTypes = {
  children: node,
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const StaticPage = connect(mapStateToProps)(StaticPageComponent);

export default StaticPage;
