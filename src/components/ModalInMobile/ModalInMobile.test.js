import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import ModalInMobile from './ModalInMobile';

describe('ModalInMobile', () => {
  it('no extra classes when window is missing', () => {
    const props = {
      id: 'TestModalInMobile',
      className: 'test-class-from-props',
      isModalOpenOnMobile: false,
      onManageDisableScrolling: v => v,
    };

    const tree = renderDeep(<ModalInMobile {...props}>Content</ModalInMobile>);
    expect(tree).toMatchSnapshot();
  });
});
