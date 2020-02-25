/* eslint-disable no-console */
import React, { useState } from 'react';
import { Button } from '../../components';
import Modal from './Modal';

const onManageDisableScrolling = (componentId, scrollingDisabled = true) => {
  // We are just checking the value for now
  console.log('Toggling Modal - scrollingDisabled currently:', componentId, scrollingDisabled);
};

const ModalWrapper = props => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <div style={{ margin: '1rem' }}>Wrapper text before Modal</div>

      <Modal
        {...props}
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
          console.log('Closing modal');
        }}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <div style={{ margin: '1rem' }}>Some content inside Modal component</div>
      </Modal>

      <div style={{ margin: '1rem' }}>
        <Button onClick={handleOpen}>Open</Button>
      </div>
    </div>
  );
};

export const OldModal = {
  component: ModalWrapper,
  useDefaultWrapperStyles: false,
  props: {
    id: 'OldModal',
  },
};

export const ModalWithPortal = {
  component: ModalWrapper,
  useDefaultWrapperStyles: false,
  props: {
    id: 'ModalWithPortal',
    usePortal: true,
  },
};
