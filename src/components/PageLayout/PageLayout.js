import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Topbar } from '../../containers';

const scrollToTop = () => {
  // Todo: this might need fine tuning later
  window.scrollTo(0, 0);
};

class PageLayout extends Component {
  componentDidMount() {
    this.historyUnlisten = this.context.history.listen(() => scrollToTop());
  }

  componentWillUnmount() {
    this.historyUnlisten();
  }

  render() {
    const { className, title, children, authError } = this.props;
    // TODO: use FlashMessages for authError
    return (
      <div className={className}>
        <Helmet title={title} />
        {authError ? <p style={{ color: 'red' }}>Error in auth: {authError.message}</p> : null}
        <Topbar />
        <h1>{title}</h1>
        {children}
      </div>
    );
  }
}

const { any, object, string, instanceOf } = PropTypes;

PageLayout.contextTypes = { history: object };

PageLayout.defaultProps = { className: '', children: null, authError: null };

PageLayout.propTypes = {
  className: string,
  title: string.isRequired,
  children: any,
  authError: instanceOf(Error),
};

const mapStateToProps = state => ({ authError: state.Auth.error });

export default connect(mapStateToProps)(PageLayout);
