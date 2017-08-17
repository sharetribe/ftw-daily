/* eslint-disable react/prefer-stateless-function, no-console */
import React, { Component } from 'react';

class ExpandingTextarea extends Component {
  render() {
    return <textarea {...this.props} />;
  }
}

export default ExpandingTextarea;
