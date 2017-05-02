/* eslint-disable no-console */
import React, { Component } from 'react';
import { Button } from '../../components';
import Modal from './Modal';

const togglePageClassNames = (className, addClass = true) => {
  // We are just checking the value for now
  console.log('Toggling Modal - pageClassName currently:', className, addClass);
};

class ModalWrapper extends Component {
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
        <Modal
          {...this.props}
          isOpen={this.state.isOpen}
          onClose={() => {
            this.setState({ isOpen: false });
            console.log('Closing modal');
          }}
          togglePageClassNames={togglePageClassNames}
        >
          Some content inside Modal component
        </Modal>
        <Button onClick={this.handleOpen}>Open</Button>
      </div>
    );
  }
}

export const Empty = {
  component: ModalWrapper,
  props: {
    title: 'Test Modal',
  },
};
