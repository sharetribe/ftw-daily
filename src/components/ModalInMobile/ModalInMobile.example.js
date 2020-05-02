/* eslint-disable no-console */
import React, { Component } from 'react';
import { Button } from '../../components';
import ModalInMobile from './ModalInMobile';
import css from './ModalInMobileExample.css';

const onManageDisableScrolling = (componentId, scrollingDisabled = true) => {
  // We are just checking the value for now
  console.log('Toggling ModalInMobile - currently:', componentId, scrollingDisabled);
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
        <div style={{ margin: '1rem' }}>Wrapper text before ModalInMobile</div>
        <ModalInMobile
          {...this.props}
          onClose={() => {
            this.setState({ isOpen: false });
            console.log('Closing modal');
          }}
          isModalOpenOnMobile={this.state.isOpen}
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <div style={{ margin: '1rem' }}>Some content inside ModalInMobile component</div>
        </ModalInMobile>
        <div style={{ margin: '1rem' }}>
          <Button onClick={this.handleOpen} className={css.visibleOnMobileLayout}>
            Open
          </Button>
        </div>
      </div>
    );
  }
}

export const Empty = {
  component: ModalInMobileWrapper,
  useDefaultWrapperStyles: false,
  description: 'Modal feature is visible if window’s width is less than 400px.',
  props: {
    id: 'ExampleModalInMobile',
    showAsModalMaxWidth: 400,
  },
};
