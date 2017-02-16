import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import { PageLayout, NamedLink } from '../../components';

export class NotFoundPageComponent extends Component {
  componentWillMount() {
    // The StaticRouter component used in server side rendering
    // provides the context object. We attach a `notfound` flag to
    // the context to tell the server to change the response status
    // code into a 404.
    this.props.staticContext.notfound = true;
  }
  render() {
    return (
      <PageLayout title="Page not found">
        <NamedLink name="LandingPage">Home</NamedLink>
      </PageLayout>
    );
  }
}

NotFoundPageComponent.defaultProps = { staticContext: {} };

const { object } = PropTypes;

NotFoundPageComponent.propTypes = {
  // context object from StaticRouter, injected by the withRouter wrapper
  staticContext: object,
};

export default withRouter(NotFoundPageComponent);
