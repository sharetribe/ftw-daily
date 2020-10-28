import React, { Component } from 'react';
import { func, node, string } from 'prop-types';
import classNames from 'classnames';

import css from './OutsideClickHandler.module.css';

export default class OutsideClickHandler extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick(event) {
    if (!this.node.contains(event.target)) {
      this.props.onOutsideClick();
    }
  }

  render() {
    const { rootClassName, className, children } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    return (
      <div className={classes} ref={node => (this.node = node)}>
        {children}
      </div>
    );
  }
}

OutsideClickHandler.defaultProps = {
  rootClassName: null,
  className: null,
};

OutsideClickHandler.propTypes = {
  rootClassName: string,
  className: string,
  onOutsideClick: func.isRequired,
  children: node.isRequired,
};
