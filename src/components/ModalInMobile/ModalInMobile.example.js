/* eslint-disable no-console, import/prefer-default-export */
import React, { Component } from 'react';
import { Button } from '../../components';
import ModalInMobile from './ModalInMobile';
import css from './ModalInMobile.example.css';

const togglePageClassNames = (className, addClass = true) => {
  // We are just checking the value for now
  console.log('Toggling ModalInMobile - currently:', className, addClass);
};

class ModalInMobileWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState({ isOpen: true });
  }

  render() {
    return (
      <div>
        Wrapper text before ModalInMobile
        <ModalInMobile
          {...this.props}
          isModalOpenOnMobile={this.state.isOpen}
          togglePageClassNames={togglePageClassNames}
        >
          Some content inside ModalInMobile component
        </ModalInMobile>
        <Button onClick={this.handleOpen} className={css.visibleOnMobileLayout}>Open</Button>
      </div>
    );
  }
}

export const Empty = {
  component: ModalInMobileWrapper,
  props: {
    onClose() {
      console.log('Closing modal');
    },
    showAsModalMaxWidth: 400,
    title: 'Test ModalInMobile',
  },
};
