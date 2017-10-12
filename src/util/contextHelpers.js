import React, { PropTypes, Component as ReactComponent } from 'react'; // eslint-disable-line react/no-deprecated
import { throttle } from 'lodash';

/**
 * A higher order component (HOC) to take the togglePageClassNames function from
 * the context that the Page component has provided.
 */
export const withTogglePageClassNames = Component => {
  const WithTogglePageClassNamesComponent = (props, context) => (
    <Component togglePageClassNames={context.togglePageClassNames} {...props} />
  );

  WithTogglePageClassNamesComponent.displayName = `withTogglePageClassNames(${Component.displayName || Component.name})`;

  const { func } = PropTypes;

  WithTogglePageClassNamesComponent.contextTypes = {
    togglePageClassNames: func.isRequired,
  };

  return WithTogglePageClassNamesComponent;
};

/**
 * A higher order component (HOC) that provides the current viewport
 * dimensions to the wrapped component as a `viewport` prop that has
 * the shape `{ width: 600, height: 400}`.
 */
export const withViewport = Component => {
  // The resize event is flooded when the browser is resized. We'll
  // use a small timeout to throttle changing the viewport since it
  // will trigger rerendering.
  const WAIT_MS = 100;

  class WithViewportComponent extends ReactComponent {
    constructor(props) {
      super(props);
      this.state = { width: 0, height: 0 };
      this.handleWindowResize = this.handleWindowResize.bind(this);
      this.setViewport = throttle(this.setViewport.bind(this), WAIT_MS);
    }
    componentDidMount() {
      this.setViewport();
      window.addEventListener('resize', this.handleWindowResize);
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowResize);
    }
    handleWindowResize() {
      this.setViewport();
    }
    setViewport() {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    render() {
      const viewport = this.state;
      const props = { ...this.props, viewport };
      return <Component {...props} />;
    }
  }

  WithViewportComponent.displayName = `withViewport(${Component.displayName || Component.name})`;

  return WithViewportComponent;
};
