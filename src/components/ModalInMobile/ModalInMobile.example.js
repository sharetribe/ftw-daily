/* eslint-disable no-console */
import React, { useState } from 'react';
import { Button } from '../../components';
import ModalInMobile from './ModalInMobile';
import css from './ModalInMobileExample.css';

const onManageDisableScrolling = (componentId, scrollingDisabled = true) => {
  // We are just checking the value for now
  console.log('Toggling ModalInMobile - currently:', componentId, scrollingDisabled);
};

const ModalInMobileWrapper = props => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <div style={{ margin: '1rem' }}>Wrapper text before ModalInMobile</div>
      <ModalInMobile
        {...props}
        onClose={() => {
          setOpen(false);
          console.log('Closing modal');
        }}
        isModalOpenOnMobile={isOpen}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <div style={{ margin: '1rem' }}>Some content inside ModalInMobile component</div>
      </ModalInMobile>
      <div style={{ margin: '1rem' }}>
        <Button onClick={handleOpen} className={css.visibleOnMobileLayout}>
          Open
        </Button>
      </div>
    </div>
  );
};

export const Empty = {
  component: ModalInMobileWrapper,
  useDefaultWrapperStyles: false,
  description: 'Modal feature is visible if window’s width is less than 400px.',
  props: {
    id: 'ExampleModalInMobile',
    showAsModalMaxWidth: 400,
  },
};
