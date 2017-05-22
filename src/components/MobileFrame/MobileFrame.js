import React, { Component, PropTypes } from 'react';

import css from './MobileFrame.css';

/**
   Show mobile frame only if the screen size is bigger than 615px.

   There's no magic formula behind 615px. It came from my head.
 */
const SHOW_FRAME_BREAKPOINT = 615;

/**
   Return current window width.

   See more: http://stackoverflow.com/a/11744120
 */
const windowWidth = () => {
  const w = window;
  const d = document;
  const e = document.documentElement;
  const g = d.getElementsByTagName('body')[0];
  const x = w.innerWidth || e.clientWidth || g.clientWidth;

  return x;
};

class MobileFrame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manuallyDisabled: false,
      automaticallyDisabled: false,
    };

    this.closeFrame = this.closeFrame.bind(this);
    this.toggleBasedOnWindowSize = this.toggleBasedOnWindowSize.bind(this);
  }

  componentDidMount() {
    this.toggleBasedOnWindowSize();
    window.addEventListener('resize', this.toggleBasedOnWindowSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.toggleBasedOnWindowSize);
  }

  closeFrame(e) {
    e.preventDefault();
    this.setState({ manuallyDisabled: true });
  }

  toggleBasedOnWindowSize() {
    const shouldHide = windowWidth() < SHOW_FRAME_BREAKPOINT;
    this.setState({ automaticallyDisabled: shouldHide });
  }

  render() {
    const { children } = this.props;
    const { manuallyDisabled, automaticallyDisabled } = this.state;
    const show = !manuallyDisabled && !automaticallyDisabled;

    if (show) {
      return (
        <div className={`${css.root} mobileFrameEnabled`}>
          <a href="/" className={css.remove} onClick={this.closeFrame}>
            <span className={css.removeLabel}>✖ Remove mobile frame</span>
            <span className={css.removeLabelRefresh}>(refresh browser to get it back)</span>
          </a>
          <div className={css.frame}>
            {children}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {children}
        </div>
      );
    }
  }
}

const { any } = PropTypes;

MobileFrame.propTypes = {
  children: any.isRequired,
};

export default MobileFrame;
