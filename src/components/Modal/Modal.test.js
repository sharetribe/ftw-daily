import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import Modal from './Modal';

describe('Modal', () => {
  it('no extra classes when window is missing', () => {
    const props = {
      className: 'test-class-from-props',
      isOpen: false,
      onClose: v => v,
      togglePageClassNames: v => v,
    };

    const tree = renderDeep(<Modal {...props}>Content</Modal>);
    expect(tree).toMatchSnapshot();
  });
});
