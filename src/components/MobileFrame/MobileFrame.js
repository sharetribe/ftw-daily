import React, { Component, PropTypes } from 'react';

import css from './MobileFrame.css';

class MobileFrame extends Component {
  constructor(props) {
    super(props);
    this.state = { frameEnabled: true };

    this.closeFrame = this.closeFrame.bind(this);
  }

  closeFrame(e) {
    e.preventDefault();
    this.setState({frameEnabled: false});
  }

  render() {
    const { children } = this.props;
    const { frameEnabled } = this.state;

    if (frameEnabled) {
      return (
        <div className={css.root}>
          <a href="/" className={css.remove} onClick={this.closeFrame}>
            <span className={css.removeLabel}>✖ Remove mobile frame</span>
            <span className={css.removeLabelRefresh}>(refresh browser to get it back)</span>
          </a>
          <div className={css.frame}>
            {children}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          {children}
        </div>
      )
    }
  }
}

const { any } = PropTypes;

MobileFrame.propTypes = {
  children: any.isRequired,
}

export default MobileFrame;
