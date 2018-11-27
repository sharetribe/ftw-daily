import React, { Component } from 'react';
import OutsideClickHandler from './OutsideClickHandler';

const childStyle = {
  padding: '16px',
  background: '#e7e7e7',
};

class OutsideClickHandlerWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'This is OutsideClickHandler example',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ message: 'You clicked outside!' });
  }

  render() {
    return (
      <OutsideClickHandler onOutsideClick={this.handleClick}>
        <div style={childStyle}>
          <h3>{this.state.message}</h3>
        </div>
      </OutsideClickHandler>
    );
  }
}

export const FilterPopupExample = {
  component: OutsideClickHandlerWrapper,
  props: {},
  group: 'misc',
};
