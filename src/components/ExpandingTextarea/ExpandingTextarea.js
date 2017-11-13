import React, { Component } from 'react';
import autosize from 'autosize';

class ExpandingTextarea extends Component {
  constructor(props) {
    super(props);
    this.timeoutId = null;
    this.textarea = null;
    this.update = this.update.bind(this);
  }
  componentDidMount() {
    // Delay the autosize initialisation so that the autosize can
    // correctly calculate the height with the textarea value
    this.timeoutId = window.setTimeout(() => {
      autosize(this.textarea);

      // Listen to resize events so autosize can pick up updated CSS
      // values (like max-height) when breakpoints change.
      window.addEventListener('resize', this.update);
    }, 100);
  }
  componentDidUpdate() {
    this.update();
  }
  componentWillUnmount() {
    autosize.destroy(this.textarea);
    window.clearTimeout(this.timeoutId);
    window.removeEventListener('resize', this.update);
  }
  update() {
    autosize.update(this.textarea);
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
