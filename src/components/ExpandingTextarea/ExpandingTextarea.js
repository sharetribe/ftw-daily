import React, { Component } from 'react';
import autosize from 'autosize';

class ExpandingTextarea extends Component {
  constructor(props) {
    super(props);
    this.timeoutId = null;
    this.textarea = null;
  }
  componentDidMount() {
    // Delay the autosize initialisation so that the autosize can
    // correctly calculate the height with the textarea value
    this.timeoutId = window.setTimeout(
      () => {
        autosize(this.textarea);
      },
      100
    );
  }
  componentDidUpdate() {
    autosize.update(this.textarea);
  }
  componentWillUnmount() {
    autosize.destroy(this.textarea);
    window.clearTimeout(this.timeoutId);
  }
  render() {
    return (
      <textarea
        {...this.props}
        ref={textarea => {
          this.textarea = textarea;
        }}
      />
    );
  }
}

export default ExpandingTextarea;
