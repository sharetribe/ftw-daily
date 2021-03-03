import React, { Component } from 'react';
import { LoadableComponentErrorBoundaryPage } from './LoadableComponentErrorBoundaryPage';

// Use ErrorBoyndary to catch ChunkLoadError
// https://reactjs.org/docs/error-boundaries.html
class LoadableComponentErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  render() {
    if (this.state.error && this.state.error.name === 'ChunkLoadError') {
      return <LoadableComponentErrorBoundaryPage />;
    }

    return this.props.children;
  }
}

export default LoadableComponentErrorBoundary;
